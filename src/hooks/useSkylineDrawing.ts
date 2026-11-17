import { useCallback, useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'

type Sample = { length: number; maxX: number; x: number; y: number }

// Prépare le trait et renvoie une fonction `draw(tipX)` :
// elle trace le chemin jusqu'à l'abscisse tipX et place la main au bout.
export function useSkylineDrawing(
  pathRef: RefObject<SVGPathElement | null>,
  handRef: RefObject<SVGGElement | null>,
) {
  const samples = useRef<Sample[]>([])
  const totalLength = useRef(0)

  // On échantillonne le chemin une seule fois : retrouver "où est le crayon" devient une simple recherche.
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()
    const list: Sample[] = []
    let maxX = 0
    for (let length = 0; length <= total; length += 4) {
      const point = path.getPointAtLength(length)
      maxX = Math.max(maxX, point.x)
      list.push({ length, maxX, x: point.x, y: point.y })
    }
    samples.current = list
    totalLength.current = total
  }, [pathRef])

  return useCallback(
    (tipX: number) => {
      const path = pathRef.current
      const hand = handRef.current
      const list = samples.current
      if (!path || !hand || list.length === 0) return

      // Recherche dichotomique : premier échantillon dont le plus grand x atteint dépasse tipX.
      let low = 0
      let high = list.length - 1
      while (low < high) {
        const middle = Math.floor((low + high) / 2)
        if ((list[middle]?.maxX ?? 0) >= tipX) high = middle
        else low = middle + 1
      }
      const tip = list[low]
      if (!tip) return

      // Astuce du "dashoffset" : un trait pointillé dont le tiret est aussi long que le chemin ;
      // le décaler révèle le chemin petit à petit.
      gsap.set(path, {
        strokeDasharray: totalLength.current,
        strokeDashoffset: totalLength.current - tip.length,
      })
      hand.setAttribute('transform', `translate(${tip.x} ${tip.y})`)
    },
    [pathRef, handRef],
  )
}
