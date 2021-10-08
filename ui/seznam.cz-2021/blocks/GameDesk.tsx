import classnames from 'classnames'
import * as React from 'react'
import Difficulty from '../../../conf/Difficulty'
import {IEndedGamePlayBreak, IStartedGamePlayBreak} from '../../../game/state'
import isAndroidOrIOSPhone from '../reusable/isAndroidOrIOSPhone'
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
  readonly gameEnd: null | number
  readonly children: React.ReactChild | readonly React.ReactChild[]
  readonly onOpenSettings: () => void
  readonly onNewGame: () => void
  readonly onPause: () => void
  readonly onUndo: () => void
  readonly onHelp: () => void
  readonly onDeselectCell: () => void
}

export default function GameDesk(props: IProps) {
  return (
    <div className={classnames(styles.gameDesk, isAndroidOrIOSPhone() && styles.forceMobileLayout)}>
      <BackgroundPattern/>
      <div className={styles.container} onClick={props.onDeselectCell}>
        <div className={styles.topContentOffset}/>
        <div className={styles.content} onClick={onBlockClickPropagation}>
          {props.children}
        </div>
        <div className={styles.bottomContentOffset}/>
      </div>
      <GameDeskHeader
        className={styles.toolbar}
        difficulty={props.difficulty}
        gameStart={props.gameStart}
        breaks={props.breaks}
        gameEnd={props.gameEnd}
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

const onBlockClickPropagation = (event: React.MouseEvent) => {
  event.stopPropagation()
}
