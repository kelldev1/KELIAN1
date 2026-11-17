import { useEffect, useState } from 'react'
import AboutPanel from '../components/AboutPanel'
import HorizontalStory from '../components/HorizontalStory'
import Navbar from '../components/Navbar'
import { chapters } from '../data/chapters'
import { storySlides } from '../data/story'
import ParcoursPanel from '../components/ParcoursPanel'
import CompetencesPanel from '../components/CompetencesPanel'
import ProjectsShowcase from '../components/ProjectsShowcase'
import BtsSioPanel from '../components/BtsSioPanel'

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
          panels={{
            'a-propos': { variant: 'poster', content: <AboutPanel /> },
            parcours: { variant: 'poster', content: <ParcoursPanel /> },
            competences: { variant: 'poster', content: <CompetencesPanel /> },
            projets: { variant: 'poster', content: <ProjectsShowcase /> },
            'bts-sio': { variant: 'poster', content: <BtsSioPanel /> },
          }}
        />
      </main>
    </>
  )
}

export default HomePage
