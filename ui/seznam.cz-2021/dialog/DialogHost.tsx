import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {leaveDialog, showDialog} from '../Action'
import Dialog from '../reusable/Dialog'
import DialogHostBackground from '../reusable/DialogHost'
import Drawer from '../reusable/Drawer'
import {dialogSelector, isGameMatrixEmptySelector, isNestedDialogSelector} from '../selectors'
import {IState} from '../state'
import Congratulations from './Congratulations'
import DialogType from './Dialog'
import styles from './dialogHost.css'
import GameplayGuide from './GameplayGuide'
import HighScores from './HighScores'
import NewGame from './NewGame'
import Pause from './Pause'
import Settings from './Settings'
import SignIn from './SignIn'
import ThemeChooser from './ThemeChooser'
import ThemePreview from './ThemePreview'

export interface IDialog {
  readonly title?: string
  readonly drawerActionLabel?: string
  readonly nonCloseable?: boolean
}

export interface IDialogProps {
  readonly drawerActionHandler: React.RefObject<() => void>
  readonly headerCloseHandler: React.RefObject<() => void>
  onShowDialog(dialog: DialogType, stack?: boolean): void
  onLeaveDialog(): void
}

interface IDataProps {
  readonly dialogType: null | DialogType
  readonly isNestedDialog: boolean
  readonly isGameMatrixEmpty: boolean
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
  const headerCloseHandler = React.useRef<() => void>(null)
  const onCloseDialogFromHeader = React.useMemo(
    () => () => {
      if (headerCloseHandler.current) {
        headerCloseHandler.current()
      }
      props.onLeaveDialog()
    },
    [headerCloseHandler, props.onLeaveDialog],
  )

  const forceNonCloseable = props.dialogType === DialogType.NEW_GAME && props.isGameMatrixEmpty

  return (
    <div className={styles.dialogHost}>
      <DialogHostBackground>
        {drawerActionLabel ?
          <Drawer
            title={DialogComponent.title || ''}
            isNested={props.isNestedDialog}
            actionLabel={drawerActionLabel}
            onAction={onDrawerAction}
            onClose={onCloseDialogFromHeader}
          >
            <DialogComponent
              drawerActionHandler={drawerActionHandler}
              headerCloseHandler={headerCloseHandler}
              onShowDialog={props.onShowDialog}
              onLeaveDialog={props.onLeaveDialog}
            />
          </Drawer>
        :
          <Dialog
            title={DialogComponent.title}
            isNested={props.isNestedDialog}
            nonCloseable={forceNonCloseable || DialogComponent.nonCloseable}
            onClose={onCloseDialogFromHeader}
          >
            <DialogComponent
              drawerActionHandler={drawerActionHandler}
              headerCloseHandler={headerCloseHandler}
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
    isGameMatrixEmpty: isGameMatrixEmptySelector,
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
    case DialogType.GAMEPLAY_GUIDE:
      return GameplayGuide
    case DialogType.HIGH_SCORES:
      return HighScores
    case DialogType.NEW_GAME:
      return NewGame
    case DialogType.PAUSE:
      return Pause
    case DialogType.SETTINGS:
      return Settings
    case DialogType.SIGN_IN:
      return SignIn
    case DialogType.THEME_CHOOSER:
      return ThemeChooser
    case DialogType.THEME_PREVIEW:
      return ThemePreview
    default:
      throw new Error(`Unknown dialog type: ${type}`)
  }
}
