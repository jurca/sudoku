import {html} from 'lighterhtml'

export default function ValuePicker(selectedValues: boolean[]) {
  return html`
    <sudoku-value-picker>
      ${selectedValues.map((_isSelected, index) => html`
        <button>
          ${index + 1}
        </button>
      `)}
    </sudoku-value-picker>
  `
}
