import type { RefObject } from 'react'
import { SCREEN_WIDTH, buildSkylinePath, screenShapes } from '../data/skyline'
import PencilHand from './PencilHand'
import styles from './DrawingScene.module.css'

type DrawingSceneProps = {
  pathRef: RefObject<SVGPathElement | null>
  handRef: RefObject<SVGGElement | null>
}

const SKYLINE_PATH = buildSkylinePath()
// On montre la bande utile (bâtiments + sol) et assez de place sous le sol pour la main.
const VIEW_BOX = `0 230 ${SCREEN_WIDTH * screenShapes.length} 290`

function DrawingScene({ pathRef, handRef }: DrawingSceneProps) {
  return (
    // Décoratif : tout le contenu utile est dans le HTML, pas dans le dessin.
    <svg className={styles.svg} viewBox={VIEW_BOX} aria-hidden="true" focusable="false">
      <path ref={pathRef} className={styles.line} d={SKYLINE_PATH} />
      <PencilHand handRef={handRef} />
    </svg>
  )
}

export default DrawingScene
