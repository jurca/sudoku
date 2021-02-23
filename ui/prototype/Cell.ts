import {html} from 'lighterhtml'
import {ISudokuMatrixCell} from '../../game/state'
import styles from './cell.css'
import ValuePicker from './ValuePicker'

export default function Cell(
  cell: ISudokuMatrixCell,
  hasValuePicker: boolean,
  onShowValuePicker: () => void,
  onCellValueToggled: (cell: ISudokuMatrixCell, toggledValue: null | number) => void,
) {
  const expandedNotes = [...new Array(9)].map((_, index) => cell.userMarkedOptions.includes(index + 1))
  const notesAsGrid = [expandedNotes.slice(0, 3), expandedNotes.slice(3, 6), expandedNotes.slice(6)]

  return html`
    <sudoku-cell class=${styles.cell}>
      ${cell.initialValue ?
        cell.initialValue
      :
        html`
          <button class=${styles.cellButton} onclick=${onShowValuePicker}>${cell.value ?
            cell.value
          :
            html`
              <table class=${styles.noteTableReset}>
                <tbody class=${styles.noteTableReset}>
                  ${notesAsGrid.map((row, rowIndex) => html`
                    <tr class=${styles.noteTableReset}>
                      ${row.map((noteCellSelected, cellIndex) => html`
                        <td class=${styles.noteCell}>
                          <div class=${styles.noteCellContent}>
                            ${noteCellSelected ? cellIndex + rowIndex * 3 + 1 : ''}
                          </div>
                        </td>
                      `)}
                    </tr>
                  `)}
                </tbody>
              </table>
            `
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
