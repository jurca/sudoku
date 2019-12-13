import {createStore} from 'redux'
import {ActionType} from './Action'
import reducer from './reducer'
import {DEFAULT_STATE, IState} from './state'

export default () => createStore<IState, ActionType, {}, {}>(reducer, DEFAULT_STATE)
