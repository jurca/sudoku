import classnames from 'classnames'
import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import Difficulty from '../../../conf/Difficulty'
import createGame from '../../../game/gameGenerator'
import {createHierarchicalCellMatrix} from '../../../game/selectors'
import {SudokuMatrix} from '../../../game/state'
import {closeDialogs} from '../Action'
import settingsContext from '../app/settingsContext'
import BackgroundPattern from '../blocks/BackgroundPattern'
import GameBoardPreview from '../blocks/GameBoardPreview'
import {themePreviewSelector} from '../selectors'
import {IState, IThemeConfiguration} from '../state'
import GameBoardTheme from '../theme/GameBoardTheme'
import {IDialogProps} from './DialogHost'
import styles from './themePreview.css'

const CSS_CLASS = 'theme-preview'

interface IDataProps {
  readonly themePreview: IThemeConfiguration
}

interface ICallbackProps {
  onCloseDialogs(): void
}

type Props = IDataProps & ICallbackProps & IDialogProps

function ThemePreview(props: Props) {
  const matrix = React.useMemo(
    () => createHierarchicalCellMatrix(createGame(Difficulty.MEDIUM).map(
      (row) => row.map((cell) => ({...cell, userMarkedOptions: []})),
    ) as unknown as SudokuMatrix),
    [],
  )

  const settingsStorage = React.useContext(settingsContext)
  const onConfirmTheme = React.useMemo(
    () => async () => {
      if (settingsStorage) {
        const settings = await settingsStorage.get()
        props.onCloseDialogs()
        await settingsStorage.set({
          ...settings,
          ...props.themePreview,
        })
      }
    },
    [settingsStorage, props.themePreview, props.onCloseDialogs],
  )
  Object.assign(props.drawerActionHandler, {
    current: onConfirmTheme,
  })

  return (
    <div className={classnames(styles.preview, CSS_CLASS)}>
      <div className={styles.background}>
        <BackgroundPattern/>
      </div>
      <div className={styles.boardContainer}>
        <div className={styles.board}>
          <GameBoardPreview matrix={matrix}/>
          <div className={styles.bottomSpace}/>
        </div>
      </div>
      <GameBoardTheme
        selectorPrefix={`.${CSS_CLASS} `}
        primaryColor={props.themePreview.primaryColor}
        theme={props.themePreview.theme}
      />
    </div>
  )
}

export default Object.assign(connect<IDataProps, ICallbackProps, {}, IState>(
  createStructuredSelector({
    themePreview: themePreviewSelector,
  }),
  {
    onCloseDialogs: closeDialogs,
  },
)(
  ThemePreview,
), {
    drawerActionLabel: 'Nastavit barvu hry',
    title: 'Změnit barevné schéma',
  },
)
