import classnames from 'classnames'
import * as React from 'react'
import Icon, {IconType} from './Icon'
import styles from './iconButton.css'

interface IProps {
  readonly icon: IconType
  readonly children?: string
  readonly onAction?: () => void
}

export default function IconButton({icon, children, onAction}: IProps) {
  return (
    <button className={classnames(styles.iconButton, children && styles.hasText)} onClick={onAction}>
      <div className={styles.icon}>
        <Icon icon={icon}/>
      </div>
      {children}
    </button>
  )
}

export {IconType}
