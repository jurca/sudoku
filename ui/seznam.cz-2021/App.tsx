import * as React from 'react'
import {connect} from 'react-redux'
import {leaveGame, showDialog} from './Action'
import style from './app.css'
import Main from './app/Main'
import {InputMode} from './blocks/InputModeSwitch'
import Dialog from './dialog/Dialog'
import DialogHost from './dialog/DialogHost'
import PhoneUIHeader from './reusable/PhoneUIHeader'
import {IState} from './state'

interface ICallbackProps {
  onOpenSettings(): void
  onTerminate(): void
}

type Props = ICallbackProps

function App(props: Props) {
  return (
    <div className={style.app}>
      <div className={style.phoneHeader}>
        <PhoneUIHeader onGearAction={props.onOpenSettings} onTerminate={props.onTerminate}>
          Sudoku
        </PhoneUIHeader>
      </div>
      <div className={style.main}>
        <Main
          inputModeSwitchName="inputMode"
          defaultInputMode={InputMode.INPUT}
          themeStyleNameSpacingClassName="main"
          themeStyleAnimationNamespace="main--"
        />
      </div>
      <DialogHost/>
    </div>
  )
}

export default connect<{}, ICallbackProps, {}, IState>(
  null,
  {
    onOpenSettings: showDialog.bind(null, {dialog: Dialog.SETTINGS, stack: false}),
    onTerminate: leaveGame,
  },
)(
  App,
)
