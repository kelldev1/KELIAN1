import type { Chapter } from '../types/chapter'
import styles from './Navbar.module.css'

type NavbarProps = {
  chapters: Chapter[]
  activeId?: string
}

function Navbar({ chapters, activeId }: NavbarProps) {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="#debut" aria-label="Kelian Luye, retour au début">
        KL.
      </a>
      <nav aria-label="Navigation principale">
        <ul className={styles.list}>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                className={styles.link}
                href={`#${chapter.id}`}
                // Indique aux lecteurs d'écran (et au CSS) le chapitre affiché.
                aria-current={chapter.id === activeId ? 'true' : undefined}
              >
                <span className={styles.number}>{chapter.number}</span> {chapter.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
