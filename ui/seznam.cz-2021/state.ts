import {DEFAULT_STATE as DEFAULT_GAME_STATE, IState as IGameState} from '../../game/state'
import PrimaryColor from './theme/PrimaryColor'
import Theme from './theme/Theme'

export interface IAppState {
  primaryColor: PrimaryColor
  theme: Theme
}

export const DEFAULT_APP_STATE: IAppState = {
  primaryColor: PrimaryColor.RED,
  theme: Theme.LIGHT,
}

export interface IState {
  readonly app: IAppState
  readonly game: IGameState
}

export const DEFAULT_STATE: IState = {
  app: DEFAULT_APP_STATE,
  game: DEFAULT_GAME_STATE,
}
