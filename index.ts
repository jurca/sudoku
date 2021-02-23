import {render} from 'lighterhtml'
import {Dispatch} from 'redux'
import {ActionType} from './game/Action'
import {IState} from './game/state'
import storeFactory from './game/storeFactory'
import App from './ui/prototype/App'

const appRoot = document.getElementById('app')!
const store = storeFactory()

renderUI(appRoot, store.getState(), store.dispatch)
store.subscribe(() => {
  renderUI(appRoot, store.getState(), store.dispatch)
})

function renderUI(uiRoot: HTMLElement, state: IState, dispatch: Dispatch<ActionType>): void {
  render(uiRoot, App(state, dispatch))
}
