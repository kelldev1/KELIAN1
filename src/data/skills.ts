import type { Skill } from '../types/content'

export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    levelLabel: 'Basique — appris en autodidacte',
    level: 1,
    tools: 'React 19, composants, hooks, TypeScript, Framer Motion, GSAP.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    levelLabel: 'Intermédiaire — depuis 2022',
    level: 2,
    tools: 'ES2024, DOM, Web APIs, Canvas, Web Audio.',
  },
  {
    id: 'html-css',
    name: 'HTML / CSS',
    levelLabel: 'Confirmé',
    level: 2,
    tools: 'Tailwind CSS, SCSS, Flexbox, Grid, animations natives, responsive design.',
  },
  {
    id: 'node',
    name: 'Node.js',
    levelLabel: 'Basique — appris en autodidacte',
    level: 1,
    tools: 'Express, REST, WebSockets, JSON.',
  },
  {
    id: 'sql',
    name: 'SQL',
    levelLabel: 'Confirmé',
    level: 2,
    tools: 'MySQL, PostgreSQL, SQLite — modélisation, requêtes, jointures, index.',
  },
  {
    id: 'api-rest',
    name: 'API REST',
    levelLabel: 'Confirmé',
    level: 2,
    tools: 'JSON, authentification JWT, Swagger, Postman, Insomnia, OpenAPI.',
  },
  {
    id: 'python',
    name: 'Python',
    levelLabel: 'Intermédiaire',
    level: 1,
    tools: 'Automatisation, scripting, intégration LLM — n8n, API Claude.',
  },
]
