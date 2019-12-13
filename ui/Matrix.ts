import {html} from 'lighterhtml'
import {matrixSelector} from '../game/selectors'
import {IState} from '../game/state'
import Cell from './Cell'

export default function Matrix(state: IState) {
  const matrix = matrixSelector(state)

  return html`
    <sudoku-matrix>
      <table>
        <tbody>
          ${matrix.map((row) => html`
            <tr>
              ${row.map((cellValue) => html`
                <td>
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
