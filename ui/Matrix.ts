import classnames from 'classnames'
import {html} from 'lighterhtml'
import {matrixSelector} from '../game/selectors'
import {IState} from '../game/state'
import Cell from './Cell'
import styles from './matrix.css'

export default function Matrix(state: IState) {
  const matrix = matrixSelector(state)

  return html`
    <sudoku-matrix>
      <table class=${styles.matrix}>
        <tbody>
          ${matrix.map((row, rowIndex) => html`
            <tr>
              ${row.map((cellValue, cellIndex) => html`
                <td class=${classnames(
                  styles.cell,
                  cellIndex % 3 === 2 && cellIndex !== row.length - 1 && styles.verticalSeparator,
                  rowIndex % 3 === 2 && rowIndex !== matrix.length && styles.horizontalSeparator,
                )}>
                  ${Cell(cellValue)}
                </td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
    </sudoku-matrix>
  `
}
