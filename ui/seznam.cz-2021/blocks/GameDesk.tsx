import classnames from 'classnames'
import * as React from 'react'
import Difficulty from '../../../conf/Difficulty'
import {IEndedGamePlayBreak, IStartedGamePlayBreak} from '../../../game/state'
import isAndroidOrIOS from '../reusable/isAndroidOrIOS'
import BackgroundPattern from './BackgroundPattern'
import styles from './gameDesk.css'
import GameDeskFooter from './GameDeskFooter'
import GameDeskHeader from './GameDeskHeader'

interface IProps {
  readonly difficulty: null | Difficulty
  readonly gameStart: null | {
    readonly logicalTimestamp: number,
  }
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly children: React.ReactChild | readonly React.ReactChild[]
  readonly onOpenSettings: () => void
  readonly onNewGame: () => void
  readonly onPause: () => void
  readonly onUndo: () => void
  readonly onHelp: () => void
}

export default function GameDesk(props: IProps) {
  return (
    <div className={classnames(styles.gameDesk, isAndroidOrIOS() && styles.forceMobileLayout)}>
      <BackgroundPattern/>
      <div className={styles.container}>
        <div className={styles.topContentOffset}/>
        <div className={styles.content}>
          {props.children}
        </div>
        <div className={styles.bottomContentOffset}/>
      </div>
      <GameDeskHeader
        className={styles.toolbar}
        difficulty={props.difficulty}
        gameStart={props.gameStart}
        breaks={props.breaks}
        onOpenSettings={props.onOpenSettings}
      />
      <GameDeskFooter
        className={classnames(styles.toolbar, styles.bottomToolbar)}
        onNewGame={props.onNewGame}
        onPause={props.onPause}
        onUndo={props.onUndo}
        onHelp={props.onHelp}
      />
    </div>
  )
}
