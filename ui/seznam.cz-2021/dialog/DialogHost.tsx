import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {leaveDialog, showDialog} from '../Action'
import Dialog from '../reusable/Dialog'
import DialogHostBackground from '../reusable/DialogHost'
import Drawer from '../reusable/Drawer'
import {dialogSelector, isNestedDialogSelector} from '../selectors'
import {IState} from '../state'
import Congratulations from './Congratulations'
import DialogType from './Dialog'
import styles from './dialogHost.css'
import NewGame from './NewGame'
import Pause from './Pause'
import Settings from './Settings'

export interface IDialog {
  readonly title?: string
  readonly drawerActionLabel?: string,
}

export interface IDialogProps {
  readonly drawerActionHandler: React.RefObject<() => void>
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

  const {drawerActionLabel} = DialogComponent
  const drawerActionHandler = React.useRef<() => void>(null)
  const onDrawerAction = React.useMemo(
    () => () => {
      if (drawerActionHandler.current) {
        drawerActionHandler.current()
      }
    },
    [drawerActionHandler],
  )

  return (
    <div className={styles.dialogHost}>
      <DialogHostBackground>
        {drawerActionLabel ?
          <Drawer
            title={DialogComponent.title || ''}
            isNested={props.isNestedDialog}
            actionLabel={drawerActionLabel}
            onAction={onDrawerAction}
            onClose={props.onLeaveDialog}
          >
            <DialogComponent
              drawerActionHandler={drawerActionHandler}
              onShowDialog={props.onShowDialog}
              onLeaveDialog={props.onLeaveDialog}
            />
          </Drawer>
        :
          <Dialog title={DialogComponent.title} isNested={props.isNestedDialog} onClose={props.onLeaveDialog}>
            <DialogComponent
              drawerActionHandler={drawerActionHandler}
              onShowDialog={props.onShowDialog}
              onLeaveDialog={props.onLeaveDialog}
            />
          </Dialog>
        }
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
    case DialogType.CONGRATULATIONS:
      return Congratulations
    case DialogType.NEW_GAME:
      return NewGame
    case DialogType.PAUSE:
      return Pause
    case DialogType.SETTINGS:
      return Settings
    default:
      throw new Error(`Unknown dialog type: ${type}`)
  }
}
