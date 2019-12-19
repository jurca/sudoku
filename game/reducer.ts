import createReducer from 'redux-create-fsa-reducer'
import Difficulty from '../conf/Difficulty'
import {Action, ValueEntryMode} from './Action'
import {checkBoard} from './boardChecker'
import createGame from './gameGenerator'
import {DEFAULT_STATE, IState, ISudokuMatrixCell, SudokuMatrix, SudokuMatrixRow} from './state'

export default createReducer<IState, any>(DEFAULT_STATE, {
  [Action.NEW_GAME](state: IState, difficulty: Difficulty): IState {
    const matrix = createGame(difficulty)
    return {
      ...state,
      difficulty,
      gameStart: performance.now(),
      matrix,
      valuePickerOpenAt: null,
    }
  },

  [Action.SHOW_VALUE_PICKER](state: IState, valuePickerCoordinates: readonly [number, number]): IState {
    return {
      ...state,
      valuePickerOpenAt: valuePickerCoordinates,
    }
  },

  [Action.TOGGLE_CELL_VALUE](
    state: IState,
    {cell, mode, value}: {cell: ISudokuMatrixCell, mode: ValueEntryMode, value: number},
  ): IState {
    const cellRow = state.matrix.findIndex((row) => row.includes(cell))
    if (cellRow === -1) {
      return state
    }
    const cellColumn = state.matrix[cellRow].findIndex((otherCell) => otherCell === cell)
    const updatedRow = state.matrix[cellRow].slice()
    const updatedUserMarkedOptions = cell.userMarkedOptions.slice()
    if (mode === ValueEntryMode.MAKE_NOTE) {
      if (value === null) {
        updatedUserMarkedOptions.splice(0)
      } else {
        const existingValueIndex = updatedUserMarkedOptions.indexOf(value)
        if (existingValueIndex > -1) {
          updatedUserMarkedOptions.splice(existingValueIndex, 1)
        } else {
          updatedUserMarkedOptions.push(value)
        }
      }
    }
    const updatedCell = {
      ...cell,
      userMarkedOptions: updatedUserMarkedOptions,
      value: mode === ValueEntryMode.SET_VALUE ? value : cell.value,
    }
    updatedRow.splice(cellColumn, 1, updatedCell)
    const updatedMatrixData = state.matrix.slice()
    updatedMatrixData.splice(cellRow, 1, updatedRow as unknown as SudokuMatrixRow)
    const updatedMatrix = updatedMatrixData as unknown as SudokuMatrix

    if (!checkBoard(updatedMatrix)) {
      return {
        ...state,
        valuePickerOpenAt: null,
      }
    }

    return {
      ...state,
      matrix: updatedMatrix,
      valuePickerOpenAt: null,
    }
  },
})
