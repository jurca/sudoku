import createReducer from 'redux-create-fsa-reducer'
import Difficulty from '../conf/Difficulty'
import {AppAction} from '../ui/seznam.cz-2021/Action'
import {ISettings} from '../ui/seznam.cz-2021/storage/SettingsStorage'
import {Action, IToggleCellValuePayload, ValueEntryMode} from './Action'
import {checkBoard, cullNotes, isCellValueAllowed} from './boardChecker'
import createGame from './gameGenerator'
import getDeterministicImmediateHints from './hintGenerator'
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
import {isComplete} from './util'

export default createReducer<IState, any>(DEFAULT_STATE, {
  [Action.NEW_GAME](state: IState, difficulty: Difficulty): IState {
    const matrix = createGame(difficulty)
    return {
      ...state,
      breaks: [],
      difficulty,
      gameEnd: null,
      gameStart: {
        absoluteTimestamp: Date.now(),
        logicalTimestamp: performance.now(),
      },
      history: [],
      matrix,
      notes: DEFAULT_STATE.notes,
      usedHints: false,
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
      lastConflictingValue: null,
    }
  },

  [Action.TOGGLE_CELL_VALUE](
    state: IState,
    {cell, mode, value}: IToggleCellValuePayload,
  ): IState {
    if (isComplete(state.matrix) || state.matrix[cell.row][cell.column].initialValue) {
      return state
    }

    const historyIndex = state.history.findIndex(
      entry => entry.matrix === state.matrix && entry.notes === state.notes,
    )

    switch (mode) {
      case ValueEntryMode.MAKE_NOTE:
        if (!value) {
          return state
        }

        if (state.automaticNotesCulling && !isCellValueAllowed(state.matrix, cell.row, cell.column, value)) {
          return {
            ...state,
            lastConflictingValue: value,
          }
        }

        const notesRow = state.notes[cell.row].slice()
        const cellNotes = notesRow[cell.column].userMarkedOptions
        notesRow.splice(cell.column, 1, {
          ...notesRow[cell.column],
          userMarkedOptions: (
            cellNotes.includes(value) ? cellNotes.filter((otherValue) => otherValue !== value) : cellNotes.concat(value)
          ),
        })
        const updatedNotes = [
          ...state.notes.slice(0, cell.row),
          notesRow as unknown as SudokuMatrixNotesRow,
          ...state.notes.slice(cell.row + 1),
        ] as unknown as SudokuMatrixNotes
        return {
          ...state,
          notes: state.automaticNotesCulling ? cullNotes(state.matrix, updatedNotes) : updatedNotes,
          history: state.history
            .slice(0, historyIndex === -1 ? state.history.length : historyIndex)
            .concat({matrix: state.matrix, notes: state.notes}),
        }
      case ValueEntryMode.SET_VALUE:
        const row = state.matrix[cell.row].slice()
        if (!value && !row[cell.column].value) {
          if (state.notes[cell.row][cell.column].userMarkedOptions.length) {
            const notesToClearRow = state.notes[cell.row].slice()
            notesToClearRow.splice(cell.column, 1, {
              ...notesToClearRow[cell.column],
              userMarkedOptions: [],
            })
            return {
              ...state,
              notes: [
                ...state.notes.slice(0, cell.row),
                notesToClearRow as unknown as SudokuMatrixNotesRow,
                ...state.notes.slice(cell.row + 1),
              ] as unknown as SudokuMatrixNotes,
            }
          }

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
        if (state.moveValidationEnabled && !checkBoard(updatedMatrix)) {
          return {
            ...state,
            lastConflictingValue: value,
          }
        }

        return {
          ...state,
          gameEnd: isComplete(updatedMatrix) ? performance.now() : state.gameEnd,
          matrix: updatedMatrix,
          notes: state.automaticNotesCulling ? cullNotes(updatedMatrix, state.notes) : state.notes,
          history: state.history
            .slice(0, historyIndex === -1 ? state.history.length : historyIndex)
            .concat({matrix: state.matrix, notes: state.notes}),
        }
      default:
        throw new Error(`Unknown entry mode: ${mode}`)
    }
  },

  [Action.UNDO](state: IState): IState {
    const {history} = state
    const historyIndex = history.findIndex(entry => entry.matrix === state.matrix && entry.notes === state.notes)
    if (!state.history.length || historyIndex === 0 || isComplete(state.matrix)) {
      return state
    }

    return {
      ...state,
      matrix: history[(historyIndex === -1 ? history.length : historyIndex) - 1].matrix,
      notes: history[(historyIndex === -1 ? history.length : historyIndex) - 1].notes,
    }
  },

  [Action.PAUSE](state: IState): IState {
    const {breaks} = state
    if (breaks[0] && !('endLogicalTimestamp' in breaks[0]) || isComplete(state.matrix)) {
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

  [Action.REVEAL_IMMEDIATE_HINT](state: IState): IState {
    const hints = getDeterministicImmediateHints(state.matrix)
    if (!hints.length) {
      return state
    }

    const [hint] = hints
    const notesRow = state.notes[hint.cell.row].slice()
    notesRow.splice(hint.cell.column, 1, {
      ...notesRow[hint.cell.column],
      userMarkedOptions: [hint.value],
    })
    return {
      ...state,
      notes: [
        ...state.notes.slice(0, hint.cell.row),
        notesRow as unknown as SudokuMatrixNotesRow,
        ...state.notes.slice(hint.cell.row + 1),
      ] as unknown as SudokuMatrixNotes,
      usedHints: true,
      valuePickerOpenAt: hint.cell,
    }
  },

  [Action.REVEAL_ALL_IMMEDIATE_HINTS](state: IState): IState {
    const hints = getDeterministicImmediateHints(state.matrix)
    if (!hints.length) {
      return state
    }

    const notes = state.notes.map((row) => row.slice())
    for (const hint of hints) {
      const cell = notes[hint.cell.row][hint.cell.column]
      notes[hint.cell.row][hint.cell.column] = {
        ...cell,
        userMarkedOptions: [hint.value],
      }
    }

    return {
      ...state,
      notes: notes as unknown as SudokuMatrixNotes,
      usedHints: true,
      valuePickerOpenAt: null,
    }
  },

  [AppAction.SETTINGS_CHANGED](state: IState, settings: ISettings): IState {
    return {
      ...state,
      moveValidationEnabled: settings.automaticValidation,
      automaticNotesCulling: settings.automaticNotesCulling,
    }
  },

  [Action.SET_MOVE_VALIDATION](state: IState, enableValidation: boolean): IState {
    if (enableValidation === state.moveValidationEnabled) {
      return state
    }

    return {
      ...state,
      moveValidationEnabled: enableValidation,
    }
  },

  [Action.SET_NOTES_CULLING](state: IState, enableCulling: boolean): IState {
    if (enableCulling === state.automaticNotesCulling) {
      return state
    }

    return {
      ...state,
      automaticNotesCulling: enableCulling,
    }
  },

  [Action.CLEAR_LAST_CONFLICTING_VALUE](state: IState): IState {
    return {
      ...state,
      lastConflictingValue: null,
    }
  },
})
