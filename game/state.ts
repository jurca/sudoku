import {SudokuSolver} from '@jlguenego/sudoku-generator'
import Difficulty, {DIFFICULTY_TO_CARVED_NUMBERS} from '../conf/Difficulty'

type SudokuMatrixRow = [number, number, number, number, number, number, number, number, number]
type SudokuMatrix = [
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
}

export const DEFAULT_STATE: IState = {
  difficulty: Difficulty.MEDIUM,
  gameStart: performance.now(),
  matrix: SudokuSolver.carve(SudokuSolver.generate(), DIFFICULTY_TO_CARVED_NUMBERS[Difficulty.MEDIUM]),
}
