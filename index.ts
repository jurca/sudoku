import {createElement} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './ui/seznam.cz-2021/App'
import storeFactory from './ui/seznam.cz-2021/storeFactory'

const UI_CONTAINER_ID = 'app'

addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById(UI_CONTAINER_ID)
  if (!appRoot) {
    throw new Error('Cannot find the app container element')
  }

  const store = storeFactory()

  render(
    createElement(Provider, {store},
      createElement(App),
    ),
    appRoot,
  )
})
