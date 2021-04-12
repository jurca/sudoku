import {createStore, StoreEnhancer} from 'redux'
import {ActionType} from './Action'
import reducer from './reducer'
import {DEFAULT_STATE, IState} from './state'

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer<{}, {}>
  }
}

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
export default () => createStore<IState, ActionType, {}, {}>(reducer, DEFAULT_STATE, reduxDevTools && reduxDevTools())
