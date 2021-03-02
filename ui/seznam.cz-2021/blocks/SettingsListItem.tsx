import * as React from 'react'
import styles from './settingsListItem.css'

interface IProps {
  readonly leftContent?: React.ReactChild | readonly React.ReactChild[]
  readonly rightContent?: React.ReactChild | readonly React.ReactChild[]
}

export default function SettingsListItem({leftContent, rightContent}: IProps) {
  return (
    <div className={styles.listItem}>
      <div>{leftContent}</div>
      <div>{rightContent}</div>
    </div>
  )
}
