import * as React from 'react'
import styles from './primaryActionButton.css'

interface IProps {
  readonly children?: string
}

export default function PrimaryActionButton({children}: IProps) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  )
}
