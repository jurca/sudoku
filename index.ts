import {createElement} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './ui/seznam.cz-2021/App'
import storeFactory from './ui/seznam.cz-2021/storeFactory'

addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app')
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
