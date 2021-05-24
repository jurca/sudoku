import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {closeDialogs} from '../Action'
import settingsContext from '../app/settingsContext'
import SettingsListItem from '../blocks/SettingsListItem'
import Icon, { IconType } from '../reusable/Icon'
import Switch from '../reusable/Switch'
import {moveValidationEnabledSelector, notesCullingEnabledSelector} from '../selectors'
import {IState} from '../state'
import Dialog from './Dialog'
import {IDialogProps} from './DialogHost'
import styles from './settings.css'

interface IDataProps {
  readonly moveValidationEnabled: boolean
  readonly notesCullingEnabled: boolean
}

interface ICallbackProps {
  onCloseDialogs(): void
}

type Props = IDataProps & ICallbackProps & IDialogProps

function Settings(props: Props) {
  Object.assign(props.drawerActionHandler, {
    current: props.onCloseDialogs,
  })

  const onShowHighScores = React.useMemo(
    () => () => props.onShowDialog(Dialog.HIGH_SCORES),
    [props.onShowDialog],
  )
  const onShowThemeChooser = React.useMemo(
    () => () => props.onShowDialog(Dialog.THEME_CHOOSER),
    [props.onShowDialog],
  )
  const settingsStorage = React.useContext(settingsContext)
  const onSetMoveValidation = React.useMemo(
    () => async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (settingsStorage) {
        const settings = await settingsStorage.get()
        return settingsStorage.set({
          ...settings,
          automaticValidation: event.target.checked,
        })
      }
    },
    [settingsStorage],
  )
  const onSetNotesCulling = React.useMemo(
    () => async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (settingsStorage) {
        const settings = await settingsStorage.get()
        return settingsStorage.set({
          ...settings,
          automaticNotesCulling: event.target.checked,
        })
      }
    },
    [settingsStorage],
  )
  const onShowGuide = React.useMemo(
    () => () => props.onShowDialog(Dialog.GAMEPLAY_GUIDE),
    [props.onShowDialog],
  )

  return (
    <div>
      <div className={styles.item} onClick={onShowHighScores} tabIndex={0}>
        <SettingsListItem
          leftContent="Skóre"
          rightContent={
            <span className={styles.arrow}>
              <Icon icon={IconType.ARROW_RIGHT}/>
            </span>
          }
        />
      </div>
      <div className={styles.item} onClick={onShowThemeChooser} tabIndex={0}>
        <SettingsListItem
          leftContent="Změnit barevné schéma"
          rightContent={
            <span className={styles.arrow}>
              <Icon icon={IconType.ARROW_RIGHT}/>
            </span>
          }
        />
      </div>
      <label className={styles.item}>
        <SettingsListItem
          leftContent="Automatická kontrola kandidátů"
          rightContent={
            <span className={styles.switch}>
              <Switch name="validation" defaultChecked={props.moveValidationEnabled} onChange={onSetMoveValidation}/>
            </span>
          }
        />
      </label>
      <label className={styles.item}>
        <SettingsListItem
          leftContent="Automatická aktualizace poznámek"
          rightContent={
            <span className={styles.switch}>
              <Switch name="notesUpdates" defaultChecked={props.notesCullingEnabled} onChange={onSetNotesCulling}/>
            </span>
          }
        />
      </label>
      <div className={styles.item} onClick={onShowGuide} tabIndex={0}>
        <SettingsListItem leftContent="Jak hrát sudoku"/>
      </div>
    </div>
  )
}

export default Object.assign(connect<IDataProps, ICallbackProps, IDialogProps, IState>(
  createStructuredSelector({
    moveValidationEnabled: moveValidationEnabledSelector,
    notesCullingEnabled: notesCullingEnabledSelector,
  }),
  {
    onCloseDialogs: closeDialogs,
  },
)(
  Settings,
), {
  drawerActionLabel: 'Zpět do hry',
  title: 'Nastavení',
})
