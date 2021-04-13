import * as React from 'react'
import styles from './congratulations.css'
import CongratulationsIllustration from './congratulations.svg'

export default function Congratulations() {
  return (
    <div className={styles.congratulations}>
      <div className={styles.illustration}>
        <CongratulationsIllustration/>
      </div>
      <h2 className={styles.title}>
        Gratulujeme
      </h2>
      <p className={styles.text}>
        Právě jste úspěšně dokončili vaši hru.
      </p>
    </div>
  )
}
