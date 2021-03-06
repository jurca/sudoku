import * as React from 'react'
import styles from './icon.css'
import IconArrowLeft from './icon/arrow - left.svg'
import IconArrowRight from './icon/arrow - right.svg'
import IconCircledPlus from './icon/circled-plus.svg'
import IconClose from './icon/close.svg'
import IconEraser from './icon/eraser.svg'
import IconGear from './icon/gear.svg'
import IconHelp from './icon/help.svg'
import IconNotepad from './icon/notepad.svg'
import IconNumeral from './icon/numeral.svg'
import IconPause from './icon/pause.svg'
import IconTick from './icon/tick.svg'
import IconUndo from './icon/undo.svg'

interface IProps {
  readonly icon: IconType
}

export default function Icon({icon}: IProps) {
  switch (icon) {
    case IconType.ARROW_LEFT:
      return <IconArrowLeft className={styles.icon}/>
    case IconType.ARROW_RIGHT:
      return <IconArrowRight className={styles.icon}/>
    case IconType.CIRCLED_PLUS:
      return <IconCircledPlus className={styles.icon}/>
    case IconType.CLOSE:
      return <IconClose className={styles.icon}/>
    case IconType.ERASER:
      return <IconEraser className={styles.icon}/>
    case IconType.GEAR:
      return <IconGear className={styles.icon}/>
    case IconType.HELP:
      return <IconHelp className={styles.icon}/>
    case IconType.NOTEPAD:
      return <IconNotepad className={styles.icon}/>
    case IconType.NUMERAL:
      return <IconNumeral className={styles.icon}/>
    case IconType.PAUSE:
      return <IconPause className={styles.icon}/>
    case IconType.TICK:
      return <IconTick className={styles.icon}/>
    case IconType.UNDO:
      return <IconUndo className={styles.icon}/>
    default:
      return null
  }
}

export enum IconType {
  ARROW_LEFT = 'IconType.ARROW_LEFT',
  ARROW_RIGHT = 'IconType.ARROW_RIGHT',
  CIRCLED_PLUS = 'IconType.CIRCLED_PLUS',
  CLOSE = 'IconType.CLOSE',
  ERASER = 'IconType.ERASER',
  GEAR = 'IconType.GEAR',
  HELP = 'IconType.HELP',
  NOTEPAD = 'IconType.NOTEPAD',
  NUMERAL = 'IconType.NUMERAL',
  PAUSE = 'IconType.PAUSE',
  TICK = 'IconType.TICK',
  UNDO = 'IconType.UNDO',
}
