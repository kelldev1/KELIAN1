import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { glyphs, SPACE_WIDTH } from '../data/handwritingGlyphs'
import type { PenMove } from './HorizontalStory'
import styles from './HandwrittenText.module.css'

// Écriture à la main : chaque lettre est un vrai trait de stylo (police Hershey à un seul trait).
// La main suit le trait pendant qu'il se dessine. Les accents sont ajoutés à part, la police n'en a pas.
const SCALE = 1.5
const ADV = 1.5 // espacement entre lettres (la police en script se chevauche sinon)
const MIN_WIDTH = 700 // largeur de ligne (unités de police) : on essaie plusieurs largeurs
const WIDEST = 3400
const MAX_LINE_PX = 90 // hauteur de ligne maximale à l'écran, pour ne pas écrire en géant
const LINE_H = 62
const SPEED = 1000 // unités de trait par seconde

const ACCENTS: Record<string, (x: number) => string> = {
  '́': (x) => `M${x + 5},9 L${x + 9},4`,
  '̀': (x) => `M${x + 4},4 L${x + 8},9`,
  '̂': (x) => `M${x + 4},9 L${x + 7},4 L${x + 10},9`,
  '̈': (x) => `M${x + 4},6 L${x + 5},7 M${x + 9},6 L${x + 10},7`,
  '̧': (x) => `M${x + 6},23 L${x + 5},28`,
}

type Piece = { d: string; x: number; y: number }

function normalize(ch: string) {
  if (ch === '’' || ch === '‘') return "'"
  if (ch === '«' || ch === '»') return '"'
  if (ch === '–' || ch === '—') return '-'
  if (ch === '→') return '>'
  return ch
}

function advance(word: string) {
  let w = 0
  for (const ch of word.normalize('NFD')) {
    const g = glyphs[normalize(ch)]
    if (g) w += g.w * ADV
  }
  return w * SCALE
}

function layout(paragraphs: string[], maxWidth: number) {
  const pieces: Piece[] = []
  let y = 34
  for (const p of paragraphs) {
    let x = 0
    for (const word of p.split(' ')) {
      const wordW = advance(word)
      if (x > 0 && x + wordW > maxWidth) {
        x = 0
        y += LINE_H
      }
      let base = 0
      let origin = 0 // origine (en unités de police) de la dernière lettre, pour caler l'accent qui suit
      for (const ch of word.normalize('NFD')) {
        const accent = ACCENTS[ch]
        if (accent) {
          pieces.push({ d: accent(origin), x, y })
          continue
        }
        const g = glyphs[normalize(ch)]
        if (!g) continue
        origin = base
        pieces.push({ d: g.d, x: x + base * SCALE, y })
        base += g.w * ADV
      }
      x += wordW + SPACE_WIDTH * ADV * SCALE
    }
    y += LINE_H * 1.5
  }
  return { pieces, height: y, width: maxWidth }
}

// Plusieurs colonnes (pour les listes courtes) : les paragraphes sont répartis dans l'ordre.
const COL_GAP = 160
function layoutColumns(paragraphs: string[], maxWidth: number, cols: number) {
  const per = Math.ceil(paragraphs.length / cols)
  const pieces: Piece[] = []
  let height = 0
  for (let c = 0; c < cols; c++) {
    const group = paragraphs.slice(c * per, (c + 1) * per)
    if (!group.length) continue
    const l = layout(group, maxWidth)
    const dx = c * (maxWidth + COL_GAP)
    for (const piece of l.pieces) pieces.push({ ...piece, x: piece.x + dx })
    height = Math.max(height, l.height)
  }
  return { pieces, height, width: cols * maxWidth + (cols - 1) * COL_GAP }
}

