import {DEFAULT_STATE as DEFAULT_GAME_STATE, IState as IGameState} from '../../game/state'
import Dialog from './dialog/Dialog'
import PrimaryColor from './theme/PrimaryColor'
import Theme from './theme/Theme'

export interface IAppState {
  readonly dialogStack: readonly Dialog[]
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
}

export const DEFAULT_APP_STATE: IAppState = {
  dialogStack: [Dialog.NEW_GAME],
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
