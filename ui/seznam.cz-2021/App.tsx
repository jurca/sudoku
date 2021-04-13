import * as React from 'react'
import style from './app.css'
import Main from './app/Main'
import {InputMode} from './blocks/InputModeSwitch'
import DialogHost from './dialog/DialogHost'

export default function App() {
  return (
    <div className={style.app}>
      <Main
        inputModeSwitchName="inputMode"
        defaultInputMode={InputMode.INPUT}
        themeStyleNameSpacingClassName="main"
      />
      <DialogHost/>
    </div>
  )
}
