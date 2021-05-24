import Difficulty from '../conf/Difficulty'

export interface ISudokuMatrixCellState {
  readonly initialValue: null | number
  readonly value: null | number
}

export interface ISudokuMatrixCellNotes {
  readonly userMarkedOptions: readonly number[]
}

export interface ISudokuMatrixCell extends ISudokuMatrixCellState, ISudokuMatrixCellNotes {
}

export type SudokuMatrixRow = readonly [
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
  ISudokuMatrixCell,
]
export type SudokuMatrix = readonly [
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
  SudokuMatrixRow,
]

export type SudokuMatrixStateRow = readonly [
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
  ISudokuMatrixCellState,
]
export type SudokuMatrixState = readonly [
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
  SudokuMatrixStateRow,
]

export type SudokuMatrixNotesRow = readonly [
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
  ISudokuMatrixCellNotes,
]
export type SudokuMatrixNotes = readonly [
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
  SudokuMatrixNotesRow,
]

export interface IMatrixCoordinates {
  readonly row: number
  readonly column: number
}

export interface IStartedGamePlayBreak {
  readonly startLogicalTimestamp: number
}

export interface IEndedGamePlayBreak extends IStartedGamePlayBreak {
  readonly endLogicalTimestamp: number
}

export interface IHistoryEntry {
  readonly matrix: SudokuMatrixState
  readonly notes: SudokuMatrixNotes
}

export interface IState {
  readonly difficulty: Difficulty
  readonly gameStart: {
    readonly absoluteTimestamp: number,
    readonly logicalTimestamp: number,
  }
  readonly gameEnd: null | number
  readonly matrix: SudokuMatrixState
  readonly notes: SudokuMatrixNotes
  readonly history: readonly IHistoryEntry[]
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly valuePickerOpenAt: null | IMatrixCoordinates
  readonly moveValidationEnabled: boolean
  readonly usedHints: boolean
}

const emptyCell: ISudokuMatrixCellState = {
  initialValue: null,
  value: null,
}

const emptyStateRow: SudokuMatrixStateRow = [
  emptyCell,
  emptyCell,
  emptyCell,
  emptyCell,
  emptyCell,
  emptyCell,
  emptyCell,
  emptyCell,
  emptyCell,
]

export const EMPTY_MATRIX_STATE: SudokuMatrixState = [
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
  emptyStateRow,
]

const emptyNotes: ISudokuMatrixCellNotes = {
  userMarkedOptions: [],
}

const emptyNotesRow: SudokuMatrixNotesRow = [
  emptyNotes,
  emptyNotes,
  emptyNotes,
  emptyNotes,
  emptyNotes,
  emptyNotes,
  emptyNotes,
  emptyNotes,
  emptyNotes,
]

export const EMPTY_MATRIX_NOTES: SudokuMatrixNotes = [
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
  emptyNotesRow,
]

export const DEFAULT_STATE: IState = {
  breaks: [],
  difficulty: Difficulty.MEDIUM,
  gameEnd: null,
  gameStart: {
    absoluteTimestamp: Date.now(),
    logicalTimestamp: performance.now(),
  },
  history: [],
  matrix: EMPTY_MATRIX_STATE,
  moveValidationEnabled: true,
  notes: EMPTY_MATRIX_NOTES,
  usedHints: false,
  valuePickerOpenAt: null,
}
