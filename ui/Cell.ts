import {html} from 'lighterhtml'
import {ISudokuMatrixCell} from '../game/state'
import ValuePicker from './ValuePicker'

export default function Cell(
  cell: ISudokuMatrixCell,
  hasValuePicker: boolean,
  onShowValuePicker: () => void,
  onCellValueToggled: (cell: ISudokuMatrixCell, toggledValue: number) => void,
) {
  return html`
    <sudoku-cell>
      ${cell.value ?
        cell.value
      :
        html`
          <button onclick=${onShowValuePicker}>
            &nbsp;
          </button>
          ${hasValuePicker ?
            ValuePicker(
              [...new Array(9)].map((_, index) => cell.userMarkedOptions.includes(index + 1)),
              onCellValueToggled.bind(null, cell),
            )
          :
            null
          }
        `
      }
    </sudoku-cell>
  `
}
