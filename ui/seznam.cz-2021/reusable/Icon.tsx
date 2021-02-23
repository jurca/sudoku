import * as React from 'react'
import styles from './icon.css'
import IconArrowLeft from './icon/arrow - left.svg'
import IconClose from './icon/close.svg'
import IconGear from './icon/gear.svg'

interface IProps {
  readonly icon: IconType
}

export default function Icon({icon}: IProps) {
  switch (icon) {
    case IconType.ARROW_LEFT:
      return <IconArrowLeft className={styles.icon}/>
    case IconType.CLOSE:
      return <IconClose className={styles.icon}/>
    case IconType.GEAR:
      return <IconGear className={styles.icon}/>
    default:
      return null
  }
}

export enum IconType {
  ARROW_LEFT = 'IconType.ARROW_LEFT',
  CLOSE = 'IconType.CLOSE',
  GEAR = 'IconType.GEAR',
}
