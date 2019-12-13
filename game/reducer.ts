import createReducer from 'redux-create-fsa-reducer'
import Difficulty from '../conf/Difficulty'
import {Action} from './Action'
import createGame from './gameGenerator'
import {DEFAULT_STATE, IState} from './state'

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
})
