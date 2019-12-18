import {html} from 'lighterhtml'
import styles from './valuePicker.css'

export default function ValuePicker(selectedValues: boolean[], onValueToggled: (value: number) => void) {
  return html`
    <sudoku-value-picker>
      ${selectedValues.map((isSelected, index) => html`
        <button class=${isSelected ? styles.selected : ''} onclick=${onValueToggled.bind(null, index + 1)}>
          ${index + 1}
        </button>
      `)}
    </sudoku-value-picker>
  `
}
