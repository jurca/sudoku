import {augmentor, useRef, useState} from 'dom-augmentor'
import {html} from 'lighterhtml'
import {Dispatch} from 'redux'
import Difficulty from '../../conf/Difficulty'
import * as actions from '../../game/Action'
import {difficultySelector} from '../../game/selectors'
import {IState} from '../../game/state'
import styles from './app.css'
import Matrix from './Matrix'

export default augmentor(function App(state: IState, dispatch: Dispatch<actions.ActionType>) {
  const difficulty = difficultySelector(state)
  const difficultyChoiceRef = useRef<HTMLParagraphElement>(null)
  const [entryMode, setEntryMode] = useState(actions.ValueEntryMode.SET_VALUE)

  return html`
    <sudoku-app>
      <p ref=${difficultyChoiceRef}>
        Difficulty:
        <label>
          <input type="radio" name="difficulty" value="${Difficulty.EASY}" checked=${difficulty === Difficulty.EASY}>
          easy
        </label>
        <label>
          <input type="radio" name="difficulty" value="${Difficulty.MEDIUM}" checked=${difficulty === Difficulty.MEDIUM}>
          medium
        </label>
        <label>
          <input type="radio" name="difficulty" value="${Difficulty.HARD}" checked=${difficulty === Difficulty.HARD}>
          hard
        </label>
      </p>
      <button onclick=${onNewGame}>
        Start new game
      </button>

      <p>
        Mode:
        <label>
          <input
            type="radio"
            name="mode"
            value=${actions.ValueEntryMode.SET_VALUE}
            checked=${entryMode === actions.ValueEntryMode.SET_VALUE}
            onchange=${onSetEntryMode}
          >
          Entry
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value=${actions.ValueEntryMode.MAKE_NOTE}
            checked=${entryMode === actions.ValueEntryMode.MAKE_NOTE}
            onchange=${onSetEntryMode}
          >
          Notes
        </label>
      </p>

      <div class=${styles.matrixWrapper}>
        ${Matrix(state, entryMode, dispatch)}
      </div>
    </sudoku-app>
  `

  function onNewGame(): void {
    const selectedDifficulty = difficultyChoiceRef.current?.querySelector(':checked')
    if (selectedDifficulty instanceof HTMLInputElement) {
      dispatch(actions.newGame(selectedDifficulty.value as Difficulty) )
    }
  }

  function onSetEntryMode(event: Event): void {
    const input = event.target
    const value = input && (input as any).value
    if (Object.values(actions.ValueEntryMode).includes(value)) {
      setEntryMode(value)
    }
  }
})
