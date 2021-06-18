import * as React from 'react'
import {connect} from 'react-redux'
import Difficulty from '../../../conf/Difficulty'
import {newGame, resume} from '../../../game/Action'
import PrimaryActionButton from '../reusable/PrimaryActionButton'
import {IState} from '../state'
import {IDialogProps} from './DialogHost'
import NewGameIllustration from './new-game.svg'
import styles from './newGame.css'

interface ICallbackProps {
  onNewGame(difficulty: Difficulty): void
  onResume(): void
}

type Props = ICallbackProps & IDialogProps

function NewGame(props: Props) {
  const onNewEasyGame = React.useMemo(
    () => () => {
      props.onLeaveDialog()
      props.onNewGame(Difficulty.EASY)
    },
    [props.onNewGame, props.onLeaveDialog],
  )
  const onNewMediumGame = React.useMemo(
    () => () => {
      props.onLeaveDialog()
      props.onNewGame(Difficulty.MEDIUM)
    },
    [props.onNewGame, props.onLeaveDialog],
  )
  const onNewHardGame = React.useMemo(
    () => () => {
      props.onLeaveDialog()
      props.onNewGame(Difficulty.HARD)
    },
    [props.onNewGame, props.onLeaveDialog],
  )

  React.useEffect(() => {
    Object.assign(props.headerCloseHandler, {current: props.onResume})
  }, [props.headerCloseHandler, props.onResume])

  return (
    <div className={styles.dialog}>
      <div className={styles.illustration}>
        <NewGameIllustration/>
      </div>
      <h2 className={styles.title}>
        Vyberte si obtížnost
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
    onResume: resume,
  },
)(
  NewGame,
)
