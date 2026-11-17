import type { Project } from '../types/content'

export const projects: Project[] = [
  {
    id: 'kartmania',
    number: '01',
    kicker: 'Projet scolaire · BTS Systèmes embarqués, GARAC — 2024 · 2025',
    name: 'Kartmania',
    subtitle: 'Kart électrique et son site en 3D',
    description:
      "Projet d'équipe au GARAC : un kart électrique conçu et monté par quatre étudiants. J'ai réalisé le design et le site de présentation : le kart, modélisé dans Blender, roule sur une route animée, se décompose pièce par pièce au défilement, puis le site présente l'équipe, la fiche technique, le design et l'avancement.",
    role: 'Designer et développeur front, dans une équipe de quatre étudiants.',
    technologies: ['React', 'Vite', 'three.js', 'GSAP', 'Tailwind CSS', 'Blender', 'Nginx (VPS)'],
    takeaway:
      "Faire tenir un vrai modèle 3D dans un site fluide : exporter le kart depuis Blender, regrouper ses pièces pour la vue éclatée et caler chaque animation sur le défilement sans faire ramer la page.",
    image: { src: '/images/projects/kartmania-accueil.jpg', alt: "Page d'accueil du site Kartmania : le kart en 3D sur une route lumineuse" },
    gallery: [
      { label: 'Équipe', src: '/images/projects/kartmania-projet.jpg', alt: "Page Projet : les badges de l'équipe accrochés à un rail" },
      { label: 'Fiche technique', src: '/images/projects/kartmania-kart.jpg', alt: 'Page Kart : la fiche technique du kart' },
      { label: 'Design', src: '/images/projects/kartmania-design.jpg', alt: 'Page Design : les palettes de couleurs du site et du kart' },
      { label: 'Avancement', src: '/images/projects/kartmania-avancement.jpg', alt: "Page Avancement : les étapes du projet en badges" },
    ],
    links: [
      { label: 'Voir le site', url: 'https://kart.ll.gripe/' },
      { label: 'Lire la documentation (PDF)', url: '/documents/documentation-kartmania.pdf' },
    ],
  },
  {
    id: 'devmah',
    number: '02',
    kicker: 'Projet scolaire · IPSSI — 2025 · 2026',
    name: 'devmah',
    subtitle: 'Blog et veille : systèmes embarqués & cybersécurité',
    description:
      "Blog communautaire conçu de zéro en PHP pur, avec une architecture MVC maison. Il récupère tout seul l'actualité des systèmes embarqués, de l'IA embarquée et de la cybersécurité depuis une trentaine de flux RSS, suit les failles activement exploitées (catalogue CISA KEV) et relie chaque article aux technologies citées. Likes en AJAX, commentaires, salons de discussion, panneau admin, flux RSS. En ligne sur mon VPS, dans des conteneurs Docker.",
    role: 'Développeur — TP Blog 1ère année (sept. 2025 → avr. 2026), puis maintenu et hébergé par moi.',
    technologies: ['PHP 8 (MVC)', 'MariaDB', 'JavaScript', 'Docker', 'Nginx (VPS)', 'Flux RSS / Atom'],
    takeaway:
      'Construire une architecture MVC sans framework oblige à comprendre chaque brique (routage, vues, accès BDD) au lieu de la subir. Ça a rendu React et Express plus lisibles ensuite.',
    image: { src: '/images/projects/devmah-accueil.jpg', alt: "Page d'accueil de devmah : veille du moment et publications, sur fond pixelisé violet" },
    gallery: [
      { label: 'Actualités', src: '/images/projects/devmah-actualites.jpg', alt: 'Page Actualités : articles récupérés automatiquement et failles exploitées' },
      { label: 'Failles', src: '/images/projects/devmah-failles.jpg', alt: 'Page Failles exploitées : catalogue CISA KEV avec recherche' },
      { label: 'Technologies', src: '/images/projects/devmah-technologies.jpg', alt: "Page Technologies de l'embarqué : catalogue filtrable" },
    ],
    links: [
      { label: 'Voir le site', url: 'https://devmah.ll.gripe/' },
      { label: 'Lire la documentation (PDF)', url: '/documents/documentation-devmah.pdf' },
    ],
  },
  {
    id: 'quasar',
    number: '03',
    kicker: 'Projet en entreprise · alternance — 2026',
    name: 'Quasar',
    subtitle: 'Exercice Quasar (Vue.js) et méthode agile',
    description:
      "Un exercice d'alternance, volontairement simple, pour apprendre le framework Quasar, construit sur Vue.js : un espace de connexion avec création de compte (indicateur de robustesse du mot de passe), mot de passe oublié, option « rester connecté » et tableau de bord réservé aux utilisateurs connectés. Les comptes sont simulés dans le navigateur. Ce projet m'a ensuite permis de découvrir la méthode agile en entreprise, en avançant étape par étape avec l'équipe.",
    role: "Développeur en alternance — exercice de formation au sein de l'entreprise.",
    technologies: ['Vue.js', 'Quasar Framework', 'Pinia', 'Vue Router', 'GitHub Actions'],
    takeaway:
      "Apprendre un framework en entreprise, ce n'est pas seulement apprendre ses composants : c'est aussi apprendre à travailler en équipe, avec la méthode agile, et à livrer quelque chose qui fonctionne à chaque étape.",
    image: { src: '/images/projects/quasar-connexion.jpg', alt: 'Page de connexion Quasar : carte translucide sur fond vert ondulé', label: 'Connexion' },
    gallery: [
      { label: 'Inscription', src: '/images/projects/quasar-inscription.jpg', alt: 'Création de compte avec indicateur de robustesse du mot de passe' },
      { label: 'Mot de passe oublié', src: '/images/projects/quasar-oubli.jpg', alt: 'Page mot de passe oublié' },
      { label: 'Tableau de bord', src: '/images/projects/quasar-tableau-de-bord.jpg', alt: 'Tableau de bord affiché après connexion' },
    ],
    links: [
      { label: 'Voir le site', url: 'https://quasar.ll.gripe/' },
      { label: 'Lire la documentation (PDF)', url: '/documents/documentation-quasar.pdf' },
    ],
  },
  {
    id: 'eboutique',
    number: '04',
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
    id: 'reiim',
    number: '05',
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
    number: '06',
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
