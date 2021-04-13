import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {leaveDialog, showDialog} from '../Action'
import Dialog from '../reusable/Dialog'
import DialogHostBackground from '../reusable/DialogHost'
import {dialogSelector, isNestedDialogSelector} from '../selectors'
import {IState} from '../state'
import DialogType from './Dialog'
import styles from './dialogHost.css'
import NewGame from './NewGame'
import Pause from './Pause'

export interface IDialog {
  readonly title?: string
}

export interface IDialogProps {
  onShowDialog(dialog: DialogType, stack?: boolean): void
  onLeaveDialog(): void
}

interface IDataProps {
  readonly dialogType: null | DialogType
  readonly isNestedDialog: boolean
}

interface ICallbackProps {
  onShowDialog(dialog: DialogType, stack?: boolean): void
  onLeaveDialog(): void
}

type Props = IDataProps & ICallbackProps

function DialogHost(props: Props) {
  const DialogComponent = props.dialogType && getDialog(props.dialogType)
  if (!DialogComponent) {
    return null
  }

  return (
    <div className={styles.dialogHost}>
      <DialogHostBackground>
        <Dialog title={DialogComponent.title} isNested={props.isNestedDialog} onClose={props.onLeaveDialog}>
          <DialogComponent onShowDialog={props.onShowDialog} onLeaveDialog={props.onLeaveDialog}/>
        </Dialog>
      </DialogHostBackground>
    </div>
  )
}

export default connect<IDataProps, ICallbackProps, {}, IState>(
  createStructuredSelector({
    dialogType: dialogSelector,
    isNestedDialog: isNestedDialogSelector,
  }),
  {
    onShowDialog(dialog: DialogType, stack: boolean = true) {
      return showDialog({dialog, stack})
    },
    onLeaveDialog: leaveDialog,
  },
)(
  DialogHost,
)

function getDialog(type: DialogType): React.ComponentType<IDialogProps> & IDialog {
  switch (type) {
    case DialogType.NEW_GAME:
      return NewGame
    case DialogType.PAUSE:
      return Pause
    default:
      throw new Error(`Unknown dialog type: ${type}`)
  }
}