// Choisit la largeur de ligne et le nombre de colonnes qui donnent le plus gros texte dans la place (w × h pixels).
function bestLayout(paragraphs: string[], w: number, h: number) {
  let best = layout(paragraphs, 900)
  let bestScale = 0
  const maxCols = Math.min(3, paragraphs.length)
  for (let cols = 1; cols <= maxCols; cols++) {
    for (let mw = MIN_WIDTH; mw <= WIDEST / cols; mw += 100) {
      const l = layoutColumns(paragraphs, mw, cols)
      const scale = Math.min(w / (l.width + 140), h / (l.height + 60), MAX_LINE_PX / LINE_H)
      if (scale > bestScale + 0.001) {
        best = l
        bestScale = scale
      }
    }
  }
  return { ...best, scale: bestScale }
}

type Props = { paragraphs: string[]; active: boolean; pen: PenMove; links?: { label: string; url: string }[]; maxHeight?: string }

function HandwrittenText({ paragraphs, active, pen, links, maxHeight }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [box, setBox] = useState({ w: 900, h: 400 })
  useLayoutEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = Math.round(el.clientWidth)
      const h = Math.round(el.clientHeight)
      setBox((b) => (Math.abs(b.w - w) > 8 || Math.abs(b.h - h) > 8 ? { w, h } : b))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const { pieces, height, width, scale } = useMemo(() => bestLayout(paragraphs, box.w, box.h), [paragraphs, box])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const svgRef = useRef<SVGSVGElement | null>(null)
  const doneRef = useRef(false) // le texte a été écrit en entier : on le laisse affiché

  useEffect(() => {
    const paths = pathRefs.current.filter((p): p is SVGPathElement => p !== null)
    const lengths = paths.map((p) => p.getTotalLength())
    const starts: number[] = []
    let total = 0
    lengths.forEach((len, i) => {
      starts[i] = total
      total += len + 6 // petit temps mort entre deux lettres
    })
    paths.forEach((p, i) => {
      p.style.strokeDasharray = `${lengths[i]!}`
      // Un trait pas encore commencé reste caché (sinon le bout arrondi laisse un point).
      p.style.strokeDashoffset = doneRef.current ? '0' : `${lengths[i]!}`
      p.style.visibility = doneRef.current ? 'visible' : 'hidden'
    })
    if (!active || doneRef.current) return
    const state = { p: 0 }
    const tween = gsap.to(state, {
      p: total,
      duration: total / SPEED,
      ease: 'none',
      delay: 0.5,
      onUpdate: () => {
        let cur = 0
        for (let i = 0; i < paths.length; i++) {
          const len = lengths[i]!
          const drawn = Math.min(Math.max(state.p - starts[i]!, 0), len)
          paths[i]!.style.strokeDashoffset = `${len - drawn}`
          paths[i]!.style.visibility = drawn > 0 ? 'visible' : 'hidden'
          if (drawn > 0) cur = i
        }
        const path = paths[cur]!
        const drawn = Math.min(Math.max(state.p - starts[cur]!, 0), lengths[cur]!)
        const pt = path.getPointAtLength(drawn)
        const ctm = path.getScreenCTM()
        if (ctm) pen(new DOMPoint(pt.x, pt.y).matrixTransform(ctm))
      },
      onComplete: () => {
        doneRef.current = true
        pen(null)
      },
    })
    return () => {
      tween.kill()
      pen(null)
    }
  }, [active, pen, pieces])

  return (
    <>
    <div ref={boxRef} className={styles.box} style={maxHeight ? { maxHeight } : undefined}>
    <svg
      ref={svgRef}
      className={styles.svg}
      width={(width + 140) * scale}
      height={(height + 60) * scale}
      viewBox={`-10 -10 ${width + 140} ${height + 60}`}
      preserveAspectRatio="xMinYMin meet"
      role="img"
      aria-label={paragraphs.join(' ')}
    >
      <g aria-hidden="true">
        {pieces.map((piece, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el
            }}
            className={styles.stroke}
            d={piece.d}
            transform={`translate(${piece.x} ${piece.y - 22 * SCALE}) scale(${SCALE})`}
          />
        ))}
      </g>
    </svg>
    </div>
      {links && (
        <p className={styles.links}>
          {links.map((link) => (
            <a key={link.url} className={styles.link} href={link.url}>
              {link.label}
            </a>
          ))}
        </p>
      )}
    </>
  )
}

export default HandwrittenText
