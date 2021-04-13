import createReducer from 'redux-create-fsa-reducer'
import Difficulty from '../conf/Difficulty'
import {Action, IToggleCellValuePayload, ValueEntryMode} from './Action'
import {checkBoard} from './boardChecker'
import createGame from './gameGenerator'
import {
  DEFAULT_STATE,
  IEndedGamePlayBreak,
  IMatrixCoordinates,
  IStartedGamePlayBreak,
  IState,
  SudokuMatrixNotes,
  SudokuMatrixNotesRow,
  SudokuMatrixState,
  SudokuMatrixStateRow,
} from './state'

export default createReducer<IState, any>(DEFAULT_STATE, {
  [Action.NEW_GAME](state: IState, difficulty: Difficulty): IState {
    const matrix = createGame(difficulty)
    return {
      ...state,
      breaks: [],
      difficulty,
      gameStart: {
        absoluteTimestamp: Date.now(),
        logicalTimestamp: performance.now(),
      },
      matrix,
      matrixHistory: [],
      notes: DEFAULT_STATE.notes,
      valuePickerOpenAt: null,
    }
  },

  [Action.SHOW_VALUE_PICKER](
    state: IState,
    valuePickerCoordinates: IMatrixCoordinates,
  ): IState {
    return {
      ...state,
      valuePickerOpenAt: valuePickerCoordinates,
    }
  },

  [Action.TOGGLE_CELL_VALUE](
    state: IState,
    {cell, mode, value}: IToggleCellValuePayload,
  ): IState {
    switch (mode) {
      case ValueEntryMode.MAKE_NOTE:
        if (!value) {
          return state
        }

        const notesRow = state.notes[cell.row].slice()
        const cellNotes = notesRow[cell.column].userMarkedOptions
        notesRow.splice(cell.column, 1, {
          ...notesRow[cell.column],
          userMarkedOptions: (
            cellNotes.includes(value) ? cellNotes.filter((otherValue) => otherValue !== value) : cellNotes.concat(value)
          ),
        })
        return {
          ...state,
          notes: [
            ...state.notes.slice(0, cell.row),
            notesRow as unknown as SudokuMatrixNotesRow,
            ...state.notes.slice(cell.row + 1),
          ] as unknown as SudokuMatrixNotes,
        }
      case ValueEntryMode.SET_VALUE:
        const row = state.matrix[cell.row].slice()
        if (!value && !row[cell.column].value) {
          return state
        }

        row.splice(cell.column, 1, {
          ...row[cell.column],
          value: row[cell.column].value === value ? null : value,
        })
        const updatedMatrix = [
          ...state.matrix.slice(0, cell.row),
          row as unknown as SudokuMatrixStateRow,
          ...state.matrix.slice(cell.row + 1),
        ] as unknown as SudokuMatrixState
        if (!checkBoard(updatedMatrix)) {
          return state
        }

        const historyIndex = state.matrixHistory.indexOf(state.matrix)
        return {
          ...state,
          matrix: updatedMatrix,
          matrixHistory: state.matrixHistory
            .slice(0, historyIndex === -1 ? state.matrixHistory.length : historyIndex)
            .concat([state.matrix]),
        }
      default:
        throw new Error(`Unknown entry mode: ${mode}`)
    }
  },

  [Action.UNDO](state: IState): IState {
    const history = state.matrixHistory
    const historyIndex = history.indexOf(state.matrix)
    if (!state.matrixHistory.length || historyIndex === 0) {
      return state
    }

    return {
      ...state,
      matrix: history[(historyIndex === -1 ? history.length : historyIndex) - 1],
    }
  },

  [Action.PAUSE](state: IState): IState {
    const {breaks} = state
    if (breaks[0] && !('endLogicalTimestamp' in breaks[0])) {
      return state
    }

    const updatedBreaks = [{startLogicalTimestamp: performance.now()}].concat(breaks) as unknown
    return {
      ...state,
      breaks: updatedBreaks as readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]],
    }
  },

  [Action.RESUME](state: IState): IState {
    const {breaks} = state
    if (!breaks[0] || ('endLogicalTimestamp' in breaks[0])) {
      return state
    }

    return {
      ...state,
      breaks: [{...breaks[0], endLogicalTimestamp: performance.now()}, ...breaks.slice(1) as IEndedGamePlayBreak[]],
    }
  },
})
