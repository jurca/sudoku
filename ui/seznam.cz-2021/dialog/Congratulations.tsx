import * as React from 'react'
import {connect} from 'react-redux'
import Difficulty from '../../../conf/Difficulty'
import {newGame} from '../../../game/Action'
import PrimaryActionButton from '../reusable/PrimaryActionButton'
import {IState} from '../state'
import styles from './congratulations.css'
import CongratulationsIllustration from './congratulations.svg'
import {IDialogProps} from './DialogHost'

interface ICallbackProps {
  onNewGame(difficulty: Difficulty): void
}

type Props = ICallbackProps & IDialogProps

function Congratulations(props: Props) {
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
    <div className={styles.congratulations}>
      <div className={styles.illustration}>
        <CongratulationsIllustration/>
      </div>
      <h2 className={styles.title}>
        Gratulujeme k výhře
      </h2>
      <p className={styles.text}>
        Vyberte si obtížnost a začnete novou hru
      </p>
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
  Congratulations,
)
