import { skills } from '../data/skills'
import ConveyorPanel from './ConveyorPanel'
import type { ConveyorDish } from './ui/sushi-conveyor-menu'

const dishes: ConveyorDish[] = skills.map((skill) => ({
  id: `skill-${skill.id}`,
  name: skill.name,
  price: skill.levelLabel.split(' — ')[0] ?? skill.levelLabel,
  tier: skill.level === 2 ? 1 : 2,
  description: skill.tools,
  details: [skill.levelLabel],
  image: `/images/plates/skill-${skill.id}.svg`,
}))

function CompetencesPanel() {
  return (
    <ConveyorPanel
      items={dishes}
      legend={{ 1: 'Confirmé', 2: 'En progression' }}
      eyebrow="Compétences · sept outils"
      heading="Du front à la base de données, une assiette après l'autre."
    />
  )
}

export default CompetencesPanel
