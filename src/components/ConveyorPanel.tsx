import type { ConveyorDish } from './ui/sushi-conveyor-menu'
import SushiConveyorMenu from './ui/sushi-conveyor-menu'

type ConveyorPanelProps = {
  items: ConveyorDish[]
  legend: Record<number, string>
  eyebrow: string
  heading: string
  // Bouton du dialogue : ouvre un lien externe (site ou code) quand l'assiette en a un.
  linkFor?: (id: string) => string | undefined
  addLabel?: string
}

const BASE_LABELS = {
  close: 'Fermer',
  previous: 'Assiette précédente',
  next: 'Assiette suivante',
  pause: 'Mettre le convoyeur en pause',
}

// Même mise en page que le panneau Parcours : un convoyeur d'assiettes plein écran.
function ConveyorPanel({
  items,
  legend,
  eyebrow,
  heading,
  linkFor,
  addLabel = 'Compris',
}: ConveyorPanelProps) {
  return (
    <SushiConveyorMenu
      items={items}
      legend={legend}
      labels={{ ...BASE_LABELS, add: addLabel }}
      eyebrow={eyebrow}
      heading={heading}
      caption="Survole une assiette pour la lire, fais glisser pour faire tourner, clique pour l'ouvrir."
      autoplay
      onAdd={(item) => {
        const url = linkFor?.(item.id)
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
      }}
      className="flex h-full items-center justify-center bg-transparent!"
    />
  )
}

export default ConveyorPanel
