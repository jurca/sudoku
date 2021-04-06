import classnames from 'classnames'
import * as React from 'react'
import GameBoardCell from './GameBoardCell'
import styles from './inputKeyboard.css'

interface IProps {
  onAction(pressedKey: number): void
}

const KEYS = new Array(9).fill(0).map((_, i) => i + 1)

export default function InputKeyboard(props: IProps) {
  return (
    <div className={classnames('input-keyboard', styles.keyboard)}>
      <div className={styles.keyboardContent}>
        {KEYS.map((key, keyIndex, keys) => {
          const onKeyAction = React.useMemo(
            () => () => props.onAction(key),
            [props.onAction],
          )
          return (
            <React.Fragment key={keyIndex}>
              <div className={styles.key}>
                <GameBoardCell onAction={onKeyAction}>
                  {`${key}`}
                </GameBoardCell>
              </div>
              {keyIndex < keys.length - 1 &&
                <div className={classnames('input-keyboard__separator', styles.separator)}/>
              }
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
