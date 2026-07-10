/**
 * Pré-rendu statique des routes du sitemap en HTML complet.
 *
 * Pourquoi : GPTBot, ClaudeBot, PerplexityBot (et tout crawler sans JS)
 * ne voient que le HTML brut. Ce script sert le build via `vite preview`,
 * visite chaque route du sitemap dans un vrai Chrome (puppeteer-core,
 * aucune incompatibilité SSR avec Lottie/Framer Motion) et écrit le DOM
 * rendu dans dist/ :
 *   /                       -> dist/index.html (écrasé, contenu complet)
 *   /blog                   -> dist/blog.html
 *   /blog/<slug>            -> dist/blog/<slug>.html
 * Le .htaccess sert ces fichiers via `RewriteCond %{REQUEST_FILENAME}.html -f`
 * (pas de dossiers -> pas de redirection 301 « trailing slash » d'Apache).
 *
 * Chrome requis : local macOS = Google Chrome installé ;
 * CI GitHub ubuntu-latest = google-chrome préinstallé.
 * Surcharge possible : PRERENDER_CHROME=/chemin/vers/chrome
 */

import { spawn, execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const DIST = path.resolve("dist");

function findChrome() {
  if (process.env.PRERENDER_CHROME) return process.env.PRERENDER_CHROME;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  try {
    return execSync("which google-chrome || which chromium", {
      encoding: "utf-8",
    }).trim();
  } catch {
    throw new Error(
      "Chrome introuvable — définir PRERENDER_CHROME=/chemin/vers/chrome"
    );
  }
}

// Routes pré-rendues mais volontairement absentes du sitemap (ex: noindex)
const EXTRA_ROUTES = ["/politique-de-confidentialite"];

function routesFromSitemap() {
  const xml = readFileSync("public/sitemap.xml", "utf-8");
  const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/")
    .concat(EXTRA_ROUTES)
    .filter((v, i, a) => a.indexOf(v) === i);
  if (!routes.includes("/")) routes.unshift("/");
  return routes;
}

function waitForServer(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const tick = async () => {
      try {
        const r = await fetch(url);
        if (r.ok) return resolve();
      } catch {
        /* pas encore prêt */
      }
      if (Date.now() - t0 > timeoutMs)
        return reject(new Error("vite preview ne répond pas"));
      setTimeout(tick, 250);
    };
    tick();
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Bloquer analytics/GTM : ni pollution du snapshot, ni requêtes inutiles
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const u = req.url();
    if (u.includes("googletagmanager.com") || u.includes("google-analytics.com"))
      return req.abort();
    return req.continue();
  });

  await page.goto(ORIGIN + route, { waitUntil: "networkidle0", timeout: 45000 });

  // Auto-scroll : déclenche les animations useInView({ once: true })
  // pour que le contenu sous la ligne de flottaison soit visible dans le DOM
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else resolve();
      };
      step();
    });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.evaluate(() => {
    // Dédoublonnage : quand Helmet (data-rh) a posé un tag par page,
    // retirer l'équivalent statique du template pour éviter les doublons
    // (canonical, description, og:*, twitter:*)
    const rhTags = document.head.querySelectorAll("[data-rh]");
    rhTags.forEach((tag) => {
      let selector = null;
      if (tag.tagName === "LINK" && tag.getAttribute("rel") === "canonical")
        selector = 'link[rel="canonical"]:not([data-rh])';
      else if (tag.tagName === "META" && tag.getAttribute("property"))
        selector = `meta[property="${tag.getAttribute("property")}"]:not([data-rh])`;
      else if (tag.tagName === "META" && tag.getAttribute("name"))
        selector = `meta[name="${tag.getAttribute("name")}"]:not([data-rh])`;
      if (selector)
        document.head.querySelectorAll(selector).forEach((d) => d.remove());
    });

    // Sécurité : aucun texte capturé masqué par un état initial d'animation
    document.querySelectorAll('[style*="opacity"]').forEach((el) => {
      if (parseFloat(el.style.opacity) === 0) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
  });

  const html = "<!DOCTYPE html>\n" + (await page.evaluate(
    () => document.documentElement.outerHTML
  ));
  await page.close();

  if (html.length < 20000)
    throw new Error(`${route} : capture suspecte (${html.length} octets)`);

  const outFile =
    route === "/"
      ? path.join(DIST, "index.html")
      : path.join(DIST, route.slice(1) + ".html");
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`✓ ${route} -> ${path.relative(DIST, outFile)} (${(html.length / 1024).toFixed(0)} KB)`);
}

const routes = routesFromSitemap();
console.log(`Pré-rendu de ${routes.length} routes :`, routes.join(", "));

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
  detached: false,
});

let exitCode = 0;
try {
  await waitForServer(ORIGIN);
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  try {
    for (const route of routes) await prerenderRoute(browser, route);
  } finally {
    await browser.close();
  }
  console.log("Pré-rendu terminé.");
} catch (e) {
  console.error("Échec du pré-rendu :", e.message);
  exitCode = 1;
} finally {
  server.kill("SIGTERM");
}
process.exit(exitCode);
