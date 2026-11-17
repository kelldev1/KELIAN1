import type { RefObject } from 'react'
import { HAND_INK_PATH, HAND_SILHOUETTE_PATH, HAND_TIP_Y } from '../data/handPaths'
import styles from './PencilHand.module.css'

type PencilHandProps = {
  handRef: RefObject<SVGGElement | null>
}

// Main qui écrit. Le groupe est calé pour que la pointe du crayon soit au point (0,0) :
// c'est ce point que l'animation déplace le long du trait.
function PencilHand({ handRef }: PencilHandProps) {
  return (
    <g ref={handRef}>
      <g transform={`translate(0 ${-HAND_TIP_Y})`}>
        {/* En dessous : l'intérieur plein, qui masque la ligne d'horizon derrière la main. */}
        <path className={styles.silhouette} d={HAND_SILHOUETTE_PATH} />
        {/* Au-dessus : les traits fins du dessin. */}
        <path className={styles.ink} d={HAND_INK_PATH} />
      </g>
    </g>
  )
}

export default PencilHand
