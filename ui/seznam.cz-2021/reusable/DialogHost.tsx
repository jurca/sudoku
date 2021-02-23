import * as React from 'react'
import styles from './dialogHost.css'

interface IProps {
  readonly children: React.ReactChild | readonly React.ReactChild[]
}

export default function DialogHost({children}: IProps) {
  return (
    <div className={styles.dialogHost}>
      {children}
    </div>
  )
}
