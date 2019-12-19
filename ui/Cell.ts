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
  const expandedNotes = [...new Array(9)].map((_, index) => cell.userMarkedOptions.includes(index + 1))

  return html`
    <sudoku-cell class=${styles.cell}>
      ${cell.initialValue ?
        cell.initialValue
      :
        html`
          <button class=${styles.cellButton} onclick=${onShowValuePicker}>${cell.value ?
            cell.value
          :
            ''
          }</button>
          ${hasValuePicker ?
            ValuePicker(
              expandedNotes,
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
