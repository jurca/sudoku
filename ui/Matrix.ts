import classnames from 'classnames'
import {html} from 'lighterhtml'
import {Dispatch} from 'redux'
import * as actions from '../game/Action'
import {matrixSelector, valuePickerOpenAtSelector} from '../game/selectors'
import {IState} from '../game/state'
import Cell from './Cell'
import styles from './matrix.css'

export default function Matrix(state: IState, dispatch: Dispatch<actions.ActionType>) {
  const matrix = matrixSelector(state)
  const valuePickerCoordinates = valuePickerOpenAtSelector(state) || [-1, -1]
  const [valuePickerX, valuePickerY] = valuePickerCoordinates

  return html`
    <sudoku-matrix>
      <table class=${styles.matrix}>
        <tbody>
          ${matrix.map((row, rowIndex) => html.for(row)`
            <tr>
              ${row.map((cell, columnIndex) => html.for(cell)`
                <td class=${classnames(
                  styles.cell,
                  columnIndex % 3 === 2 && columnIndex !== row.length - 1 && styles.verticalSeparator,
                  rowIndex % 3 === 2 && rowIndex !== matrix.length && styles.horizontalSeparator,
                )}>
                  ${Cell(
                    cell,
                    columnIndex === valuePickerX && rowIndex === valuePickerY,
                    onShowValuePicker.bind(null, columnIndex, rowIndex),
                  )}
                </td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
    </sudoku-matrix>
  `

  function onShowValuePicker(x: number, y: number) {
    dispatch(actions.showValuePicker([x, y]))
  }
}
