import {Action as ReduxActionType} from 'redux'
import { createAction } from 'redux-actions'
import {ActionType as GameActionType} from '../../game/Action'
import Dialog from './dialog/Dialog'

export enum AppAction {
  OPEN_HELP_DIALOG = 'AppAction.OPEN_HELP_DIALOG',
  OPEN_SETTINGS_DIALOG = 'AppAction.OPEN_SETTINGS_DIALOG',
  SHOW_DIALOG = 'AppAction.SHOW_DIALOG',
  LEAVE_DIALOG = 'AppAction.LEAVE_DIALOG',
}

export type ActionType = GameActionType | ReduxActionType<AppAction>

export interface IShowDialogPayload {
  readonly dialog: Dialog
  readonly stack: boolean
}

export const openHelpDialog = mkActionFactory<void>(AppAction.OPEN_HELP_DIALOG)
export const openSettingsDialog = mkActionFactory<void>(AppAction.OPEN_SETTINGS_DIALOG)
export const showDialog = mkActionFactory<IShowDialogPayload>(AppAction.SHOW_DIALOG)
export const leaveDialog = mkActionFactory<void>(AppAction.LEAVE_DIALOG)

function mkActionFactory<Payload>(type: AppAction) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
