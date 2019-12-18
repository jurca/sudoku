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

export interface IState {
  readonly difficulty: Difficulty,
  readonly gameStart: number,
  readonly matrix: SudokuMatrix,
  readonly valuePickerOpenAt: null | readonly [number, number]
}

export const DEFAULT_STATE: IState = {
  difficulty: Difficulty.MEDIUM,
  gameStart: performance.now(),
  matrix: createGame(Difficulty.MEDIUM),
  valuePickerOpenAt: null,
}
