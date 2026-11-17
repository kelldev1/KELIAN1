export type ExternalLink = {
  label: string
  url: string
}

export type Project = {
  id: string
  number: string
  kicker: string // contexte + année, ex. "Formation IPSSI — 2024"
  name: string
  subtitle: string
  description: string
  role: string
  technologies: string[]
  takeaway: string // "Ce que j'en retiens"
  image?: { src: string; alt: string }
  links: ExternalLink[]
}

export type SkillLevel = 1 | 2 // 1 = basique/intermédiaire, 2 = confirmé

export type Skill = {
  id: string
  name: string
  levelLabel: string
  level: SkillLevel
  tools: string
}

export type TimelineItem = {
  period: string
  text: string
}

export type Competence = {
  code: string
  label: string
  count: number
}

export type Realisation = {
  ref: string
  name: string
  context: string
  period: string
  goal: string
  result: string
  competences: string[] // codes B1.x
  links: ExternalLink[]
}

export type VeilleItem = {
  kicker: string
  title: string
  text: string
}

export type Source = {
  label: string
  url: string
  description: string
}
