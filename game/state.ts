import Difficulty from '../conf/Difficulty'
import createGame from './gameGenerator'

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

export interface IState {
  readonly difficulty: Difficulty
  readonly gameStart: {
    readonly absoluteTimestamp: number,
    readonly logicalTimestamp: number,
  }
  readonly matrix: SudokuMatrixState
  readonly matrixHistory: readonly SudokuMatrixState[]
  readonly notes: SudokuMatrixNotes
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly valuePickerOpenAt: null | IMatrixCoordinates
}

const emptyNotes: ISudokuMatrixCellNotes = {
  userMarkedOptions: [],
}
export const DEFAULT_STATE: IState = {
  breaks: [],
  difficulty: Difficulty.MEDIUM,
  gameStart: {
    absoluteTimestamp: Date.now(),
    logicalTimestamp: performance.now(),
  },
  matrix: createGame(Difficulty.MEDIUM),
  matrixHistory: [],
  notes: [
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
    [emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes, emptyNotes],
  ],
  valuePickerOpenAt: null,
}
