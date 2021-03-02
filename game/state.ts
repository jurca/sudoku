import Difficulty from '../conf/Difficulty'
import createGame from './gameGenerator'

export interface ISudokuMatrixCell {
  readonly initialValue: null | number
  readonly value: null | number
  readonly userMarkedOptions: number[]
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
  readonly matrix: SudokuMatrix
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly valuePickerOpenAt: null | {readonly row: number, readonly column: number}
}

export const DEFAULT_STATE: IState = {
  breaks: [],
  difficulty: Difficulty.MEDIUM,
  gameStart: {
    absoluteTimestamp: Date.now(),
    logicalTimestamp: performance.now(),
  },
  matrix: createGame(Difficulty.MEDIUM),
  valuePickerOpenAt: null,
}
