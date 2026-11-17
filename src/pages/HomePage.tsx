import { useEffect, useState } from 'react'
import HandwrittenText from '../components/HandwrittenText'
import { aboutParagraphs } from '../data/about'
import { veilleLines, competencesLines, contactLines, parcoursLines } from '../data/handwritten'
import { sources } from '../data/veille'
import SynthesisTable from '../components/SynthesisTable'
import { email, socialLinks } from '../data/contact'
import HorizontalStory from '../components/HorizontalStory'
import Navbar from '../components/Navbar'
import { chapters } from '../data/chapters'
import { storySlides } from '../data/story'
import ProjectsShowcase from '../components/ProjectsShowcase'

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeChapter = chapters[activeIndex]

  // Le thème (couleurs) suit le chapitre à l'écran ; les styles lisent data-theme sur <html>.
  useEffect(() => {
    document.documentElement.dataset.theme = activeChapter?.theme ?? 'cobalt'
  }, [activeChapter])

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Navbar chapters={chapters} activeId={activeChapter?.id} />
      <main id="contenu">
        <HorizontalStory
          slides={storySlides}
          onActiveChange={setActiveIndex}
          drawn={{
            'a-propos': (active, pen) => <HandwrittenText paragraphs={aboutParagraphs} active={active} pen={pen} />,
            parcours: (active, pen) => <HandwrittenText paragraphs={parcoursLines} active={active} pen={pen} />,
            competences: (active, pen) => <HandwrittenText paragraphs={competencesLines} active={active} pen={pen} />,
            'bts-sio': (active, pen) => (
              // Tableau à gauche, veille à droite : les deux tiennent au-dessus des sommets.
              <div className="bts-row">
                <div className="bts-gauche">
                  <SynthesisTable />
                  <a className="bts-telecharger" href="/documents/tableau-de-synthese-bloc1.pdf" download>
                    Télécharger le tableau de synthèse (PDF) ↓
                  </a>
                  <p className="bts-sources">
                    {sources.map((s) => (
                      <a key={s.url} href={s.url}>
                        {s.label}
                      </a>
                    ))}
                  </p>
                </div>
                <div className="bts-veille">
                  <HandwrittenText paragraphs={veilleLines} active={active} pen={pen} />
                </div>
              </div>
            ),
            contact: (active, pen) => (
              <HandwrittenText
                paragraphs={contactLines}
                active={active}
                pen={pen}
                links={[{ label: 'Écrire un mail', url: `mailto:${email}` }, ...socialLinks]}
              />
            ),
          }}
          panels={{
            projets: { variant: 'poster', content: <ProjectsShowcase /> },
          }}
        />
      </main>
    </>
  )
}

export default HomePage
