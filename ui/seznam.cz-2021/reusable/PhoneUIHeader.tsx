import classnames from 'classnames'
import * as React from 'react'
import Icon, {IconType} from './Icon'
import IconButton from './IconButton'
import isAndroidOrIOSPhone from './isAndroidOrIOSPhone'
import styles from './phoneUIHeader.css'

interface IProps {
  readonly children: string
  onGearAction?(): void
  onTerminate?(): void
}

export default function PhoneUIHeader(props: IProps) {
  const onTerminate = React.useMemo(
    () => (event: React.MouseEvent) => {
      if (props.onTerminate) {
        event.preventDefault()
        props.onTerminate()
      }
    },
    [],
  )

  if (!isAndroidOrIOSPhone()) {
    return null
  }

  const isIOS = /\(iPhone;/.test(navigator.userAgent)

  return (
    <div className={classnames(styles.header, isIOS && styles.ios)}>
      <a href="menu.html" className={styles.buttonWrapper} onClick={onTerminate}>
        <Icon icon={IconType.ARROW_LEFT}/>
      </a>
      <div className={styles.title}>{props.children}</div>
      <div className={styles.buttonWrapper}>
        <IconButton icon={IconType.GEAR} onAction={props.onGearAction}/>
      </div>
    </div>
  )
}
