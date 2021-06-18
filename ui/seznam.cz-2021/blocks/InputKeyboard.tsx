import classnames from 'classnames'
import * as React from 'react'
import {IconType} from '../reusable/Icon'
import GameBoardCell from './GameBoardCell'
import styles from './inputKeyboard.css'

export enum CssClassNames {
  ROOT = 'input-keyboard',
  KEY = 'input-keyboard__key',
  SEPARATOR = 'input-keyboard__separator',
}

export const KEY_VALUE_ATTRIBUTE = 'data-key'

interface IProps {
  readonly usedUpValues: readonly number[]
  onAction(pressedKey: number): void
}

const KEYS = new Array(9).fill(0).map((_, i) => i + 1)

export default function InputKeyboard(props: IProps) {
  const onKeyUp = React.useMemo(
    () => (event: KeyboardEvent) => {
      const pressedKey = event.key
      const numericValue = parseInt(pressedKey, 10)
      if (numericValue >= 1 && numericValue <= 9) {
        props.onAction(numericValue)
      }
    },
    [props.onAction],
  )

  React.useEffect(
    () => {
      addEventListener('keyup', onKeyUp)
      return () => {
        removeEventListener('keyup', onKeyUp)
      }
    },
    [onKeyUp],
  )

  return (
    <div className={classnames(CssClassNames.ROOT, styles.keyboard)}>
      <div className={styles.keyboardContent}>
        {KEYS.map((key, keyIndex, keys) => {
          const onKeyAction = React.useMemo(
            () => () => props.onAction(key),
            [props.onAction],
          )
          return (
            <React.Fragment key={keyIndex}>
              <div className={classnames(CssClassNames.KEY, styles.key)} {...{[KEY_VALUE_ATTRIBUTE]: key}}>
                <GameBoardCell onAction={onKeyAction}>
                  {props.usedUpValues.includes(key) ? IconType.TICK : `${key}`}
                </GameBoardCell>
              </div>
              {keyIndex < keys.length - 1 &&
                <div className={classnames(CssClassNames.SEPARATOR, styles.separator)}/>
              }
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
