import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import Difficulty from '../../../conf/Difficulty'
import {pause, toggleCellValue, undo, ValueEntryMode} from '../../../game/Action'
import {IEndedGamePlayBreak, IMatrixCoordinates, IStartedGamePlayBreak, SudokuMatrix} from '../../../game/state'
import {openHelpDialog, openSettingsDialog, showDialog} from '../Action'
import GameDesk from '../blocks/GameDesk'
import {InputMode} from '../blocks/InputModeSwitch'
import Dialog from '../dialog/Dialog'
import {
  breaksSelector,
  gameBoardStateSelector,
  gameDifficultySelector,
  gameStartSelector,
  primaryColorSelector,
  themeSelector,
} from '../selectors'
import {IState} from '../state'
import PrimaryColor from '../theme/PrimaryColor'
import Theme from '../theme/Theme'
import GameBoard from './GameBoard'

interface IDataProps {
  readonly gameState: SudokuMatrix
  readonly difficulty: null | Difficulty
  readonly gameStart: null | {
    readonly logicalTimestamp: number,
  }
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
}

interface ICallbackProps {
  onToggleCellValue(change: {cell: IMatrixCoordinates, value: null | number, mode: ValueEntryMode}): void,
  onOpenSettingsDialog(): void
  onOpenNewGameDialog(): void
  onPause(): void
  onUndo(): void
  onOpenHelpDialog(): void
}

interface IExternalProps {
  readonly inputModeSwitchName: string
  readonly defaultInputMode: InputMode
  readonly themeStyleNameSpacingClassName: string
}

type Props = IDataProps & ICallbackProps & IExternalProps

export function Main(props: Props) {
  const onToggleCellValue = React.useMemo(
    () => (cell: IMatrixCoordinates, value: null | number, mode: InputMode) => {
      switch (mode) {
        case InputMode.INPUT:
          props.onToggleCellValue({cell, value, mode: ValueEntryMode.SET_VALUE})
          break
        case InputMode.NOTES:
          props.onToggleCellValue({cell, value, mode: ValueEntryMode.MAKE_NOTE})
          break
        case InputMode.ERASE:
          props.onToggleCellValue({cell, value: 0, mode: ValueEntryMode.SET_VALUE})
          break
        default:
          throw new Error(`Unknown input mode: ${mode}`)
      }
    },
    [props.onToggleCellValue],
  )

  return (
    <GameDesk
      difficulty={props.difficulty}
      breaks={props.breaks}
      gameStart={props.gameStart}
      onOpenSettings={props.onOpenSettingsDialog}
      onNewGame={props.onOpenNewGameDialog}
      onPause={props.onPause}
      onUndo={props.onUndo}
      onHelp={props.onOpenHelpDialog}
    >
      <GameBoard
        gameState={props.gameState}
        defaultInputMode={props.defaultInputMode}
        inputModeSwitchName={props.inputModeSwitchName}
        primaryColor={props.primaryColor}
        theme={props.theme}
        uniqueClassName={props.themeStyleNameSpacingClassName}
        onToggleCellValue={onToggleCellValue}
      />
    </GameDesk>
  )
}

export default connect<IDataProps, ICallbackProps, IExternalProps, IState>(
  createStructuredSelector({
    breaks: breaksSelector,
    difficulty: gameDifficultySelector,
    gameStart: gameStartSelector,
    gameState: gameBoardStateSelector,
    primaryColor: primaryColorSelector,
    theme: themeSelector,
  }),
  {
    onOpenHelpDialog: openHelpDialog,
    onOpenNewGameDialog: showDialog.bind(null, {dialog: Dialog.NEW_GAME, stack: false}),
    onOpenSettingsDialog: openSettingsDialog,
    onPause: pause,
    onToggleCellValue: toggleCellValue,
    onUndo: undo,
  },
)(
  Main,
)
