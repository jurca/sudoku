import {Action as ReduxActionType} from 'redux'
import {createAction} from 'redux-actions'
import Difficulty from '../conf/Difficulty'
import {ISudokuMatrixCell} from './state'

export enum Action {
  NEW_GAME = 'Action.NEW_GAME',
  SHOW_VALUE_PICKER = 'Action.SHOW_VALUE_PICKER',
  TOGGLE_CELL_VALUE = 'Action.TOGGLE_CELL_VALUE',
}

export type ActionType = ReduxActionType<Action>

export enum ValueEntryMode {
  SET_VALUE = 'ValueEntryMode.SET_VALUE',
  MAKE_NOTE = 'ValueEntryMode.MAKE_NOTE',
}

function mkActionFactory<Payload>(type: Action) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}

export const newGame = mkActionFactory<Difficulty>(Action.NEW_GAME)
export const showValuePicker = mkActionFactory<[number, number]>(Action.SHOW_VALUE_PICKER)
export const toggleCellValue = mkActionFactory<{cell: ISudokuMatrixCell, value: number}>(Action.TOGGLE_CELL_VALUE)
