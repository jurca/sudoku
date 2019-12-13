import {SudokuSolver} from '@jlguenego/sudoku-generator'
import createReducer from 'redux-create-fsa-reducer'
import Difficulty, {DIFFICULTY_TO_CARVED_NUMBERS} from '../conf/Difficulty'
import {Action} from './Action'
import {DEFAULT_STATE, IState} from './state'

export default createReducer<IState, any>(DEFAULT_STATE, {
  [Action.NEW_GAME](state: IState, difficulty: Difficulty): IState {
    const matrix = SudokuSolver.carve(SudokuSolver.generate(), DIFFICULTY_TO_CARVED_NUMBERS[difficulty])
    return {
      ...state,
      difficulty,
      gameStart: performance.now(),
      matrix,
    }
  },
})
