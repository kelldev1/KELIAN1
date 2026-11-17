import { useCallback, useMemo, type RefObject } from 'react'
import { SCREEN_WIDTH, buildSkylineTrace } from '../data/skyline'

// Où se trouve le crayon dans l'écran au repos (doit rester égal à PENCIL_SCREEN_RATIO de HorizontalStory).
const PENCIL_REST_X = 0.65 * SCREEN_WIDTH

// Prépare le trait et renvoie une fonction `draw(tipX)`.
// Le crayon avance le long du trait, dans l'ordre, détail après détail : rien n'apparaît avant d'être dessiné.
// tipX (la progression de la caméra) est converti en longueur de trait : quand la caméra est posée sur
// l'écran i, tout le dessin de l'écran i est terminé.
export function useSkylineDrawing(
  pathRef: RefObject<SVGPathElement | null>,
  handRef: RefObject<SVGGElement | null>,
  // true tant qu'un texte s'écrit : c'est alors lui qui place la main (la même main, pas une deuxième).
  handBusyRef: RefObject<boolean>,
) {
  const trace = useMemo(() => {
    const { points, stops } = buildSkylineTrace()
    // Longueur cumulée jusqu'à chaque point (un lever de crayon ne compte pas).
    const lengths: number[] = [0]
    for (let i = 1; i < points.length; i++) {
      const p = points[i]!
      const q = points[i - 1]!
      lengths.push(lengths[i - 1]! + (p.move ? 0 : Math.hypot(p.x - q.x, p.y - q.y)))
    }
    // Repères (position de la caméra -> longueur dessinée) : début, puis chaque fin d'écran.
    const anchors: Array<[number, number]> = [[0, 0]]
    stops.forEach((index, screen) => anchors.push([screen * SCREEN_WIDTH + PENCIL_REST_X, lengths[index]!]))
    return { points, lengths, anchors, total: lengths[lengths.length - 1]! }
  }, [])

  return useCallback(
    (tipX: number) => {
      const path = pathRef.current
      const hand = handRef.current
      if (!path || !hand) return
      const { points, lengths, anchors, total } = trace

      // tipX -> longueur, par interpolation entre deux repères.
      let length = total
      for (let i = 1; i < anchors.length; i++) {
        const [x1, l1] = anchors[i]!
        if (tipX <= x1) {
          const [x0, l0] = anchors[i - 1]!
          length = l0 + ((l1 - l0) * Math.max(0, tipX - x0)) / (x1 - x0 || 1)
          break
        }
      }

      // Dernier point entièrement dessiné (recherche dichotomique), puis le bout du trait en cours.
      let low = 0
      let high = lengths.length - 1
      while (low < high) {
        const middle = Math.ceil((low + high) / 2)
        if (lengths[middle]! <= length) low = middle
        else high = middle - 1
      }
      const parts: string[] = []
      for (let i = 0; i <= low; i++) {
        const p = points[i]!
        parts.push(`${p.move ? 'M' : 'L'}${p.x} ${p.y}`)
      }
      let tip = points[low]!
      const next = points[low + 1]
      if (next && !next.move && length > lengths[low]!) {
        const t = (length - lengths[low]!) / (lengths[low + 1]! - lengths[low]!)
        tip = { x: tip.x + (next.x - tip.x) * t, y: tip.y + (next.y - tip.y) * t, move: false }
        parts.push(`L${tip.x.toFixed(1)} ${tip.y.toFixed(1)}`)
      }
      path.setAttribute('d', parts.join(' '))
      if (!handBusyRef.current) hand.setAttribute('transform', `translate(${tip.x} ${tip.y})`)
    },
    [pathRef, handRef, handBusyRef, trace],
  )
}
