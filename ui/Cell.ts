import {html} from 'lighterhtml'

export default function Cell(value: number) {
  return html`
    <sudoku-cell>
      ${value || ''}
    </sudoku-cell>
  `
}
