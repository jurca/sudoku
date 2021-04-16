import {createElement} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {setMoveValidation} from './game/Action'
import {highScoresUpdated, settingsChanged} from './ui/seznam.cz-2021/Action'
import App from './ui/seznam.cz-2021/App'
import highScoresContext from './ui/seznam.cz-2021/app/highScoresContext'
import settingsContext from './ui/seznam.cz-2021/app/settingsContext'
import HighScoreStorage from './ui/seznam.cz-2021/storage/HighScoreStorage'
import primaryStorageFactory from './ui/seznam.cz-2021/storage/primaryStorageFactory'
import SettingsStorage from './ui/seznam.cz-2021/storage/SettingsStorage'
import storeFactory from './ui/seznam.cz-2021/storeFactory'

const UI_CONTAINER_ID = 'app'
const STORAGE_KEY_PREFIX = 'io.github.jurca/sudoku/seznam.cz-2021/'

addEventListener('DOMContentLoaded', async () => {
  const appRoot = document.getElementById(UI_CONTAINER_ID)
  if (!appRoot) {
    throw new Error('Cannot find the app container element')
  }

  const store = storeFactory()

  const storage = primaryStorageFactory(STORAGE_KEY_PREFIX)
  const settingsStorage = new SettingsStorage(storage)
  settingsStorage.addObserver((newSettings) => {
    store.dispatch(settingsChanged(newSettings))
    store.dispatch(setMoveValidation(newSettings.automaticValidation))
  })
  const highScoresStorage = new HighScoreStorage(storage)
  highScoresStorage.addObserver((newHighScores) => {
    store.dispatch(highScoresUpdated(newHighScores))
  })

  const settings = await settingsStorage.get()
  store.dispatch(settingsChanged(settings))

  render(
    createElement(settingsContext.Provider, {value: settingsStorage},
      createElement(highScoresContext.Provider, {value: highScoresStorage},
        createElement(Provider, {store},
          createElement(App),
        ),
      ),
    ),
    appRoot,
  )
})
