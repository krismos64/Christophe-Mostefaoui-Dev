import { blogPosts } from '../data/blogPosts';

export const generateSitemap = (): string => {
  const baseUrl = 'https://christophe-dev-freelance.fr';
  const currentDate = new Date().toISOString().split('T')[0];

  // Pages statiques
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/faq', priority: '0.8', changefreq: 'monthly' },
    { url: '/avis', priority: '0.7', changefreq: 'monthly' },
    { url: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
    { url: '/politique-de-confidentialite', priority: '0.3', changefreq: 'yearly' }
  ];

  // Pages d'articles de blog
  const blogPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: post.featured ? '0.8' : '0.7',
    changefreq: 'monthly',
    lastmod: post.publishedAt
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};