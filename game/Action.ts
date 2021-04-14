import {Action as ReduxActionType} from 'redux'
import {createAction} from 'redux-actions'
import Difficulty from '../conf/Difficulty'
import {IMatrixCoordinates} from './state'

export enum Action {
  NEW_GAME = 'Action.NEW_GAME',
  SHOW_VALUE_PICKER = 'Action.SHOW_VALUE_PICKER',
  TOGGLE_CELL_VALUE = 'Action.TOGGLE_CELL_VALUE',
  PAUSE = 'Action.PAUSE',
  RESUME = 'Action.RESUME',
  UNDO = 'Action.UNDO',
  REVEAL_IMMEDIATE_HINT = 'Action.REVEAL_IMMEDIATE_HINT',
  REVEAL_ALL_IMMEDIATE_HINTS = 'Action.REVEAL_ALL_IMMEDIATE_HINTS',
}

export type ActionType = ReduxActionType<Action>

export enum ValueEntryMode {
  SET_VALUE = 'ValueEntryMode.SET_VALUE',
  MAKE_NOTE = 'ValueEntryMode.MAKE_NOTE',
}

export interface IToggleCellValuePayload {
  readonly cell: IMatrixCoordinates
  readonly value: null | number
  readonly mode: ValueEntryMode
}

export const newGame = mkActionFactory<Difficulty>(Action.NEW_GAME)
export const showValuePicker = mkActionFactory<IMatrixCoordinates>(Action.SHOW_VALUE_PICKER)
export const toggleCellValue = mkActionFactory<IToggleCellValuePayload>(
  Action.TOGGLE_CELL_VALUE,
)
export const pause = mkActionFactory<void>(Action.PAUSE)
export const resume = mkActionFactory<void>(Action.RESUME)
export const undo = mkActionFactory<void>(Action.UNDO)
export const revealImmediateHint = mkActionFactory<void>(Action.REVEAL_IMMEDIATE_HINT)
export const revealAllImmediateHints = mkActionFactory<void>(Action.REVEAL_ALL_IMMEDIATE_HINTS)

function mkActionFactory<Payload>(type: Action) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
