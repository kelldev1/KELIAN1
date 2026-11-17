import { aboutParagraphs } from '../data/about'
import styles from './AboutPanel.module.css'

// Page "À propos" : juste du texte, posé sur le fond flou (même ambiance que les pages à assiettes).
function AboutPanel() {
  return (
    <div className={styles.poster}>
      <p className={styles.eyebrow}>À propos · Kelian Luye</p>
      <h3 className={styles.posterHeading}>Comprendre avant de toucher.</h3>
      <div className={styles.posterText}>
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}

export default AboutPanel
