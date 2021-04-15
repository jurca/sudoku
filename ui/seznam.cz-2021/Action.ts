import {Action as ReduxActionType} from 'redux'
import { createAction } from 'redux-actions'
import {ActionType as GameActionType} from '../../game/Action'
import Dialog from './dialog/Dialog'

export enum AppAction {
  SHOW_DIALOG = 'AppAction.SHOW_DIALOG',
  LEAVE_DIALOG = 'AppAction.LEAVE_DIALOG',
  CLOSE_DIALOGS = 'AppAction.CLOSE_DIALOGS',
}

export type ActionType = GameActionType | ReduxActionType<AppAction>

export interface IShowDialogPayload {
  readonly dialog: Dialog
  readonly stack: boolean
}

export const showDialog = mkActionFactory<IShowDialogPayload>(AppAction.SHOW_DIALOG)
export const leaveDialog = mkActionFactory<void>(AppAction.LEAVE_DIALOG)
export const closeDialogs = mkActionFactory<void>(AppAction.CLOSE_DIALOGS)

function mkActionFactory<Payload>(type: AppAction) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
