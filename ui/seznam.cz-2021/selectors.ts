import {createSelector} from 'reselect'
import {
  difficultySelector,
  emptyMatrixSelector,
  gameEndSelector as gameEndGameStateSelector,
  isGameMatrixEmptySelector as isGameStateMatrixEmptySelector,
  isGameWonSelector as isGameStateWonSelector,
  matrixSelector,
  moveValidationEnabledSelector as gameMoveValidationEnabledSelector,
  usedHintsSelector as usedMoveHintsSelector,
  valuePickerOpenAtSelector,
} from '../../game/selectors'
import {lastItem} from '../../game/util'
import {IState} from './state'

export const appStateSelector = (globalState: IState) => globalState.app
export const gameStateSelector = (globalState: IState) => globalState.game

export const dialogStackSelector = createSelector(
  appStateSelector,
  (appState) => appState.dialogStack,
)

export const themeSelector = createSelector(
  appStateSelector,
  (appState) => appState.theme,
)

export const primaryColorSelector = createSelector(
  appStateSelector,
  (appState) => appState.primaryColor,
)

export const inputModeSelector = createSelector(
  appStateSelector,
  (appState) => appState.inputMode,
)

export const gameDifficultySelector = createSelector(
  gameStateSelector,
  difficultySelector,
)

export const gameStartSelector = createSelector(
  gameStateSelector,
  (gameState) => gameState.gameStart,
)

export const gameEndSelector = createSelector(
  gameStateSelector,
  gameEndGameStateSelector,
)

export const moveValidationEnabledSelector = createSelector(
  gameStateSelector,
  gameMoveValidationEnabledSelector,
)

export const breaksSelector = createSelector(
  gameStateSelector,
  (gameState) => gameState.breaks,
)

export const isGamePausedSelector = createSelector(
  breaksSelector,
  (breaks) => !!(breaks[0] && !('endLogicalTimestamp' in breaks[0])),
)

export const gameBoardStateSelector = createSelector(
  createSelector(
    gameStateSelector,
    matrixSelector,
  ),
  emptyMatrixSelector,
  isGamePausedSelector,
  (matrixState, emptyMatrix, isPaused) => isPaused ? emptyMatrix : matrixState,
)

export const isGameWonSelector = createSelector(
  gameStateSelector,
  isGameStateWonSelector,
)

export const selectedCellSelector = createSelector(
  gameStateSelector,
  valuePickerOpenAtSelector,
)

export const usedHintsSelector = createSelector(
  gameStateSelector,
  usedMoveHintsSelector,
)

export const dialogSelector = createSelector(
  dialogStackSelector,
  (dialogs) => lastItem(dialogs) || null,
)

export const isNestedDialogSelector = createSelector(
  dialogStackSelector,
  (dialogs) => dialogs.length > 1,
)

export const highScoresSelector = createSelector(
  appStateSelector,
  (appState) => appState.highScores,
)

export const themePreviewSelector = createSelector(
  appStateSelector,
  (appState) => appState.themePreview,
)

export const isGameMatrixEmptySelector = createSelector(
  gameStateSelector,
  isGameStateMatrixEmptySelector,
)

export const sessionStatisticsSelector = createSelector(
  appStateSelector,
  appState => appState.sessionStatistics,
)
