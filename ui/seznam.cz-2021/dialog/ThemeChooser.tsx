import * as React from 'react'
import {connect} from 'react-redux'
import {objectValues} from '../../../game/util'
import {closeDialogs, setThemePreview} from '../Action'
import GameBoardBlockPreview from '../blocks/GameBoardBlockPreview'
import {IState, IThemeConfiguration} from '../state'
import PrimaryColor from '../theme/PrimaryColor'
import Theme from '../theme/Theme'
import Dialog from './Dialog'
import {IDialogProps} from './DialogHost'
import styles from './themeChooser.css'

interface ICallbackProps {
  onSetThemePreview(themePreview: IThemeConfiguration): void
  onCloseDialogs(): void
}

type Props = ICallbackProps & IDialogProps

const OPTIONS: readonly IThemeConfiguration[] = objectValues(Theme).map(
  (theme) => objectValues(PrimaryColor).map((color) => ({theme, primaryColor: color})),
).flat(1)
const OPTIONS_PER_ROW = 3

function ThemeChooser(props: Props) {
  Object.assign(props.drawerActionHandler, {
    current: props.onCloseDialogs,
  })

  const options = React.useMemo(
    () => OPTIONS.map((themeOption) => [
      themeOption,
      () => {
        props.onSetThemePreview(themeOption)
        props.onShowDialog(Dialog.THEME_PREVIEW)
      },
    ] as const),
    [OPTIONS, props.onSetThemePreview, props.onShowDialog],
  )
  const optionRows: Array<typeof options> = []
  for (let rowStart = 0; rowStart < options.length; rowStart += OPTIONS_PER_ROW) {
    optionRows.push(options.slice(rowStart, rowStart + OPTIONS_PER_ROW))
  }

  return (
    <div className={styles.chooser}>
      {optionRows.map((row, rowIndex) =>
        <div key={rowIndex} className={styles.optionRow}>
          {row.map((option, optionIndex) =>
            <div key={optionIndex} className={styles.option} tabIndex={0} onClick={option[1]}>
              <GameBoardBlockPreview
                uniqueClassName={createThemeUniqueClassName(option[0])}
                themePreview={option[0]}
              />
            </div>,
          )}
        </div>,
      )}
    </div>
  )
}

export default Object.assign(connect<{}, ICallbackProps, IDialogProps, IState>(
  null,
  {
    onCloseDialogs: closeDialogs,
    onSetThemePreview: setThemePreview,
  },
)(
  ThemeChooser,
), {
  drawerActionLabel: 'Zpět do hry',
  title: 'Změnit barevné schéma',
})

function createThemeUniqueClassName(themeConfiguration: IThemeConfiguration): string {
  return [themeConfiguration.theme, themeConfiguration.primaryColor].map(
    (part) => part.replaceAll(/[^a-zA-Z_]/g, '-'),
  ).join('--')
}
