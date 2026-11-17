import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import type { StorySlide } from '../types/chapter'
import { SCREEN_WIDTH } from '../data/skyline'
import { useHorizontalNavigation } from '../hooks/useHorizontalNavigation'
import { useSkylineDrawing } from '../hooks/useSkylineDrawing'
import DrawingScene from './DrawingScene'
import Panel from './Panel'
import type { PanelConfig } from './Panel'
import styles from './HorizontalStory.module.css'

// Déplace la main du bas au point d'écran donné (null = elle retourne au trait de la skyline).
export type PenMove = (point: { x: number; y: number } | null) => void

type HorizontalStoryProps = {
  slides: StorySlide[]
  onActiveChange: (index: number) => void
  // Contenu détaillé par id de chapitre : s'il existe, un bouton ouvre le panneau plein écran.
  panels?: Record<string, PanelConfig>
  drawn?: Record<string, (active: boolean, pen: PenMove) => ReactNode>
}

// Où se trouve le crayon dans l'écran (65 % depuis la gauche) : la caméra le suit vers la droite.
const PENCIL_SCREEN_RATIO = 0.65

function HorizontalStory({ slides, onActiveChange, panels = {}, drawn }: HorizontalStoryProps) {
  const [openPanelId, setOpenPanelId] = useState<string | null>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const handRef = useRef<SVGGElement>(null)
  // position : où est la caméra (0 = 1er écran) ; intro : 0 → 1 au chargement, le dessin se trace une 1re fois.
  const state = useRef({ position: 0, intro: 0 })
  // Volontairement ignoré : le dessin qui se trace EST la transition entre écrans.
  // (Le réglage système "réduire les animations" la supprimait entièrement.)
  const reducedMotion = false
  const count = slides.length
  // useMemo : un tableau stable évite de recréer les écouteurs d'événements à chaque rendu.
  const ids = useMemo(() => slides.map((slide) => slide.id), [slides])

  const handBusyRef = useRef(false)
  const draw = useSkylineDrawing(pathRef, handRef, handBusyRef)

  const render = useCallback(() => {
    const { position, intro } = state.current
    // Le "monde" fait count écrans de large : on le décale d'une fraction de sa propre largeur.
    if (worldRef.current)
      gsap.set(worldRef.current, { xPercent: -(position / count) * 100 })
    draw((position + PENCIL_SCREEN_RATIO) * SCREEN_WIDTH * intro)
  }, [count, draw])

  const pen = useCallback<PenMove>(
    (point) => {
      const hand = handRef.current
      if (!point) {
        handBusyRef.current = false
        render()
        return
      }
      const ctm = hand?.ownerSVGElement?.getScreenCTM()
      if (!hand || !ctm) return
      handBusyRef.current = true
      const p = new DOMPoint(point.x, point.y).matrixTransform(ctm.inverse())
      hand.setAttribute('transform', `translate(${p.x} ${p.y})`)
    },
    [render],
  )

  const { activeIndex, goTo } = useHorizontalNavigation({
    ids,
    reducedMotion,
    onMove: (position) => {
      state.current.position = position
      render()
    },
  })

  useEffect(() => {
    onActiveChange(activeIndex)
  }, [activeIndex, onActiveChange])

  // Images de fond uniques (plusieurs chapitres peuvent partager la même) : un fondu entre deux
  // chapitres qui ont la même image ne ferait que la faire "cligner".
  const backgrounds = useMemo(
    () => [...new Set(slides.map((slide) => slide.background))].filter(Boolean),
    [slides],
  )
  const activeBackground = slides[activeIndex]?.background

  // Au chargement : le trait se dessine tout seul jusqu'à la main (ou directement, si animations réduites).
  useEffect(() => {
    if (reducedMotion) {
      state.current.intro = 1
      render()
      return
    }
    render()
    const tween = gsap.to(state.current, {
      intro: 1,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate: render,
    })
    return () => {
      tween.kill()
    }
  }, [reducedMotion, render])

  return (
    <div className={styles.viewport}>
      {/* Affiches en fond, fixes : on n'en affiche qu'une, les autres sont en fondu à 0. */}
      <div className={styles.backgrounds} aria-hidden="true">
        {backgrounds.map((src) => (
          <div
            key={src}
            className={styles.background}
            style={{ backgroundImage: `url(${src})` }}
            data-active={src === activeBackground}
          />
        ))}
      </div>
      <div ref={worldRef} className={styles.world} style={{ width: `${count * 100}vw` }}>
        <div className={styles.drawing}>
          <DrawingScene pathRef={pathRef} handRef={handRef} />
        </div>
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            className={styles.screen}
            aria-labelledby={`${slide.id}-titre`}
            // inert : un écran hors champ ne peut ni recevoir le focus clavier ni être lu par erreur.
            inert={index !== activeIndex}
          >
            <p className={styles.kicker}>{slide.kicker}</p>
            {/* Un seul h1 sur la page : le premier écran. */}
            {index === 0 ? (
              <h1 id={`${slide.id}-titre`} className={styles.title}>
                {slide.title}
              </h1>
            ) : (
              <h2 id={`${slide.id}-titre`} className={styles.title}>
                {slide.title}
              </h2>
            )}
            {/* Cartouche plein, sous la ligne de texte de l'affiche : lisible sur n'importe quel fond. */}
            {drawn?.[slide.id] ? (
              drawn[slide.id]!(index === activeIndex, pen)
            ) : (
            <div className={styles.note}>
              <p className={styles.text}>{slide.text}</p>
              {slide.link && (
                <a className={styles.link} href={slide.link.url}>
                  {slide.link.label}
                </a>
              )}
              {panels[slide.id] && (
                <button
                  type="button"
                  className={styles.link}
                  onClick={() => setOpenPanelId(slide.id)}
                >
                  Lire la suite
                </button>
              )}
            </div>
            )}
          </section>
        ))}
      </div>

      {slides.map((slide) =>
        panels[slide.id] ? (
          <Panel
            key={slide.id}
            open={openPanelId === slide.id}
            variant={panels[slide.id]?.variant}
            title={slide.kicker}
            onClose={() => setOpenPanelId(null)}
          >
            {panels[slide.id]?.content}
          </Panel>
        ) : null,
      )}

      <div className={styles.controls}>
        <p className={styles.counter} aria-live="polite">
          {String(activeIndex).padStart(2, '0')} / {String(count - 1).padStart(2, '0')}
        </p>
        <p className={styles.hint} aria-hidden="true">
          Molette · flèches ← →
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Chapitre précédent"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === count - 1}
            aria-label="Chapitre suivant"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default HorizontalStory
