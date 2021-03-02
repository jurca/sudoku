import classnames from 'classnames'
import * as React from 'react'
import Difficulty from '../../../conf/Difficulty'
import {IEndedGamePlayBreak, IStartedGamePlayBreak} from '../../../game/state'
import {getGamePlayDuration} from '../../../game/util'
import IconButton, {IconType} from '../reusable/IconButton'
import isAndroidOrIOS from '../reusable/isAndroidOrIOS'
import styles from './gameDeskHeader.css'

interface IProps {
  readonly difficulty: null | Difficulty
  readonly gameStart: null | {
    readonly logicalTimestamp: number,
  }
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly onOpenSettings: () => void
}

export default function GameDeskHeader(props: IProps) {
  const [, updateTick] = React.useState<number>(-1)

  const gamePlayDuration = props.gameStart && getGamePlayDuration(props.gameStart, props.breaks)
  React.useEffect(() => {
    if (typeof gamePlayDuration === 'number') {
      const tickId = setTimeout(updateTick, 1_000 - gamePlayDuration % 1_000, gamePlayDuration)
      return () => clearTimeout(tickId)
    } else {
      updateTick(-1)
      return undefined
    }
  })

  const forceMobileLayout = isAndroidOrIOS()

  return (
    <div className={classnames(styles.header, forceMobileLayout && styles.forceMobileLayout)}>
      <div className={styles.content}>
        <div className={classnames(styles.sideContent, styles.leftSide)}>
          {typeof gamePlayDuration === 'number' &&
            <div className={styles.time}>
              Čas: <span className={styles.timer}>{formatDuration(gamePlayDuration)}</span>
            </div>
          }
          {props.difficulty &&
            <div>
              Obtížnost: <span className={styles.difficulty}>{formatDifficulty(props.difficulty)}</span>
            </div>
          }
        </div>
        <h1 className={styles.title}>Sudoku</h1>
        <div className={classnames(styles.sideContent, styles.rightSide)}>
          <IconButton className={styles.settings} icon={IconType.GEAR} onAction={props.onOpenSettings}>
            Nastavení
          </IconButton>
        </div>
      </div>
    </div>
  )
}

function formatDuration(duration: number): string {
  const durationAsSeconds = Math.floor(duration / 1000)
  const seconds = durationAsSeconds % 60
  const minutes = Math.floor(durationAsSeconds / 60) % 3600
  const hours = Math.floor(durationAsSeconds / 3600)
  return `${hours ? `${hours}:` : ''}${[minutes, seconds].map((part) => `${part}`.padStart(2, '0')).join(':')}`
}

function formatDifficulty(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.EASY:
      return 'lehká'
    case Difficulty.MEDIUM:
      return 'střední'
    case Difficulty.HARD:
      return 'těžká'
    default:
      throw new Error(`Unknown game difficulty: ${difficulty}`)
  }
}
