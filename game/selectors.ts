import {createSelector} from 'reselect'
import {IState, ISudokuMatrixCell, SudokuMatrix, SudokuMatrixNotes, SudokuMatrixRow, SudokuMatrixState} from './state'
import {isComplete} from './util'

export const difficultySelector = (globalState: IState) => globalState.difficulty
export const matrixStateSelector = (globalState: IState): SudokuMatrixState => globalState.matrix
export const matrixNotesSelector = (globalState: IState): SudokuMatrixNotes => globalState.notes
export const valuePickerOpenAtSelector = (globalState: IState) => globalState.valuePickerOpenAt
export const gameEndSelector = (globalState: IState) => globalState.gameEnd
export const moveValidationEnabledSelector = (globalState: IState) => globalState.moveValidationEnabled

export const matrixSelector = createSelector(
  matrixStateSelector,
  matrixNotesSelector,
  (state, notes): SudokuMatrix => {
    return state.map(
      (row, rowIndex) => row.map(
        (cell, cellIndex) => ({...cell, ...notes[rowIndex][cellIndex]}),
      ) as unknown as SudokuMatrixRow,
    ) as unknown as SudokuMatrix
  },
)

type MatrixCellBlock = readonly [
  readonly [ISudokuMatrixCell, ISudokuMatrixCell, ISudokuMatrixCell],
  readonly [ISudokuMatrixCell, ISudokuMatrixCell, ISudokuMatrixCell],
  readonly [ISudokuMatrixCell, ISudokuMatrixCell, ISudokuMatrixCell],
]

export type HierarchicalMatrix = readonly [
  readonly [MatrixCellBlock, MatrixCellBlock, MatrixCellBlock],
  readonly [MatrixCellBlock, MatrixCellBlock, MatrixCellBlock],
  readonly [MatrixCellBlock, MatrixCellBlock, MatrixCellBlock],
]

export const hierarchicalCellsSelector = createSelector(
  matrixSelector,
  createHierarchicalCellMatrix,
)

export const isGameWonSelector = createSelector(
  matrixStateSelector,
  isComplete,
)

export function createHierarchicalCellMatrix(plainMatrix: SudokuMatrix): HierarchicalMatrix {
  const hierarchicalMatrix: ISudokuMatrixCell[][][][] = [
    [],
    [],
    [],
  ]
  for (let rowIndex = 0; rowIndex < plainMatrix.length; rowIndex++) {
    const row = plainMatrix[rowIndex]
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      const blockRow = Math.floor(rowIndex / 3)
      const blockColumn = Math.floor(cellIndex / 3)
      const block: ISudokuMatrixCell[][] = hierarchicalMatrix[blockRow][blockColumn] || []
      hierarchicalMatrix[blockRow][blockColumn] = block

      if (!block[rowIndex % 3]) {
        block[rowIndex % 3] = []
      }
      block[rowIndex % 3][cellIndex % 3] = row[cellIndex]
    }
  }
  return hierarchicalMatrix as unknown as HierarchicalMatrix
}
