import {augmentor, useRef} from 'dom-augmentor'
import {html} from 'lighterhtml'
import {Dispatch} from 'redux'
import Difficulty from '../conf/Difficulty'
import * as actions from '../game/Action'
import {difficultySelector} from '../game/selectors'
import {IState} from '../game/state'

export default augmentor(function App(state: IState, dispatch: Dispatch<actions.ActionType>) {
  const difficulty = difficultySelector(state)
  const difficultyChoiceRef = useRef<HTMLInputElement>(null)

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

      ${JSON.stringify(state)}
    </sudoku-app>
  `

  function onNewGame(): void {
    const selectedDifficulty = difficultyChoiceRef.current?.querySelector(':checked')
    if (selectedDifficulty instanceof HTMLInputElement) {
      dispatch(actions.newGame(selectedDifficulty.value as Difficulty) )
    }
  }
})
