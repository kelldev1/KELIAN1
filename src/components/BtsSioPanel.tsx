import { realisations } from '../data/btsSio'
import ConveyorPanel from './ConveyorPanel'
import type { ConveyorDish } from './ui/sushi-conveyor-menu'

const dishes: ConveyorDish[] = realisations.map((rea) => ({
  id: rea.ref.toLowerCase(),
  name: rea.name,
  price: rea.period,
  tier: 1,
  description: `${rea.goal} ${rea.result}`,
  details: [rea.context, ...rea.competences],
  image: `/images/plates/${rea.ref.toLowerCase()}.svg`,
}))

const linkFor = (id: string) =>
  realisations.find((r) => r.ref.toLowerCase() === id)?.links[0]?.url

function BtsSioPanel() {
  return (
    <ConveyorPanel
      items={dishes}
      legend={{ 1: 'Réalisation du Bloc 1' }}
      eyebrow="BTS SIO · preuves du Bloc 1"
      heading="Mes réalisations, une assiette après l'autre."
      addLabel="Voir ↗"
      linkFor={linkFor}
    />
  )
}

export default BtsSioPanel
