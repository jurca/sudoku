import {html} from 'lighterhtml'
import {ISudokuMatrixCell} from '../game/state'
import ValuePicker from './ValuePicker'

export default function Cell(cell: ISudokuMatrixCell, hasValuePicker: boolean, onShowValuePicker: () => void) {
  return html`
    <sudoku-cell>
      ${cell.value ?
        cell.value
      :
        html`
          <button onclick=${onShowValuePicker}>
          </button>
          ${hasValuePicker ?
            ValuePicker(
              [...new Array(9)].map((_, index) => cell.userMarkedOptions.includes(index + 1)),
            )
          :
            null
          }
        `
      }
    </sudoku-cell>
  `
}
