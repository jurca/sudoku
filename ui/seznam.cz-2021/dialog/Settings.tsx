import * as React from 'react'
import {connect} from 'react-redux'
import {closeDialogs} from '../Action'
import SettingsListItem from '../blocks/SettingsListItem'
import Icon, { IconType } from '../reusable/Icon'
import Switch from '../reusable/Switch'
import {IState} from '../state'
import Dialog from './Dialog'
import {IDialogProps} from './DialogHost'
import styles from './settings.css'

interface ICallbackProps {
  onCloseDialogs(): void
}

type Props = ICallbackProps & IDialogProps

function Settings(props: Props) {
  Object.assign(props.drawerActionHandler, {
    current: props.onCloseDialogs,
  })

  const onShowGuide = React.useMemo(
    () => () => props.onShowDialog(Dialog.GAMEPLAY_GUIDE),
    [props.onShowDialog],
  )

  return (
    <div>
      <div className={styles.item}>
        <SettingsListItem
          leftContent="Skóre"
          rightContent={
            <span className={styles.arrow}>
              <Icon icon={IconType.ARROW_RIGHT}/>
            </span>
          }
        />
      </div>
      <div className={styles.item}>
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
              <Switch name="validation" defaultChecked={true}/>
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

export default Object.assign(connect<{}, ICallbackProps, IDialogProps, IState>(
  null,
  {
    onCloseDialogs: closeDialogs,
  },
)(
  Settings,
), {
  drawerActionLabel: 'Zpět do hry',
  title: 'Nastavení',
})
