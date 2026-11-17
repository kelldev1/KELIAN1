import { competences, realisations } from '../data/btsSio'
import styles from './SynthesisTable.module.css'

// Tableau de synthèse du Bloc 1 : quelle réalisation prouve quelle compétence.
function SynthesisTable() {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>Tableau de synthèse · Bloc 1</caption>
      <thead>
        <tr>
          <th scope="col">Réalisation</th>
          {competences.map((c) => (
            <th key={c.code} scope="col" title={c.label}>
              {c.code}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {realisations.map((rea) => (
          <tr key={rea.ref}>
            <th scope="row">
              {rea.ref} · {rea.name}
            </th>
            {competences.map((c) => (
              <td key={c.code} aria-label={rea.competences.includes(c.code) ? 'Oui' : 'Non'}>
                {rea.competences.includes(c.code) ? '●' : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          {competences.map((c) => (
            <td key={c.code}>{c.count}</td>
          ))}
        </tr>
      </tfoot>
    </table>
  )
}

export default SynthesisTable
