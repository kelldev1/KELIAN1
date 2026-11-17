import type { Competence, Realisation } from '../types/content'

export const competences: Competence[] = [
  { code: 'B1.1', label: 'Gérer le patrimoine informatique', count: 2 },
  {
    code: 'B1.2',
    label: "Répondre aux incidents et aux demandes d'assistance",
    count: 1,
  },
  { code: 'B1.3', label: "Développer la présence en ligne de l'organisation", count: 4 },
  { code: 'B1.4', label: 'Travailler en mode projet', count: 4 },
  {
    code: 'B1.5',
    label: 'Mettre à disposition des utilisateurs un service informatique',
    count: 5,
  },
  { code: 'B1.6', label: 'Organiser son développement professionnel', count: 2 },
]

export const realisations: Realisation[] = [
  {
    ref: 'REA-01',
    name: 'eBoutique',
    context: 'Application e-commerce · Formation IPSSI',
    period: '2024',
    goal: 'Développer une application e-commerce complète (catalogue, panier, comptes utilisateurs) en PHP avec une architecture MVC maison.',
    result:
      "Catalogue produits, inscription/connexion, gestion des rôles, panier en session, validation des commandes, upload d'images. Mise en ligne sur Clever Cloud (PHP + MySQL).",
    competences: ['B1.3', 'B1.4', 'B1.5'],
    links: [
      {
        label: 'Site',
        url: 'https://app-e5304a16-a642-44a3-b39f-8b93ef741101.cleverapps.io/',
      },
      { label: 'Code', url: 'https://github.com/egomania1/tp-eboutique' },
    ],
  },
  {
    ref: 'REA-02',
    name: 'Smart Moov',
    context: 'Support et maintenance applicative · Alternance, télétravail',
    period: 'Juin → juil. 2026',
    goal: "Assurer le support client et la maintenance évolutive d'une application en remote, via l'outil Zendesk.",
    result:
      'Travail en équipe en méthode agile, tickets clients traités, correctifs de bugs, ajout de fonctionnalités, documentation, tests, montée en compétence sur de nouvelles dépendances.',
    competences: ['B1.2', 'B1.4', 'B1.5', 'B1.6'],
    links: [
      { label: 'Procédure (PDF)', url: '/documents/procedure-support-smart-moov.pdf' },
    ],
  },
  {
    ref: 'REA-03',
    name: 'devmah',
    context: 'Blog communautaire PHP MVC · Formation IPSSI',
    period: 'Sept. 2025 → avr. 2026',
    goal: 'Développer une plateforme de blog communautaire sécurisée avec une architecture MVC maison.',
    result:
      'Mots de passe hachés (bcrypt) et jeton « se souvenir de moi » en SHA-256, CRUD articles et commentaires, likes en AJAX, notifications, panneau admin, flux RSS. Environnement dockerisé, mis en ligne sur Clever Cloud.',
    competences: ['B1.1', 'B1.3', 'B1.4', 'B1.5'],
    links: [{ label: 'Code', url: 'https://github.com/kelldev1/BLOG-DEV1' }],
  },
  {
    ref: 'REA-04',
    name: 'Espace Quasar',
    context: 'Connexion + espace utilisateur · Alternance',
    period: 'Avr. → juin 2026',
    goal: 'Développer un espace utilisateur avec authentification via le framework Quasar (Vue.js).',
    result:
      'Projet Quasar CLI (Vue 3, Pinia, vue-router) : connexion, création de compte, mot de passe oublié, tableau de bord protégé par une garde de routage. Déploiement automatique sur GitHub Pages via GitHub Actions, responsive.',
    competences: ['B1.1', 'B1.3', 'B1.4', 'B1.5'],
    links: [
      { label: 'Site', url: 'https://egomania1.github.io/quasar-connexion/' },
      { label: 'Code', url: 'https://github.com/egomania1/quasar-connexion' },
    ],
  },
  {
    ref: 'REA-05',
    name: 'reiim',
    context: 'Planificateur de devoirs avec IA · Projet personnel',
    period: 'Sept. 2026',
    goal: 'Concevoir une application qui aide les collégiens et lycéens à planifier leurs devoirs et à les travailler avec une assistance IA.',
    result:
      "Application React/TypeScript sur Vercel, base Supabase (PostgreSQL) protégée par RLS, appels à l'API Claude et à YouTube via des Edge Functions pour que les clés restent côté serveur, amis et partage en temps réel.",
    competences: ['B1.3', 'B1.5', 'B1.6'],
    links: [
      { label: 'Site', url: 'https://reiim.vercel.app/' },
      { label: 'Code', url: 'https://github.com/egomania1/reiim' },
    ],
  },
]
