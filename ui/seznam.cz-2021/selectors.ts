import {createSelector} from 'reselect'
import {
  difficultySelector,
  gameEndSelector as gameEndGameStateSelector,
  isGameWonSelector as isGameStateWonSelector,
  matrixSelector,
  moveValidationEnabledSelector as gameMoveValidationEnabledSelector,
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

export const gameBoardStateSelector = createSelector(
  gameStateSelector,
  matrixSelector,
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

export const isGameWonSelector = createSelector(
  gameStateSelector,
  isGameStateWonSelector,
)

export const selectedCellSelector = createSelector(
  gameStateSelector,
  valuePickerOpenAtSelector,
)

export const dialogSelector = createSelector(
  dialogStackSelector,
  (dialogs) => lastItem(dialogs) || null,
)

export const isNestedDialogSelector = createSelector(
  dialogStackSelector,
  (dialogs) => dialogs.length > 1,
)

export const themePreviewSelector = createSelector(
  appStateSelector,
  (appState) => appState.themePreview,
)
