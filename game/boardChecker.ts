import {ISudokuMatrixCell, SudokuMatrix} from './state'

export function checkBoard(matrix: SudokuMatrix): boolean {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      const {value} = matrix[row][column]
      if (value && !isCellValueAllowed(matrix, row, column, value)) {
        return false
      }
    }
  }

  return true
}

export function isCellValueAllowed(matrix: SudokuMatrix, cellRow: number, cellColumn: number, value: number): boolean {
  const otherRowCells = matrix[cellRow].slice(0, cellColumn).concat(matrix[cellRow].slice(cellColumn + 1))
  const otherColumnCells = matrix.slice(0, cellRow).concat(matrix.slice(cellRow + 1)).map(
    (boardRow) => boardRow[cellColumn],
  )
  const subSquareRow = cellRow - cellRow % 3
  const subSquareColumn = cellColumn - cellColumn % 3
  const otherSubSquareCells: ISudokuMatrixCell[] = []
  for (let row = subSquareRow; row < subSquareRow + 3; row++) {
    for (let column = subSquareColumn; column < subSquareColumn + 3; column++) {
      if (row !== cellRow && column !== cellColumn) {
        otherSubSquareCells.push(matrix[row][column])
      }
    }
  }

  return otherRowCells.concat(otherColumnCells, otherSubSquareCells).every((otherCell) => otherCell.value !== value)
}
