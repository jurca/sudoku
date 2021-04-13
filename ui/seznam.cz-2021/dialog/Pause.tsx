import * as React from 'react'
import {connect} from 'react-redux'
import {resume} from '../../../game/Action'
import {showDialog} from '../Action'
import PrimaryActionButton from '../reusable/PrimaryActionButton'
import {IState} from '../state'
import Dialog from './Dialog'
import {IDialogProps} from './DialogHost'
import styles from './pause.css'
import PauseIllustration from './pause.svg'

interface ICallbackProps {
  onNewGame(): void
  onResume(): void
}

type Props = ICallbackProps & IDialogProps

function Pause(props: Props) {
  const onResume = React.useMemo(
    () => () => {
      props.onResume()
      props.onLeaveDialog()
    },
    [props.onResume, props.onLeaveDialog],
  )
  const onNewGame = React.useMemo(
    () => () => {
      props.onNewGame()
    },
    [props.onLeaveDialog, props.onNewGame],
  )

  return (
    <div className={styles.pause}>
      <div className={styles.illustration}>
        <PauseIllustration/>
      </div>
      <h2 className={styles.title}>
        Sudoku je pozastaveno
      </h2>
      <div className={styles.buttons}>
        <PrimaryActionButton onAction={onResume}>
          Pokračovat
        </PrimaryActionButton>
        <PrimaryActionButton onAction={onNewGame}>
          Nová hra
        </PrimaryActionButton>
      </div>
    </div>
  )
}

export default connect<{}, ICallbackProps, IDialogProps, IState>(
  null,
  {
    onNewGame: showDialog.bind(null, {dialog: Dialog.NEW_GAME, stack: false}),
    onResume: resume,
  },
)(
  Pause,
)
