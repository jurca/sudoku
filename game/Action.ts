import {Action as ReduxActionType} from 'redux'
import {createAction} from 'redux-actions'
import Difficulty from '../conf/Difficulty'

export enum Action {
  NEW_GAME = 'Action.NEW_GAME',
}

export type ActionType = ReduxActionType<Action>

function mkActionFactory<Payload>(type: Action) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}

export const newGame = mkActionFactory<Difficulty>(Action.NEW_GAME)
