import type { ElementType, ReactNode } from 'react'
import styles from './GiantTitle.module.css'

type GiantTitleProps = {
  children: ReactNode
  // Le niveau de titre (h1, h2...) est choisi par l'appelant pour garder un HTML sémantique correct.
  as?: ElementType
  // Permet à une section de se relier à son titre avec aria-labelledby.
  id?: string
}

function GiantTitle({ children, as: Tag = 'h2', id }: GiantTitleProps) {
  return (
    <Tag id={id} className={styles.title}>
      {children}
    </Tag>
  )
}

export default GiantTitle
