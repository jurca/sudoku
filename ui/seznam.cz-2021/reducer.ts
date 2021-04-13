import {combineReducers} from 'redux'
import createReducer from 'redux-create-fsa-reducer'
import gameReducer from '../../game/reducer'
import {AppAction, IShowDialogPayload} from './Action'
import {DEFAULT_APP_STATE, IAppState, IState} from './state'

const appReducer = createReducer<IAppState, any>(DEFAULT_APP_STATE, {
  [AppAction.SHOW_DIALOG](state: IAppState, payload: IShowDialogPayload): IAppState {
    return {
      ...state,
      dialogStack: payload.stack ? state.dialogStack.concat(payload.dialog) : [payload.dialog],
    }
  },

  [AppAction.LEAVE_DIALOG](state: IAppState): IAppState {
    return {
      ...state,
      dialogStack: state.dialogStack.slice(0, -1),
    }
  },
})

export default combineReducers<IState>({
  app: appReducer,
  game: gameReducer,
})
