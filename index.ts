import {createElement} from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {setMoveValidation, setNotesCulling} from './game/Action'
import {AppAction, highScoresUpdated, settingsChanged, setUserAuthenticationStatus, statisticsUpdated} from './ui/seznam.cz-2021/Action'
import App from './ui/seznam.cz-2021/App'
import highScoresContext from './ui/seznam.cz-2021/app/highScoresContext'
import settingsContext from './ui/seznam.cz-2021/app/settingsContext'
import HighScoreStorage from './ui/seznam.cz-2021/storage/HighScoreStorage'
import primaryStorageFactory from './ui/seznam.cz-2021/storage/primaryStorageFactory'
import SettingsStorage from './ui/seznam.cz-2021/storage/SettingsStorage'
import storeFactory from './ui/seznam.cz-2021/storeFactory'
import * as sbrowserApis from './sbrowserGamesApi'
import {sessionStatisticsSelector} from './ui/seznam.cz-2021/selectors'
import StatisticsStorage from './ui/seznam.cz-2021/storage/StatisticsStorage'

const UI_CONTAINER_ID = 'app'
const STORAGE_KEY_PREFIX = 'io.github.jurca/sudoku/seznam.cz-2021/'
const GAME_ID = 'sudoku'
const USER_SIGNED_IN_CHECK_TIMEOUT = 1_000 // 1 second

let isLeavingApp = false

addEventListener('DOMContentLoaded', async () => {
  const appRoot = document.getElementById(UI_CONTAINER_ID)
  if (!appRoot) {
    throw new Error('Cannot find the app container element')
  }

  const store = storeFactory((state, action, appReducer) => {
    if (!isLeavingApp && action.type === AppAction.LEAVE_GAME) {
      isLeavingApp = true
      const statistics = sessionStatisticsSelector(state)
      sbrowserApis.gamesExit(GAME_ID, statistics.newGames, statistics.wonGames)
      location.href = 'menu.html'
    }

    return appReducer(state, action)
  })

  const storage = primaryStorageFactory(STORAGE_KEY_PREFIX)
  const settingsStorage = new SettingsStorage(storage)
  settingsStorage.addObserver((newSettings) => {
    store.dispatch(settingsChanged(newSettings))
    store.dispatch(setMoveValidation(newSettings.automaticValidation))
    store.dispatch(setNotesCulling(newSettings.automaticNotesCulling))
  })
  const highScoresStorage = new HighScoreStorage(storage)
  highScoresStorage.addObserver((newHighScores) => {
    store.dispatch(highScoresUpdated(newHighScores))
  })

  const statisticsStorage = new StatisticsStorage(storage)
  store.dispatch(statisticsUpdated({
    statistics: await statisticsStorage.get(),
    storage: statisticsStorage,
  }))

  const settings = await settingsStorage.get()
  store.dispatch(settingsChanged(settings))

  try {
    const isSignedIn = await Promise.race([
      sbrowserApis.isSignedIn(),
      new Promise<never>(
        (_, reject) => setTimeout(reject, USER_SIGNED_IN_CHECK_TIMEOUT, new Error('Sign-in check timed out')),
      ),
    ])
    store.dispatch(setUserAuthenticationStatus(isSignedIn))
  } catch {}

  addEventListener('beforeunload', () => {
    if (!isLeavingApp) {
      isLeavingApp = true
      const statistics = sessionStatisticsSelector(store.getState())
      sbrowserApis.gamesExit(GAME_ID, statistics.newGames, statistics.wonGames)
    }
  })

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
