import * as React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import Difficulty from '../../../conf/Difficulty'
import {
  clearLastConflictingValue,
  pause,
  revealAllImmediateHints,
  showValuePicker,
  toggleCellValue,
  undo,
  ValueEntryMode,
} from '../../../game/Action'
import {IEndedGamePlayBreak, IMatrixCoordinates, IStartedGamePlayBreak, SudokuMatrix} from '../../../game/state'
import {getGamePlayDuration} from '../../../game/util'
import {gameWon, setInputMode, showDialog} from '../Action'
import GameDesk from '../blocks/GameDesk'
import {InputMode} from '../blocks/InputModeSwitch'
import Dialog from '../dialog/Dialog'
import usePrevious from '../reusable/usePrevious'
import {
  breaksSelector,
  dialogSelector,
  gameBoardStateSelector,
  gameDifficultySelector,
  gameEndSelector,
  gameStartSelector,
  inputModeSelector,
  isGameMatrixEmptySelector,
  isGamePausedSelector,
  isGameWonSelector,
  lastConflictingValueSelector,
  primaryColorSelector,
  selectedCellSelector,
  themeSelector,
  usedHintsSelector,
  usedUpValuesSelector,
} from '../selectors'
import {IState} from '../state'
import PrimaryColor from '../theme/PrimaryColor'
import Theme from '../theme/Theme'
import GameBoard from './GameBoard'
import highScoresContext from './highScoresContext'

interface IDataProps {
  readonly gameState: SudokuMatrix
  readonly inputMode: InputMode
  readonly usedUpValues: readonly number[]
  readonly selectedCell: null | IMatrixCoordinates
  readonly difficulty: null | Difficulty
  readonly gameStart: null | {
    readonly logicalTimestamp: number,
  }
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly gameEnd: null | number
  readonly usedHints: boolean
  readonly lastConflictingValue: null | number
  readonly isPaused: boolean
  readonly currentDialog: null | Dialog
  readonly isWon: boolean
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
  readonly isGameMatrixEmpty: boolean
}

interface ICallbackProps {
  onSetInputMode(inputMode: InputMode): void
  onToggleCellValue(change: {cell: IMatrixCoordinates, value: null | number, mode: ValueEntryMode}): void
  onOpenSettingsDialog(): void
  onOpenNewGameDialog(): void
  onOpenPauseDialog(): void
  onPause(): void
  onUndo(): void
  onOpenHelpDialog(): void
  onOpenCongratulationsDialog(): void
  onSetSelectedCell(cell: null | IMatrixCoordinates): void
  onGameWon(): void
  onClearLastConflictingValue(): void
}

interface IExternalProps {
  readonly inputModeSwitchName: string
  readonly defaultInputMode: InputMode
  readonly themeStyleNameSpacingClassName: string
  readonly themeStyleAnimationNamespace: string
}

type Props = IDataProps & ICallbackProps & IExternalProps

