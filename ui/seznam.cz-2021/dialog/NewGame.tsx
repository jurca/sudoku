import * as React from 'react'
import {connect} from 'react-redux'
import Difficulty from '../../../conf/Difficulty'
import {newGame} from '../../../game/Action'
import PrimaryActionButton from '../reusable/PrimaryActionButton'
import {IState} from '../state'
import {IDialogProps} from './DialogHost'
import NewGameIllustration from './new-game.svg'
import styles from './newGame.css'

interface ICallbackProps {
  onNewGame(difficulty: Difficulty): void
}

type Props = ICallbackProps & IDialogProps

function NewGame(props: Props) {
  const onNewEasyGame = React.useMemo(
    () => () => {
      props.onNewGame(Difficulty.EASY)
      props.onLeaveDialog()
    },
    [props.onNewGame, props.onLeaveDialog],
  )
  const onNewMediumGame = React.useMemo(
    () => () => {
      props.onNewGame(Difficulty.MEDIUM)
      props.onLeaveDialog()
    },
    [props.onNewGame, props.onLeaveDialog],
  )
  const onNewHardGame = React.useMemo(
    () => () => {
      props.onNewGame(Difficulty.HARD)
      props.onLeaveDialog()
    },
    [props.onNewGame, props.onLeaveDialog],
  )

  return (
    <div className={styles.dialog}>
      <div className={styles.illustration}>
        <NewGameIllustration/>
      </div>
      <h2 className={styles.title}>
        Vyberte si obtížnost nové hry
      </h2>
      <div className={styles.buttons}>
        <PrimaryActionButton onAction={onNewEasyGame}>
          Lehká
        </PrimaryActionButton>
        <PrimaryActionButton onAction={onNewMediumGame}>
          Střední
        </PrimaryActionButton>
        <PrimaryActionButton onAction={onNewHardGame}>
          Těžká
        </PrimaryActionButton>
      </div>
    </div>
  )
}

export default connect<{}, ICallbackProps, IDialogProps, IState>(
  null,
  {
    onNewGame: newGame,
  },
)(
  NewGame,
)
