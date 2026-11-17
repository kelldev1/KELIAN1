import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { glyphs, SPACE_WIDTH } from '../data/handwritingGlyphs'
import type { PenMove } from './HorizontalStory'
import styles from './HandwrittenText.module.css'

// Écriture à la main : chaque lettre est un vrai trait de stylo (police Hershey à un seul trait).
// La main suit le trait pendant qu'il se dessine. Les accents sont ajoutés à part, la police n'en a pas.
const SCALE = 1.5
const ADV = 1.5 // espacement entre lettres (la police en script se chevauche sinon)
const MAX_WIDTH = 900
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

function layout(paragraphs: string[]) {
  const pieces: Piece[] = []
  let y = 34
  for (const p of paragraphs) {
    let x = 0
    for (const word of p.split(' ')) {
      const wordW = advance(word)
      if (x > 0 && x + wordW > MAX_WIDTH) {
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
  return { pieces, height: y }
}

type Props = { paragraphs: string[]; active: boolean; pen: PenMove; links?: { label: string; url: string }[] }

function HandwrittenText({ paragraphs, active, pen, links }: Props) {
  const { pieces, height } = useMemo(() => layout(paragraphs), [paragraphs])
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
    <svg
      ref={svgRef}
      className={styles.svg}
      viewBox={`-10 -10 ${MAX_WIDTH + 140} ${height + 60}`}
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
