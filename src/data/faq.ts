// Questions fréquentes de la home : source UNIQUE de l'affichage
// (FeaturedSnippetsFAQ.tsx) et du schéma FAQPage (structured-data-final.tsx).
// Modifier une question ici la change aux deux endroits : Google exige que
// le balisage reprenne exactement le texte visible.
export type QuestionFaq = { question: string; reponse: string };

export const faq: QuestionFaq[] = [
  {
    question: "Combien coûte un site web professionnel ?",
    reponse:
      "Il n'y a pas de prix standard, car chaque projet est unique. Le tarif dépend du périmètre (site vitrine, multi-pages, e-commerce, application sur mesure), du design, des fonctionnalités spécifiques (formulaires, chatbot IA, espace membre) et du référencement souhaité.\n\nMa méthode : on échange en visio ou par téléphone pour comprendre vos besoins, puis je vous envoie un devis détaillé sous 24h avec un périmètre clair, des technologies adaptées et un planning réaliste.\n\nPaiement en 3× sans frais possible, aucun frais caché, tout est défini avant le démarrage.",
  },
  {
    question: "Combien de temps pour créer mon site ?",
    reponse:
      "Comptez généralement entre 2 et 6 semaines selon la complexité du projet :\n\n• Site vitrine simple : 2 à 3 semaines\n• Site multi-pages avec blog ou formulaires : 3 à 5 semaines\n• Application sur mesure ou refonte complexe : 5 à 8 semaines\n\nJe démarre les projets sous 48h après validation du devis. Vous êtes tenu informé à chaque étape, et je m'engage sur le planning défini ensemble dès le départ.",
  },
  {
    question: "Comment se passe une mission avec vous ?",
    reponse:
      "Ma méthode tient en trois étapes claires :\n\n1. Analyse de vos besoins : un premier échange en visio ou téléphone, gratuit et sans engagement, pour comprendre votre activité, vos objectifs et votre cible.\n2. Proposition sur mesure : un devis détaillé sous 24h avec le périmètre, les technologies choisies, le planning et les modalités de paiement.\n3. Accompagnement complet : développement, validations intermédiaires, formation à l'utilisation, mise en ligne, puis suivi et maintenance après livraison.\n\nJe travaille seul sur votre projet du début à la fin : pas d'intermédiaire, vous savez toujours à qui vous parlez.",
  },
  {
    question: "Travaillez-vous à distance ou il faut être à Pau ?",
    reponse:
      "Les deux fonctionnent très bien. Je suis basé à Artix, près de Pau (64), et j'accompagne des clients partout en France à distance grâce à la visio et aux outils collaboratifs.\n\nPour les clients du département 64 (Pau, Lescar, Billère, Jurançon, Bayonne, Biarritz, Oloron, Orthez…), je me déplace gratuitement pour la première rencontre. C'est souvent plus simple pour faire connaissance et bien cerner votre projet.\n\nPour les autres régions, tout se passe en visio, un format que je maîtrise et qui n'a aucun impact sur la qualité du suivi.",
  },
  {
    question: "Pouvez-vous refondre mon site existant ?",
    reponse:
      "Oui, la refonte de site est une de mes spécialités. C'est même souvent un meilleur point de départ que de partir de zéro : on garde ce qui marche et on modernise le reste.\n\nMa démarche pour une refonte :\n\n• Audit complet du site actuel (design, performances, référencement, contenus)\n• Identification de ce qui fonctionne et de ce qui doit évoluer\n• Proposition d'une refonte alignée avec vos objectifs actuels\n• Migration des contenus, des emails et du référencement existant\n\nObjectif : une image professionnelle modernisée et une meilleure performance, sans perdre ce que vous avez déjà construit.",
  },
  {
    question:
      "Mon site sera-t-il bien référencé sur Google et les IA comme ChatGPT ?",
    reponse:
      "Oui, c'est un point sur lequel je suis particulièrement vigilant. Aujourd'hui, être visible ne suffit plus sur Google : il faut aussi être recommandé par les assistants IA (ChatGPT, Claude, Perplexity, Gemini).\n\nCe que j'inclus systématiquement :\n\n• Structure technique optimisée pour Google (sitemap, balises, performances)\n• Contenu riche et bien hiérarchisé pour le SEO classique\n• Données structurées JSON-LD (Schema.org) pour aider Google et les IA à comprendre votre activité\n• Fichiers dédiés aux assistants IA (llms.txt, robots.txt adaptés)\n• Optimisation pour la recherche vocale et les featured snippets\n\nMon propre site est un exemple concret : il est référencé sur les principaux moteurs et compatible avec les IA modernes.",
  },
  {
    question: "Pouvez-vous intégrer un chatbot IA à mon site ?",
    reponse:
      "Oui, c'est même un service que je propose régulièrement. Vous pouvez d'ailleurs voir un exemple concret en bas à droite de ce site : c'est exactement ce que je peux intégrer chez vous.\n\nLes possibilités :\n\n• Chatbot intelligent qui répond aux questions de vos clients 24h/24\n• Entraîné sur votre activité, vos services, votre catalogue\n• Capable de qualifier vos prospects avant de vous les transmettre\n• Intégrable à votre site existant ou à un nouveau projet\n\nJe travaille avec les modèles les plus récents (GPT, Claude) et j'adapte la solution à votre budget et à vos besoins.",
  },
  {
    question: "Que se passe-t-il après la livraison de mon site ?",
    reponse:
      "La livraison n'est pas la fin du projet, c'est le début de la collaboration.\n\nCe qui est inclus dans toutes mes prestations :\n\n• Formation à l'utilisation : je vous explique comment gérer vos contenus en autonomie (textes, images, articles de blog)\n• Documentation simple, écrite pour vous, pas pour des techniciens\n• Période d'ajustement après mise en ligne pour les retouches éventuelles\n• Maintenance et accompagnement disponibles à la demande\n\nMon objectif : que vous soyez autonome sur l'essentiel, tout en sachant qu'on peut compter sur moi pour les évolutions futures. Plus de dix ans dans l'informatique m'ont appris qu'un projet réussi, c'est aussi un client qui sait quoi faire après la livraison.",
  },
  {
    question: "Pourquoi vous plutôt qu'une agence web ?",
    reponse:
      "C'est une question légitime : les deux ont leurs avantages. Voici ce qui me distingue d'une agence :\n\n• Vous parlez directement à la personne qui code votre site, pas à un chef de projet intermédiaire\n• Les frais de structure sont nuls, donc les tarifs reflètent le vrai travail, pas la marge d'un cabinet\n• Décisions prises en quelques heures, pas en plusieurs réunions\n• Plus de dix ans dans l'informatique, dont du conseil client : je sais traduire votre besoin métier en solution technique\n\nEt aussi : je suis fondateur de SmartPlanning, un SaaS en production. Quand vous me confiez votre projet, vous bénéficiez de cette expérience entrepreneuriale, pas seulement de compétences techniques sur papier.",
  },
];
