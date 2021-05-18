import {Action as ReduxActionType} from 'redux'
import {createAction} from 'redux-actions'
import {ActionType as GameActionType} from '../../game/Action'
import {InputMode} from './blocks/InputModeSwitch'
import Dialog from './dialog/Dialog'
import {IThemeConfiguration} from './state'
import {HighScores} from './storage/HighScoreStorage'
import {ISettings} from './storage/SettingsStorage'
import StatisticsStorage, {IStatistics} from './storage/StatisticsStorage'

export enum AppAction {
  SET_INPUT_MODE = 'AppAction.SET_INPUT_MODE',
  SHOW_DIALOG = 'AppAction.SHOW_DIALOG',
  LEAVE_DIALOG = 'AppAction.LEAVE_DIALOG',
  CLOSE_DIALOGS = 'AppAction.CLOSE_DIALOGS',
  SETTINGS_CHANGED = 'AppAction.SETTINGS_CHANGED',
  SET_THEME_PREVIEW = 'AppAction.SET_THEME_PREVIEW',
  HIGH_SCORES_UPDATED = 'AppAction.HIGH_SCORES_UPDATED',
  GAME_WON = 'AppAction.GAME_WON',
  STATISTICS_UPDATED = 'AppAction.STATISTICS_UPDATED',
  SET_USER_AUTHENTICATION_STATUS = 'AppAction.SET_USER_AUTHENTICATION_STATUS',
  SIGN_IN = 'AppAction.SIGN_IN',
  LEAVE_GAME = 'AppAction.LEAVE_GAME',
}

export type ActionType = GameActionType | ReduxActionType<AppAction>

export interface IShowDialogPayload {
  readonly dialog: Dialog
  readonly stack: boolean
}

export interface IStatisticsUpdate {
  readonly statistics: IStatistics
  readonly storage: StatisticsStorage
}

export const setInputMode = mkActionFactory<InputMode>(AppAction.SET_INPUT_MODE)
export const showDialog = mkActionFactory<IShowDialogPayload>(AppAction.SHOW_DIALOG)
export const leaveDialog = mkActionFactory<void>(AppAction.LEAVE_DIALOG)
export const closeDialogs = mkActionFactory<void>(AppAction.CLOSE_DIALOGS)
export const settingsChanged = mkActionFactory<ISettings>(AppAction.SETTINGS_CHANGED)
export const setThemePreview = mkActionFactory<IThemeConfiguration>(AppAction.SET_THEME_PREVIEW)
export const highScoresUpdated = mkActionFactory<HighScores>(AppAction.HIGH_SCORES_UPDATED)
export const gameWon = mkActionFactory<void>(AppAction.GAME_WON)
export const statisticsUpdated = mkActionFactory<IStatisticsUpdate>(AppAction.STATISTICS_UPDATED)
export const setUserAuthenticationStatus = mkActionFactory<boolean>(AppAction.SET_USER_AUTHENTICATION_STATUS)
export const leaveGame = mkActionFactory<void>(AppAction.LEAVE_GAME)
export const signIn = mkActionFactory<void>(AppAction.SIGN_IN)

function mkActionFactory<Payload>(type: AppAction) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
