import type { ReactNode } from 'react'
import styles from './Frame.module.css'

type FrameProps = {
  children: ReactNode
  // Étiquette affichée en haut du cadre, façon affiche brutaliste.
  label?: string
}

function Frame({ children, label }: FrameProps) {
  return (
    <div className={styles.frame}>
      {label && <span className={styles.label}>{label}</span>}
      {children}
    </div>
  )
}

export default Frame
