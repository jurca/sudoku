import * as React from 'react'
import styles from './icon.css'
import IconArrowLeft from './icon/arrow - left.svg'
import IconCircledPlus from './icon/circled-plus.svg'
import IconClose from './icon/close.svg'
import IconGear from './icon/gear.svg'
import IconHelp from './icon/help.svg'
import IconPause from './icon/pause.svg'
import IconUndo from './icon/undo.svg'

interface IProps {
  readonly icon: IconType
}

export default function Icon({icon}: IProps) {
  switch (icon) {
    case IconType.ARROW_LEFT:
      return <IconArrowLeft className={styles.icon}/>
    case IconType.CIRCLED_PLUS:
      return <IconCircledPlus className={styles.icon}/>
    case IconType.CLOSE:
      return <IconClose className={styles.icon}/>
    case IconType.GEAR:
      return <IconGear className={styles.icon}/>
    case IconType.HELP:
      return <IconHelp className={styles.icon}/>
    case IconType.PAUSE:
      return <IconPause className={styles.icon}/>
    case IconType.UNDO:
      return <IconUndo className={styles.icon}/>
    default:
      return null
  }
}

export enum IconType {
  ARROW_LEFT = 'IconType.ARROW_LEFT',
  CIRCLED_PLUS = 'IconType.CIRCLED_PLUS',
  CLOSE = 'IconType.CLOSE',
  GEAR = 'IconType.GEAR',
  HELP = 'IconType.HELP',
  PAUSE = 'IconType.PAUSE',
  UNDO = 'IconType.UNDO',
}
