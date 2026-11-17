import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { projects } from '../data/projects'
import styles from './ProjectsShowcase.module.css'

const WHEEL_THRESHOLD = 30
const COOLDOWN_MS = 900
const SWIPE_THRESHOLD = 50
const WATER_MS = 1300 // durée de l'effet d'eau (déformation liquide des images)
const WATER_PEAK = 34 // force maximale de la déformation, en pixels
const EXIT_MS = 450 // durée de la sortie du texte, avant d'afficher le suivant

// Une ligne de texte masquée : son contenu glisse à l'intérieur (entrée et sortie, décalées par --i).
function Line({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className={styles.line}>
      <span className={styles.lineInner} style={{ "--i": i } as CSSProperties}>
        {children}
      </span>
    </span>
  )
}

// "Formation IPSSI — 2025 · 2026" → contexte "Formation IPSSI" et années "2025 – 2026".
const contextOf = (kicker: string) => kicker.split(' — ')[0] ?? kicker
const yearsOf = (kicker: string) => (kicker.match(/\d{4}/g) ?? []).join(' – ')

// Lien du projet : le site s'il existe, sinon le code.
const linkOf = (index: number) => {
  const links = projects[index]?.links ?? []
  return (links.find((link) => link.label.toLowerCase().includes('site')) ?? links[0])?.url
}

// Vitrine plein écran : un projet à la fois, fond flou de l'image du projet, molette ou flèches pour changer.
function ProjectsShowcase() {
  // index : projet visé (miniature, fond) ; view : projet dont le texte est affiché (il change après la sortie).
  const [index, setIndex] = useState(0)
  const [view, setView] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState<1 | -1>(1)
  const [leaving, setLeaving] = useState(false)
  const indexRef = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const waterFrame = useRef(0)
  const lockedUntil = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const count = projects.length

  // Effet d'eau : la déformation monte puis retombe, et les ondes dérivent pendant le mouvement.
  const playWater = useCallback(() => {
    const root = rootRef.current
    const turbulence = turbulenceRef.current
    const displacement = displacementRef.current
    if (!root || !turbulence || !displacement) return
    cancelAnimationFrame(waterFrame.current)
    const start = performance.now()
    root.dataset.water = ''
    const frame = (now: number) => {
      const t = Math.min((now - start) / WATER_MS, 1)
      const power = Math.sin(Math.PI * t) ** 1.5
      displacement.setAttribute('scale', String(WATER_PEAK * power))
      turbulence.setAttribute('baseFrequency', `${0.003 + t * 0.003} ${0.010 + t * 0.004}`)
      if (t < 1) waterFrame.current = requestAnimationFrame(frame)
      else {
        delete root.dataset.water
        displacement.setAttribute('scale', '0')
      }
    }
    waterFrame.current = requestAnimationFrame(frame)
  }, [])

  const step = useCallback(
    (direction: 1 | -1) => {
      const now = performance.now()
      if (now < lockedUntil.current) return
      const next = Math.min(Math.max(indexRef.current + direction, 0), count - 1)
      if (next === indexRef.current) return
      lockedUntil.current = now + COOLDOWN_MS
      setDir(direction)
      playWater()
      setPrev(indexRef.current)
      indexRef.current = next
      setIndex(next)
      // 1) le texte actuel sort, 2) puis le nouveau texte entre.
      setLeaving(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setView(next)
        setLeaving(false)
      }, EXIT_MS)
    },
    [count, playWater],
  )

  useEffect(
    () => () => {
      clearTimeout(timer.current)
      cancelAnimationFrame(waterFrame.current)
    },
    [],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (Math.abs(delta) < WHEEL_THRESHOLD) return
      step(delta > 0 ? 1 : -1)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(event.key)) step(1)
      else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) step(-1)
    }
    let startX = 0
    let startY = 0
    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0
      startY = event.touches[0]?.clientY ?? 0
    }
    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      const dx = startX - touch.clientX
      const dy = startY - touch.clientY
      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy
      if (Math.abs(delta) >= SWIPE_THRESHOLD) step(delta > 0 ? 1 : -1)
    }

    root.addEventListener('wheel', onWheel, { passive: true })
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [step])

  const project = projects[view]
  if (!project) return null
  const url = linkOf(view)
  const years = yearsOf(project.kicker)

  return (
    <div ref={rootRef} className={styles.root}>
      {/* Filtre SVG de l'effet d'eau (référencé par le CSS tant que la transition joue). */}
      <svg className={styles.filters} aria-hidden="true" focusable="false">
        <filter id="showcase-water" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.003 0.010" numOctaves="1" seed="4" result="noise" />
          <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {/* Fonds : toutes les images floues empilées, seule l'active est visible (fondu entre deux projets). */}
      <div className={styles.backgrounds} aria-hidden="true">
        {projects.map((item, i) => (
          <div
            key={item.id}
            className={styles.background}
            data-active={i === index}
            style={item.image ? { backgroundImage: `url(${item.image.src})` } : undefined}
          />
        ))}
      </div>

      <div className={styles.stage}>
        {/* Miniature à gauche, avec le trait de progression. */}
        <div className={styles.media}>
          <span className={styles.rail} aria-hidden="true">
            <span
              className={styles.railThumb}
              style={{ height: `${100 / count}%`, transform: `translateY(${index * 100}%)` }}
            />
          </span>
          <a
            className={styles.thumb}
            data-dir={dir}
            href={linkOf(index)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${projects[index]?.name ?? ''} (s'ouvre dans un nouvel onglet)`}
          >
            {projects.map((item, i) =>
              item.image ? (
                <img
                  key={item.id}
                  className={styles.thumbImage}
                  data-state={i === index ? 'active' : i === prev ? 'prev' : undefined}
                  src={item.image.src}
                  alt={i === index ? item.image.alt : ''}
                  width={640}
                  height={360}
                />
              ) : (
                <span key={item.id} className={styles.thumbImage} data-state={i === index ? 'active' : i === prev ? 'prev' : undefined} data-empty="">
                  {item.name}
                </span>
              ),
            )}
          </a>
        </div>

        {/* Textes : un bloc par projet, recréé à chaque changement pour rejouer l'animation d'entrée. */}
        <div key={view} className={styles.info} data-dir={dir} data-leaving={leaving || undefined}>
          <p className={styles.kicker}>
            <Line i={0}>{project.subtitle}</Line>
            <Line i={1}>{contextOf(project.kicker)}</Line>
          </p>
          <h3 className={styles.title}>
            <Line i={2}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
            </Line>
          </h3>
          <p className={styles.meta}>
            <Line i={3}>{project.number}</Line>
            {years && <Line i={3}>{years}</Line>}
          </p>
          <ul className={styles.roles} aria-label="Technologies">
            {project.technologies.slice(0, 4).map((tech, n) => (
              <li key={tech}>
                <Line i={4 + n}>{tech}</Line>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p key={`d-${view}`} className={styles.description} data-leaving={leaving || undefined}>
        {project.description}
      </p>

      <p className={styles.counter} aria-live="polite">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        <span className={styles.hint} aria-hidden="true">
          {' '}
          · Molette · flèches
        </span>
      </p>
    </div>
  )
}

export default ProjectsShowcase
