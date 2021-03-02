import BACKGROUND_PATTERN_IMAGE from '!!raw-loader!./backgroundPattern.svg'
import * as React from 'react'
import styles from './backgroundPattern.css'

export default function BackgroundPattern() {
  return (
    <div
      className={styles.background}
      style={{backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(BACKGROUND_PATTERN_IMAGE)}')`}}
    />
  )
}
