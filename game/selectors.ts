import {IState} from './state'

export const difficultySelector = (globalState: IState) => globalState.difficulty
export const matrixSelector = (globalState: IState) => globalState.matrix
export const valuePickerOpenAtSelector = (globalState: IState) => globalState.valuePickerOpenAt
