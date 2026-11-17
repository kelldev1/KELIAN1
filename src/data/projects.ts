import type { Project } from '../types/content'

export const projects: Project[] = [
  {
    id: 'eboutique',
    number: '01',
    kicker: 'Formation IPSSI — 2024',
    name: 'eBoutique',
    subtitle: 'Application e-commerce PHP MVC',
    description:
      "Application e-commerce développée en PHP avec architecture MVC : catalogue, inscription/connexion, gestion des rôles, upload d'images, panier en session, validation des commandes et profil utilisateur.",
    role: 'Développeur — projet de formation IPSSI.',
    technologies: ['PHP (MVC)', 'MySQL (PDO)', 'HTML5', 'CSS3', 'JavaScript'],
    takeaway:
      "Ma première architecture MVC de bout en bout : comprendre pourquoi séparer modèle, vue et contrôleur évite le code spaghetti dès qu'un projet dépasse quelques pages.",
    links: [
      {
        label: 'Voir le site',
        url: 'https://app-e5304a16-a642-44a3-b39f-8b93ef741101.cleverapps.io/',
      },
      { label: 'Voir le code', url: 'https://github.com/egomania1/tp-eboutique' },
      { label: 'Voir la démo', url: 'https://www.youtube.com/watch?v=59ojEeLju3Y' },
    ],
  },
  {
    id: 'devmah',
    number: '02',
    kicker: 'Formation IPSSI — 2025 · 2026',
    name: 'devmah',
    subtitle: 'Blog communautaire PHP MVC',
    description:
      'Blog communautaire sur le développement et la cybersécurité, conçu de zéro en PHP pur (sans framework) avec une architecture MVC maison. Likes en AJAX, commentaires, bookmarks, notifications, salons de discussion, panneau admin, flux RSS.',
    role: 'Développeur — TP Blog 1ère année (sept. 2025 → avr. 2026).',
    technologies: ['PHP 8', 'MySQL (PDO)', 'HTML5', 'CSS3', 'JavaScript'],
    takeaway:
      'Construire une architecture MVC sans framework oblige à comprendre chaque brique (routage, vues, accès BDD) au lieu de la subir. Ça a rendu React et Express plus lisibles ensuite.',
    links: [{ label: 'Voir le code', url: 'https://github.com/kelldev1/BLOG-DEV1' }],
  },
  {
    id: 'quasar',
    number: '03',
    kicker: 'Alternance — 2026',
    name: 'Quasar',
    subtitle: 'Espace utilisateur Vue.js',
    description:
      'Espace utilisateur avec authentification via le framework Quasar (Vue.js) : connexion, création de compte avec indicateur de robustesse du mot de passe, mot de passe oublié, « rester connecté » et tableau de bord protégé par une garde de routage. Déployé sur GitHub Pages à chaque push.',
    role: 'Développeur — projet en milieu professionnel (alternance).',
    technologies: [
      'Vue.js',
      'Quasar Framework',
      'Pinia',
      'GitHub Actions',
      'GitHub Pages',
    ],
    takeaway:
      "Mon premier vrai contact avec Vue et Quasar en entreprise : découvrir un écosystème différent de React m'a montré ce qui est propre à un framework et ce qui relève des concepts front en général.",
    links: [
      { label: 'Voir le site', url: 'https://egomania1.github.io/quasar-connexion/' },
      { label: 'Voir le code', url: 'https://github.com/egomania1/quasar-connexion' },
    ],
  },
  {
    id: 'reiim',
    number: '04',
    kicker: 'Projet personnel — 2026',
    name: 'reiim',
    subtitle: 'Planificateur de devoirs avec IA',
    description:
      "Application web qui aide les collégiens et lycéens à prendre de l'avance sur leurs devoirs : calendrier en glisser-déposer, puis un espace de travail par méthode (exercices assistés par IA, vidéos, cartes mentales, flashcards). Système d'amis et partage d'un devoir en temps réel.",
    role: 'Développeur — projet personnel, conçu et développé seul (front, base de données, déploiement).',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase (PostgreSQL)',
      'API Claude',
      'Vercel',
    ],
    takeaway:
      "Intégrer une IA proprement, c'est surtout de l'architecture : la clé d'API reste côté serveur derrière une Edge Function, et chaque table est protégée par des règles de sécurité au niveau des lignes (RLS) plutôt que par le front.",
    links: [
      { label: 'Voir le site', url: 'https://reiim.vercel.app/' },
      { label: 'Voir le code', url: 'https://github.com/egomania1/reiim' },
    ],
  },
  {
    id: 'tracer',
    number: '05',
    kicker: 'Projet personnel',
    name: 'tracer',
    subtitle: 'Plateforme OSINT',
    description:
      'Plateforme OSINT qui agrège plus de 10 sources publiques (WHOIS, DNS, Shodan, VirusTotal, etc.) en une seule requête, avec authentification par session et gestion des rôles.',
    role: 'Développeur — projet personnel.',
    technologies: ['React', 'FastAPI', 'SQLite'],
    takeaway:
      'Centraliser des sources hétérogènes derrière une seule API oblige à normaliser les réponses et à gérer proprement les erreurs de chaque service externe.',
    links: [{ label: 'Voir le site', url: 'https://tracer-ego2.vercel.app/' }],
  },
]
