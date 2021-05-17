import {DEFAULT_STATE as DEFAULT_GAME_STATE, IState as IGameState} from '../../game/state'
import {InputMode} from './blocks/InputModeSwitch'
import Dialog from './dialog/Dialog'
import {DEFAULT_HIGH_SCORES, HighScores} from './storage/HighScoreStorage'
import PrimaryColor from './theme/PrimaryColor'
import Theme from './theme/Theme'

export interface IThemeConfiguration {
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
}

export interface ISessionStatistics {
  readonly newGames: number
  readonly wonGames: number
}

export interface IAppState {
  readonly inputMode: InputMode
  readonly dialogStack: readonly Dialog[]
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
  readonly themePreview: IThemeConfiguration
  readonly highScores: HighScores
  readonly sessionStatistics: ISessionStatistics
}

export const DEFAULT_APP_STATE: IAppState = {
  dialogStack: [Dialog.NEW_GAME],
  highScores: DEFAULT_HIGH_SCORES,
  inputMode: InputMode.INPUT,
  primaryColor: PrimaryColor.RED,
  theme: Theme.LIGHT,
  themePreview: {
    primaryColor: PrimaryColor.RED,
    theme: Theme.LIGHT,
  },
  sessionStatistics: {
    newGames: 0,
    wonGames: 0,
  },
}

export interface IState {
  readonly app: IAppState
  readonly game: IGameState
}

export const DEFAULT_STATE: IState = {
  app: DEFAULT_APP_STATE,
  game: DEFAULT_GAME_STATE,
}
