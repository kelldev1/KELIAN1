import { NearbyWalk, type NearbyPlace } from './ui/nearby-walk-menu'
import styles from './ParcoursPanel.module.css'

// Étapes dans l'ordre chronologique, de gauche (départ) à droite (aujourd'hui).
// Source des textes : data/timeline.ts (périodes et intitulés repris tels quels).
// Le composant affiche une "durée de marche" puis une "distance" au survol : on y met la période
// puis le lieu, en passant par un index (walkMinutes / km = position dans STEPS).
type Step = { id: string; name: string; period: string; where: string; detail: string; image?: string; knockout?: boolean }

const GARAC = ''
const IPSSI = ''
const JEAN_ROSTAND = ''

const ORIGIN = { name: 'Bac Pro Mécanique', period: '2019 – 2022', where: 'Lycée Jean Rostand', detail: 'Mécanique générale, à Mantes-la-Jolie' }

const STEPS: Step[] = [
  { id: 'myeongdong', name: 'BTS Systèmes Embarqués', period: '2024 – 2025', where: 'GARAC', detail: 'Réorientation vers l\x27informatique', image: GARAC, knockout: true },
  { id: 'station', name: 'Projet Kart', period: 'Fév. – mai 2025', where: 'GARAC · pilotage', detail: 'Concepteur technique : pilotage, équipe, délais', image: GARAC, knockout: true },
  { id: 'gate', name: 'Smart Moov', period: 'Juin – juil. 2025', where: 'Télétravail · support', detail: 'Support applicatif, tickets Zendesk, méthode agile' },
  { id: 'palace', name: 'Mission IPSSI', period: 'Nov. – déc. 2025', where: 'Front-end · Git', detail: 'Front-end HTML/CSS responsive, Git en équipe', image: IPSSI },
  { id: 'tower', name: 'BTS SIO SLAM', period: '2025 – 2027', where: 'IPSSI · alternance', detail: 'Développement d\x27applications, alternance une semaine sur deux', image: IPSSI },
]

const places: NearbyPlace[] = STEPS.map((step, index) => ({
  id: step.id,
  name: step.name,
  km: index,
  walkMinutes: index,
  image: step.image,
  knockout: step.knockout,
  detail: step.detail,
}))

function ParcoursPanel() {
  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>Parcours · de 2019 à 2027</p>
      <h2 className={styles.heading}>De la mécanique au code, étape après étape.</h2>

      <NearbyWalk
        places={places}
        origin={ORIGIN.name}
        originImage={JEAN_ROSTAND}
        originKnockout
        originDetail={ORIGIN.detail}
        bare
        theme="night"
        formatWalk={(index) => STEPS[index]?.period ?? ''}
        formatDistance={(index) => STEPS[index]?.where ?? ''}
        ariaLabel={`Parcours chronologique : ${ORIGIN.name} (${ORIGIN.period}), puis ${STEPS.map((s) => `${s.name} (${s.period})`).join(', ')}`}
        hint={null}
        showThemes={false}
        // Fond transparent : on garde le flou du panneau derrière. Police du site (Helvetica).
        style={{ background: 'none', padding: 0, fontFamily: 'var(--font-body)' }}
      />

      <p className={styles.caption}>
        Survole une étape pour voir sa période et son lieu. Départ à gauche : {ORIGIN.name} ({ORIGIN.period}, {ORIGIN.where}).
      </p>

    </div>
  )
}

export default ParcoursPanel
