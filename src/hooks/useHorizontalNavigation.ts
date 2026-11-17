import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type Options = {
  ids: string[] // ids des chapitres, dans l'ordre de la frise
  reducedMotion: boolean
  // Appelée à chaque image de l'animation avec la position (0 = 1er écran, 1 = 2e, 1.5 = entre les deux).
  onMove: (position: number) => void
}

const WHEEL_THRESHOLD = 30 // ignore les micro-mouvements de molette
const COOLDOWN_MS = 1000 // évite d'enchaîner plusieurs écrans avec l'inertie d'un trackpad
const SWIPE_THRESHOLD = 50

const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max)

// Gère toute la navigation : molette, clavier, glisser (mobile) et ancres de la navbar.
// On avance toujours d'un écran à la fois, ce qui garde le comportement simple et prévisible.
export function useHorizontalNavigation({ ids, reducedMotion, onMove }: Options) {
  // Position de départ : celle de l'URL (#contact), sinon le premier écran.
  const [initialIndex] = useState(() =>
    Math.max(ids.indexOf(window.location.hash.slice(1)), 0),
  )
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const position = useRef({ value: initialIndex })
  const indexRef = useRef(initialIndex)
  const lockedUntil = useRef(0)
  const onMoveRef = useRef(onMove)

  useEffect(() => {
    onMoveRef.current = onMove
  })

  const goTo = useCallback(
    (target: number, instant = false) => {
      const index = clamp(target, ids.length - 1)
      indexRef.current = index
      setActiveIndex(index)
      // replaceState met l'URL à jour (#projets) sans polluer l'historique.
      history.replaceState(null, '', `#${ids[index]}`)

      if (instant || reducedMotion) {
        gsap.killTweensOf(position.current)
        position.current.value = index
        onMoveRef.current(index)
        return
      }
      gsap.to(position.current, {
        value: index,
        duration: 1.2,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: () => onMoveRef.current(position.current.value),
      })
    },
    [ids, reducedMotion],
  )

  // Place la caméra sur l'écran de départ dès le premier affichage (sans animation).
  useEffect(() => {
    onMoveRef.current(position.current.value)
  }, [])

  useEffect(() => {
    // Quand un panneau (dialog) est ouvert, la frise ne doit pas bouger derrière.
    const isBlocked = () => document.querySelector('dialog[open]') !== null

    const step = (direction: 1 | -1) => {
      const now = performance.now()
      if (now < lockedUntil.current || isBlocked()) return
      lockedUntil.current = now + COOLDOWN_MS
      goTo(indexRef.current + direction)
    }

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (Math.abs(delta) < WHEEL_THRESHOLD) return
      step(delta > 0 ? 1 : -1)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || isBlocked()) return
      const target = event.target as HTMLElement
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

      if (
        event.key === 'ArrowRight' ||
        event.key === 'ArrowDown' ||
        event.key === 'PageDown'
      ) {
        step(1)
      } else if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageUp'
      ) {
        step(-1)
      } else if (event.key === 'Home') {
        goTo(0)
      } else if (event.key === 'End') {
        goTo(ids.length - 1)
      }
    }

    let touchStartX = 0
    let touchStartY = 0
    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0
      touchStartY = event.touches[0]?.clientY ?? 0
    }
    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      const dx = touchStartX - touch.clientX
      const dy = touchStartY - touch.clientY
      const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy
      if (Math.abs(delta) >= SWIPE_THRESHOLD) step(delta > 0 ? 1 : -1)
    }

    // Clic sur un lien de la navbar (#projets) ou bouton "retour" du navigateur.
    const onHashChange = () => {
      const index = ids.indexOf(window.location.hash.slice(1))
      if (index >= 0 && index !== indexRef.current) goTo(index)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [ids, goTo])

  return { activeIndex, goTo }
}
