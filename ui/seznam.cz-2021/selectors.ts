import {createSelector} from 'reselect'
import {difficultySelector, matrixSelector} from '../../game/selectors'
import {IState} from './state'

export const appStateSelector = (globalState: IState) => globalState.app
export const gameStateSelector = (globalState: IState) => globalState.game

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

export const breaksSelector = createSelector(
  gameStateSelector,
  (gameState) => gameState.breaks,
)