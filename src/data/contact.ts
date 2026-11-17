import type { ExternalLink } from '../types/content'

// Pas de numéro de téléphone : une donnée publique est récupérable par des robots (spam, démarchage).
export const email = 'kelian.luye@gmail.com'
export const cvPath = '/documents/cv-kelian-luye.pdf'

export const socialLinks: ExternalLink[] = [
  { label: 'GitHub', url: 'https://github.com/kelldev1' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kelian-luye/' },
]
