import { projects } from '../data/projects'
import styles from './ProjectsPanel.module.css'

function ProjectsPanel() {
  return (
    <ol className={styles.grid}>
      {projects.map((project) => (
        <li key={project.id} className={styles.card}>
          <header className={styles.top}>
            <span className={styles.number} aria-hidden="true">
              {project.number}
            </span>
            <span className={styles.kicker}>{project.kicker}</span>
          </header>

          {/* Capture : en noir et blanc au repos, en couleur au survol. */}
          {project.image && (
            <img
              className={styles.image}
              src={project.image.src}
              alt={project.image.alt}
              loading="lazy"
              width={640}
              height={400}
            />
          )}

          <div className={styles.content}>
            <h3 className={styles.name}>{project.name}</h3>
            <p className={styles.subtitle}>{project.subtitle}</p>
            <p>{project.description}</p>
            <p className={styles.role}>{project.role}</p>

            <ul className={styles.tags} aria-label="Technologies">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <p className={styles.takeaway}>
              <strong>Ce que j&apos;en retiens :</strong> {project.takeaway}
            </p>

            <ul className={styles.links}>
              {project.links.map((link) => (
                <li key={link.url}>
                  {/* noopener noreferrer : la page ouverte ne peut pas agir sur celle-ci. */}
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label} ↗
                    <span className={styles.srOnly}>
                      {' '}
                      (s&apos;ouvre dans un nouvel onglet)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default ProjectsPanel
