import {IMatrixCoordinates, ISudokuMatrixCellState, SudokuMatrixState} from './state'

export interface IHint {
  readonly cell: IMatrixCoordinates
  readonly value: number
}

export default function getDeterministicImmediateHints(matrix: SudokuMatrixState): IHint[] {
  const hints: IHint[] = []

  for (let row = 0; row < matrix.length; row++) {
    const cells = matrix[row]
    for (let column = 0; column < cells.length; column++) {
      const cell = cells[column]
      if (cell.value) {
        continue
      }

      const coordinates = {
        column,
        row,
      }
      const relatedCells = getRelatedCells(matrix, coordinates)
      const conflictingValues = new Set(relatedCells.map((relatedCell) => relatedCell.value).filter((value) => value))
      const possibleValues = new Array(9).fill(0).map((_, i) => i + 1).filter((value) => !conflictingValues.has(value))
      if (possibleValues.length === 1) {
        hints.push({
          cell: coordinates,
          value: possibleValues[0],
        })
      }
    }
  }

  return hints
}

function getRelatedCells(matrix: SudokuMatrixState, primaryCell: IMatrixCoordinates): ISudokuMatrixCellState[] {
  const cells = new Set<ISudokuMatrixCellState>()

  for (const cell of matrix[primaryCell.row]) {
    cells.add(cell)
  }
  for (const row of matrix) {
    cells.add(row[primaryCell.column])
  }

  const blockSize = 3
  const blockRow = Math.floor(primaryCell.row / blockSize)
  const blockColumn = Math.floor(primaryCell.column / blockSize)
  for (let row = 0; row < blockSize; row++) {
    for (let column = 0; column < blockSize; column++) {
      cells.add(matrix[blockRow * blockSize + row][blockColumn * blockSize + column])
    }
  }

  cells.delete(matrix[primaryCell.row][primaryCell.column])

  return [...cells]
}
