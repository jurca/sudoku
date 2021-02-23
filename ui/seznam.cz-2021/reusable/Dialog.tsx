import classnames from 'classnames'
import * as React from 'react'
import styles from './dialog.css'
import IconButton, {IconType} from './IconButton'

interface IProps {
  readonly title?: string
  readonly isNested: boolean
  readonly children: React.ReactChild | readonly React.ReactChild[]
  readonly onClose?: () => void
}

export default function Dialog(props: IProps) {
  return (
    <div className={classnames(styles.dialog, props.isNested && styles.isNested, props.title && styles.hasTitle)}>
      <div className={styles.ui}>
        <div className={styles.header}>
          <div className={styles.buttonWrapper}>
            <IconButton className={styles.back} icon={IconType.ARROW_LEFT} onAction={props.onClose}/>
          </div>
          <div className={styles.title}>
            {props.title}
          </div>
          <div className={styles.buttonWrapper}>
            <IconButton className={styles.close} icon={IconType.CLOSE} onAction={props.onClose}/>
          </div>
        </div>
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}
