import classnames from 'classnames'
import {html} from 'lighterhtml'
import styles from './valuePicker.css'

export default function ValuePicker(selectedValues: boolean[], onValueToggled: (value: null | number) => void) {
  return html`
    <sudoku-value-picker class=${styles.valuePicker}>
      ${selectedValues.map((isSelected, index) => html`
        <button
          class=${classnames(
            styles.value,
            isSelected && styles.selected,
          )}
          onclick=${onValueToggled.bind(null, index + 1)}
        >
          ${index + 1}
        </button>
      `)}
      <button onclick=${onValueToggled.bind(null, null)}>
       clear
      </button>
    </sudoku-value-picker>
  `
}
