import {html} from 'lighterhtml'
import {ISudokuMatrixCell} from '../game/state'
import styles from './cell.css'
import ValuePicker from './ValuePicker'

export default function Cell(
  cell: ISudokuMatrixCell,
  hasValuePicker: boolean,
  onShowValuePicker: () => void,
  onCellValueToggled: (cell: ISudokuMatrixCell, toggledValue: number) => void,
) {
  return html`
    <sudoku-cell class=${styles.cell}>
      ${cell.value ?
        cell.value
      :
        html`
          <button class=${styles.cellButton} onclick=${onShowValuePicker}></button>
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