export function Main(props: Props) {
  const pendingCellUpdate = React.useRef<null | [IMatrixCoordinates, null | number, InputMode]>(null)

  const onToggleCellValue = React.useMemo(
    () => (cell: IMatrixCoordinates, value: null | number, mode: InputMode) => {
      pendingCellUpdate.current = null
      switch (mode) {
        case InputMode.INPUT:
          if (props.lastConflictingValue === value) {
            pendingCellUpdate.current = [cell, value, mode]
            props.onClearLastConflictingValue()
          } else {
            props.onToggleCellValue({cell, value, mode: ValueEntryMode.SET_VALUE})
          }
          break
        case InputMode.NOTES:
          if (props.lastConflictingValue === value) {
            pendingCellUpdate.current = [cell, value, mode]
            props.onClearLastConflictingValue()
          } else {
            props.onToggleCellValue({cell, value, mode: ValueEntryMode.MAKE_NOTE})
          }
          break
        case InputMode.ERASE:
          props.onToggleCellValue({cell, value: 0, mode: ValueEntryMode.SET_VALUE})
          break
        default:
          throw new Error(`Unknown input mode: ${mode}`)
      }
    },
    [props.lastConflictingValue, props.onClearLastConflictingValue, props.onToggleCellValue],
  )

  React.useEffect(() => {
    if (pendingCellUpdate.current) {
      onToggleCellValue(...pendingCellUpdate.current)
    }
  })

  const onClearSelectedCell = React.useMemo(
    () => () => {
      pendingCellUpdate.current = null
      props.onSetSelectedCell(null)
    },
    [props.onSetSelectedCell],
  )

  const onOpenNewGameDialog = React.useMemo(
    () => () => {
      props.onPause()
      props.onOpenNewGameDialog()
    },
    [props.onOpenNewGameDialog, props.onPause],
  )

  React.useEffect(() => {
    if (props.isPaused && !props.currentDialog) {
      props.onOpenPauseDialog()
    }
  })

  const highScores = React.useContext(highScoresContext)
  const previousIsWon = usePrevious(props.isWon)
  React.useEffect(() => {
    if (!previousIsWon && props.isWon) {
      if (highScores && props.difficulty && props.gameStart) {
        const gameplayDuration = getGamePlayDuration(props.gameStart, props.breaks, props.gameEnd)
        highScores.addWonGame(props.difficulty, gameplayDuration, props.usedHints)
      } else {
        // tslint:disable-next-line:no-console
        console.warn('Cannot save high scores - storage, difficulty or game start is missing')
      }
      props.onGameWon()
      props.onOpenCongratulationsDialog()
    }
  })

  return (
    <GameDesk
      difficulty={props.isGameMatrixEmpty ? null : props.difficulty}
      breaks={props.isGameMatrixEmpty ? [] : props.breaks}
      gameStart={props.isGameMatrixEmpty ? null : props.gameStart}
      gameEnd={props.isGameMatrixEmpty ? null : props.gameEnd}
      onOpenSettings={props.onOpenSettingsDialog}
      onNewGame={onOpenNewGameDialog}
      onPause={props.onPause}
      onUndo={props.onUndo}
      onHelp={props.onOpenHelpDialog}
      onDeselectCell={onClearSelectedCell}
    >
      <GameBoard
        gameState={props.gameState}
        selectedCell={props.selectedCell}
        inputMode={props.inputMode}
        inputModeSwitchName={props.inputModeSwitchName}
        usedUpValues={props.usedUpValues}
        lastConflictingValue={props.lastConflictingValue}
        primaryColor={props.primaryColor}
        theme={props.theme}
        uniqueClassName={props.themeStyleNameSpacingClassName}
        uniqueAnimationNamespace={props.themeStyleAnimationNamespace}
        onSetInputMode={props.onSetInputMode}
        onToggleCellValue={onToggleCellValue}
        onSetSelectedCell={props.onSetSelectedCell}
      />
    </GameDesk>
  )
}

export default connect<IDataProps, ICallbackProps, IExternalProps, IState>(
  createStructuredSelector({
    breaks: breaksSelector,
    currentDialog: dialogSelector,
    difficulty: gameDifficultySelector,
    gameEnd: gameEndSelector,
    gameStart: gameStartSelector,
    gameState: gameBoardStateSelector,
    inputMode: inputModeSelector,
    lastConflictingValue: lastConflictingValueSelector,
    usedUpValues: usedUpValuesSelector,
    isPaused: isGamePausedSelector,
    isWon: isGameWonSelector,
    primaryColor: primaryColorSelector,
    selectedCell: selectedCellSelector,
    theme: themeSelector,
    usedHints: usedHintsSelector,
    isGameMatrixEmpty: isGameMatrixEmptySelector,
  }),
  {
    onOpenCongratulationsDialog: showDialog.bind(null, {dialog: Dialog.CONGRATULATIONS, stack: false}),
    onOpenHelpDialog: revealAllImmediateHints,
    onOpenNewGameDialog: showDialog.bind(null, {dialog: Dialog.NEW_GAME, stack: false}),
    onOpenPauseDialog: showDialog.bind(null, {dialog: Dialog.PAUSE, stack: false}),
    onOpenSettingsDialog: showDialog.bind(null, {dialog: Dialog.SETTINGS, stack: false}),
    onPause: pause,
    onSetInputMode: setInputMode,
    onSetSelectedCell: showValuePicker,
    onToggleCellValue: toggleCellValue,
    onUndo: undo,
    onGameWon: gameWon,
    onClearLastConflictingValue: clearLastConflictingValue,
  },
)(
  Main,
)
