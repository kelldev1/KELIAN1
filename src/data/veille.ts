import type { Source, VeilleItem } from '../types/content'

export const veilleSubject = {
  title: 'Les agents IA outillés et le protocole MCP',
  goal: 'Comprendre comment intégrer des agents IA dans une application web.',
  method:
    'Documentation officielle, expérimentation, projets personnels connectés à des LLMs.',
}

export const veilleItems: VeilleItem[] = [
  {
    kicker: '01',
    title: "Un standard pour brancher l'IA",
    text: 'MCP standardise la connexion entre un agent IA et des outils, données ou APIs externes.',
  },
  {
    kicker: '02',
    title: 'Des agents réutilisables',
    text: "L'AI SDK TypeScript permet de construire des agents réutilisables dans Next.js et Node.js.",
  },
  {
    kicker: '03',
    title: "Le framework parle à l'assistant",
    text: 'Les frameworks exposent de plus en plus de contexte aux assistants pour aider au débogage.',
  },
  {
    kicker: '04',
    title: "La sécurité d'abord",
    text: 'La sécurité reste centrale : validation des entrées, permissions limitées, supervision humaine.',
  },
]

export const sources: Source[] = [
  {
    label: 'modelcontextprotocol.io',
    url: 'https://modelcontextprotocol.io',
    description: 'Spécification officielle du protocole MCP',
  },
  {
    label: 'docs.anthropic.com',
    url: 'https://docs.anthropic.com',
    description: "Documentation de l'API Claude et des outils",
  },
  {
    label: 'ai-sdk.dev',
    url: 'https://ai-sdk.dev',
    description: 'AI SDK TypeScript : agents et appels d’outils',
  },
  {
    label: 'nextjs.org',
    url: 'https://nextjs.org',
    description: 'Documentation du framework Next.js',
  },
]
