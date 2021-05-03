import {combineReducers} from 'redux'
import createReducer from 'redux-create-fsa-reducer'
import {Action} from '../../game/Action'
import gameReducer from '../../game/reducer'
import {AppAction, IShowDialogPayload} from './Action'
import {InputMode} from './blocks/InputModeSwitch'
import {DEFAULT_APP_STATE, IAppState, IState, IThemeConfiguration} from './state'
import {HighScores} from './storage/HighScoreStorage'
import {ISettings} from './storage/SettingsStorage'

const appReducer = createReducer<IAppState, any>(DEFAULT_APP_STATE, {
  [Action.NEW_GAME](state: IAppState): IAppState {
    return {
      ...state,
      inputMode: DEFAULT_APP_STATE.inputMode,
    }
  },

  [AppAction.SET_INPUT_MODE](state: IAppState, inputMode: InputMode): IAppState {
    return {
      ...state,
      inputMode,
    }
  },

  [AppAction.SHOW_DIALOG](state: IAppState, payload: IShowDialogPayload): IAppState {
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
})

export default combineReducers<IState>({
  app: appReducer,
  game: gameReducer,
})
