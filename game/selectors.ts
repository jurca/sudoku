import {createSelector} from 'reselect'
import {IState, ISudokuMatrixCell} from './state'

export const difficultySelector = (globalState: IState) => globalState.difficulty
export const matrixSelector = (globalState: IState) => globalState.matrix
export const valuePickerOpenAtSelector = (globalState: IState) => globalState.valuePickerOpenAt

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
  (matrix): HierarchicalMatrix => {
    const hierarchicalMatrix: ISudokuMatrixCell[][][][] = [
      [],
      [],
      [],
    ]
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex]
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
  },
)
