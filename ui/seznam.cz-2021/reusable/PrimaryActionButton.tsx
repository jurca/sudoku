import classnames from 'classnames'
import * as React from 'react'
import styles from './primaryActionButton.css'

interface IProps {
  readonly className?: string
  readonly children?: string
  readonly onAction?: () => void
}

export default function PrimaryActionButton({className, children, onAction}: IProps) {
  return (
    <button className={classnames(styles.button, className)} onClick={onAction}>
      {children}
    </button>
  )
}
