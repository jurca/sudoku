import { combineReducers } from 'redux'
import createReducer from 'redux-create-fsa-reducer'
import gameReducer from '../../game/reducer'
import {DEFAULT_APP_STATE, IAppState, IState} from './state'

const appReducer = createReducer<IAppState, any>(DEFAULT_APP_STATE, {})

export default combineReducers<IState>({
  app: appReducer,
  game: gameReducer,
})
