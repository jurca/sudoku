import classnames from 'classnames'
import * as React from 'react'
import Icon, {IconType} from './Icon'
import IconButton from './IconButton'
import isAndroidOrIOS from './isAndroidOrIOS'
import styles from './phoneUIHeader.css'

interface IProps {
  readonly children: string
  readonly onGearAction?: () => void
}

export default function PhoneUIHeader(props: IProps) {
  if (!isAndroidOrIOS()) {
    return null
  }

  const isIOS = /\(iPhone;/.test(navigator.userAgent)

  return (
    <div className={classnames(styles.header, isIOS && styles.ios)}>
      <a href="menu.html" className={styles.buttonWrapper}>
        <Icon icon={IconType.ARROW_LEFT}/>
      </a>
      <div className={styles.title}>{props.children}</div>
      <div className={styles.buttonWrapper}>
        <IconButton icon={IconType.GEAR} onAction={props.onGearAction}/>
      </div>
    </div>
  )
}
