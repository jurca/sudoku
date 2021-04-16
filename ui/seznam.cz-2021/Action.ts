import {Action as ReduxActionType} from 'redux'
import {createAction} from 'redux-actions'
import {ActionType as GameActionType} from '../../game/Action'
import Dialog from './dialog/Dialog'
import {IThemeConfiguration} from './state'
import {HighScores} from './storage/HighScoreStorage'
import {ISettings} from './storage/SettingsStorage'

export enum AppAction {
  SHOW_DIALOG = 'AppAction.SHOW_DIALOG',
  LEAVE_DIALOG = 'AppAction.LEAVE_DIALOG',
  CLOSE_DIALOGS = 'AppAction.CLOSE_DIALOGS',
  SETTINGS_CHANGED = 'AppAction.SETTINGS_CHANGED',
  SET_THEME_PREVIEW = 'AppAction.SET_THEME_PREVIEW',
  HIGH_SCORES_UPDATED = 'AppAction.HIGH_SCORES_UPDATED',
}

export type ActionType = GameActionType | ReduxActionType<AppAction>

export interface IShowDialogPayload {
  readonly dialog: Dialog
  readonly stack: boolean
}

export const showDialog = mkActionFactory<IShowDialogPayload>(AppAction.SHOW_DIALOG)
export const leaveDialog = mkActionFactory<void>(AppAction.LEAVE_DIALOG)
export const closeDialogs = mkActionFactory<void>(AppAction.CLOSE_DIALOGS)
export const settingsChanged = mkActionFactory<ISettings>(AppAction.SETTINGS_CHANGED)
export const setThemePreview = mkActionFactory<IThemeConfiguration>(AppAction.SET_THEME_PREVIEW)
export const highScoresUpdated = mkActionFactory<HighScores>(AppAction.HIGH_SCORES_UPDATED)

function mkActionFactory<Payload>(type: AppAction) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
