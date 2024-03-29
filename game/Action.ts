import {Action as ReduxActionType} from 'redux'
import {createAction} from 'redux-actions'
import Difficulty from '../conf/Difficulty'
import {IPausedGame} from '../ui/seznam.cz-2021/storage/PausedGameStorage'
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
  SET_MOVE_VALIDATION = 'Action.SET_MOVE_VALIDATION',
  SET_NOTES_CULLING = 'Action.SET_NOTES_CULLING',
  CLEAR_LAST_CONFLICTING_VALUE = 'Action.CLEAR_LAST_CONFLICTING_VALUE',
  RESTORE_PAUSED_GAME = 'Action.RESTORE_PAUSED_GAME',
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
export const setMoveValidation = mkActionFactory<boolean>(Action.SET_MOVE_VALIDATION)
export const setNotesCulling = mkActionFactory<boolean>(Action.SET_NOTES_CULLING)
export const clearLastConflictingValue = mkActionFactory<void>(Action.CLEAR_LAST_CONFLICTING_VALUE)
export const restorePausedGame = mkActionFactory<IPausedGame>(Action.RESTORE_PAUSED_GAME)

function mkActionFactory<Payload>(type: Action) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
