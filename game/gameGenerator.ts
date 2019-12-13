import {SudokuSolver} from '@jlguenego/sudoku-generator'
import Difficulty, {DIFFICULTY_TO_CARVED_NUMBERS} from '../conf/Difficulty'
import {SudokuMatrix} from './state'

export default function createGame(difficulty: Difficulty): SudokuMatrix {
  const initialValues = SudokuSolver.carve(SudokuSolver.generate(), DIFFICULTY_TO_CARVED_NUMBERS[difficulty])
  return initialValues.map((row: [number, number, number, number, number, number, number, number, number]) =>
    row.map((initialValue) => ({
      initialValue,
      userMarkedOptions: [],
      value: initialValue,
    })),
  )
}
