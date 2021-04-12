import {createElement} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './ui/seznam.cz-2021/App'
import storeFactory from './ui/seznam.cz-2021/storeFactory'

const appRoot = document.getElementById('app')!
const store = storeFactory()

render(
  createElement(Provider, {store},
    createElement(App),
  ),
  appRoot,
)
