import type { ReactNode } from 'react'
import styles from './Tag.module.css'

type TagProps = {
  children: ReactNode
}

function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>
}

export default Tag
