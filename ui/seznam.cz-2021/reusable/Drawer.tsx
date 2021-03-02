import classnames from 'classnames'
import * as React from 'react'
import Dialog from './Dialog'
import styles from './drawer.css'
import IconButton, {IconType} from './IconButton'
import isAndroidOrIOS from './isAndroidOrIOS'
import PrimaryActionButton from './PrimaryActionButton'

interface IProps {
  readonly title: string
  readonly isNested: boolean
  readonly children: React.ReactChild | readonly React.ReactChild[]
  readonly actionLabel: string
  readonly onClose?: () => void
  readonly onAction?: () => void
}

export default function Drawer(props: IProps) {
  const showAsDialog = !isAndroidOrIOS()
  if (showAsDialog) {
    return (
      <Dialog isNested={props.isNested} title={props.title} onClose={props.onClose}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {props.children}
          </div>
          <PrimaryActionButton className={styles.primaryAction} onAction={props.onAction}>
            {props.actionLabel}
          </PrimaryActionButton>
        </div>
      </Dialog>
    )
  }

  return (
    <div className={classnames(styles.drawer, props.isNested && styles.isNested)}>
      <div className={styles.ui}>
        <div className={styles.header}>
          <div className={styles.buttonWrapper}>
            <IconButton className={styles.back} icon={IconType.ARROW_LEFT} onAction={props.onClose}/>
            <IconButton className={styles.close} icon={IconType.CLOSE} onAction={props.onClose}/>
          </div>
          <div className={styles.title}>
            {props.title}
          </div>
          <div className={styles.buttonWrapper}></div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {props.children}
          </div>
          <PrimaryActionButton className={styles.primaryAction} onAction={props.onAction}>
            {props.actionLabel}
          </PrimaryActionButton>
        </div>
      </div>
    </div>
  )
}
