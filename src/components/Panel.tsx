import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import styles from './Panel.module.css'

// Chaque chapitre a son propre cadre : le panneau ne ressemble jamais deux fois au même.
export type PanelVariant = 'sheet' | 'poster' | 'split' | 'folder'

export type PanelConfig = {
  variant: PanelVariant
  content: ReactNode
}

type PanelProps = {
  open: boolean
  title: string
  variant?: PanelVariant
  onClose: () => void
  children: ReactNode
}

// Panneau plein écran basé sur l'élément natif <dialog> :
// le navigateur gère déjà le piège du focus, la touche Échap et le retour du focus au bouton d'origine.
function Panel({ open, title, variant = 'sheet', onClose, children }: PanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    // onClose se déclenche aussi quand l'utilisateur appuie sur Échap : l'état reste synchronisé.
    <dialog
      ref={dialogRef}
      className={styles.panel}
      data-variant={variant}
      aria-label={title}
      onClose={onClose}
    >
      {open && (
        <div className={styles.card}>
          {/* Même structure pour tous : c'est le CSS de chaque variante qui les place différemment. */}
          <h2 className={styles.title}>{title}</h2>
          <button type="button" className={styles.close} onClick={onClose}>
            <span className={styles.closeLabel}>Fermer</span>
            <span aria-hidden="true" className={styles.closeIcon}>
              ✕
            </span>
          </button>
          <div className={styles.body}>{children}</div>
        </div>
      )}
    </dialog>
  )
}

export default Panel
