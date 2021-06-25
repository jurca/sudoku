import {createStore, Reducer} from 'redux'
import {ActionType} from './Action'
import reducer from './reducer'
import {DEFAULT_STATE, IState} from './state'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
export default (
  reducerWrapper?: (state: IState, action: ActionType, reducer: Reducer<IState, ActionType>) => IState,
) => createStore<IState, ActionType, {}, {}>(
  reducerWrapper ? (state, action) => reducerWrapper(state || DEFAULT_STATE, action, reducer) : reducer,
  DEFAULT_STATE,
  reduxDevTools && reduxDevTools(),
)
