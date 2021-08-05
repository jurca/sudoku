import {combineReducers} from 'redux'
import createReducer from 'redux-create-fsa-reducer'
import * as Limits from '../../conf/Limits'
import {Action} from '../../game/Action'
import gameReducer from '../../game/reducer'
import * as sbrowserApis from '../../sbrowserGamesApi'
import {AppAction, IShowDialogPayload, IStatisticsUpdate} from './Action'
import {InputMode} from './blocks/InputModeSwitch'
import Dialog from './dialog/Dialog'
import {DEFAULT_APP_STATE, IAppState, IState, IThemeConfiguration} from './state'
import {HighScores} from './storage/HighScoreStorage'
import {IPausedGame} from './storage/PausedGameStorage'
import {ISettings} from './storage/SettingsStorage'
import StatisticsStorage from './storage/StatisticsStorage'

let statisticsStorage: null | StatisticsStorage = null

const appReducer = createReducer<IAppState, any>(DEFAULT_APP_STATE, {
  [Action.NEW_GAME](state: IAppState): IAppState {
    // This should not happen since we are trying to block the new game dialog in such case, but, just in case...
    if (state.isUserAuthenticated === false && state.statistics.gamesStarted >= Limits.UNAUTHENTICATED_GAMES_LIMIT) {
      return {
        ...state,
        dialogStack: [Dialog.SIGN_IN],
      }
    }

    const result = {
      ...state,
      inputMode: DEFAULT_APP_STATE.inputMode,
      statistics: {
        ...state.statistics,
        gamesStarted: state.statistics.gamesStarted + 1,
      },
      sessionStatistics: {
        ...state.sessionStatistics,
        newGames: state.sessionStatistics.newGames + 1,
      },
    }

    if (statisticsStorage) {
      statisticsStorage.set(result.statistics)
    }

    return result
  },

  [AppAction.SET_INPUT_MODE](state: IAppState, inputMode: InputMode): IAppState {
    return {
      ...state,
      inputMode,
    }
  },

  [AppAction.SHOW_DIALOG](state: IAppState, payload: IShowDialogPayload): IAppState {
    if (
      payload.dialog === Dialog.NEW_GAME &&
      state.isUserAuthenticated === false &&
      (
        state.statistics.gamesStarted === Limits.UNAUTHENTICATED_GAMES_WARNING ||
        state.statistics.gamesStarted >= Limits.UNAUTHENTICATED_GAMES_LIMIT
      )
    ) {
      if (
        state.statistics.gamesStarted < Limits.UNAUTHENTICATED_GAMES_LIMIT && state.dialogStack?.[0] === Dialog.SIGN_IN
      ) {
        // Allow transitioning from the sign-in dialog to the new game dialog if the player has not reached the hard
        // limit yet
        return {
          ...state,
          dialogStack: payload.stack ? state.dialogStack.concat(payload.dialog) : [payload.dialog],
        }
      }

      return {
        ...state,
        dialogStack: [Dialog.SIGN_IN],
      }
    }

    return {
      ...state,
      dialogStack: payload.stack ? state.dialogStack.concat(payload.dialog) : [payload.dialog],
    }
  },

  [AppAction.LEAVE_DIALOG](state: IAppState): IAppState {
    return {
      ...state,
      dialogStack: state.dialogStack.slice(0, -1),
    }
  },

  [AppAction.CLOSE_DIALOGS](state: IAppState): IAppState {
    return {
      ...state,
      dialogStack: [],
    }
  },

  [AppAction.SETTINGS_CHANGED](state: IAppState, settings: ISettings): IAppState {
    return {
      ...state,
      primaryColor: settings.primaryColor,
      theme: settings.theme,
    }
  },

  [AppAction.SET_THEME_PREVIEW](state: IAppState, preview: IThemeConfiguration): IAppState {
    return {
      ...state,
      themePreview: preview,
    }
  },

  [AppAction.HIGH_SCORES_UPDATED](state: IAppState, highScores: HighScores): IAppState {
    return {
      ...state,
      highScores,
    }
  },

  [AppAction.GAME_WON](state: IAppState): IAppState {
    return {
      ...state,
      sessionStatistics: {
        ...state.sessionStatistics,
        wonGames: state.sessionStatistics.wonGames + 1,
      },
    }
  },

  [AppAction.STATISTICS_UPDATED](state: IAppState, statistics: IStatisticsUpdate): IAppState {
    statisticsStorage = statistics.storage
    return {
      ...state,
      statistics: statistics.statistics,
    }
  },

  [AppAction.SET_USER_AUTHENTICATION_STATUS](state: IAppState, isAuthenticated: boolean): IAppState {
    if (!statisticsStorage) {
      throw new Error('The statistics storage must be configured before the user status is determined')
    }

    const patchedState: IAppState = {
      ...state,
      isUserAuthenticated: isAuthenticated,
    }

    if (
      !isAuthenticated &&
      (
        state.statistics.gamesStarted === Limits.UNAUTHENTICATED_GAMES_WARNING ||
        state.statistics.gamesStarted >= Limits.UNAUTHENTICATED_GAMES_LIMIT
      )
    ) {
      return {
        ...patchedState,
        dialogStack: [Dialog.SIGN_IN],
      }
    }

    return patchedState
  },

  [AppAction.SIGN_IN](state: IAppState): IAppState {
    sbrowserApis.openLoginForm()

    return state
  },

  [Action.RESTORE_PAUSED_GAME](state: IAppState, pausedGame: IPausedGame): IAppState {
    return {
      ...state,
      inputMode: pausedGame.inputMode,
      dialogStack: [Dialog.PAUSE],
    }
  },
})

export default combineReducers<IState>({
  app: appReducer,
  game: gameReducer,
})
