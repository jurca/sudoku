import {Action as ReduxActionType} from 'redux'
import { createAction } from 'redux-actions'
import {ActionType as GameActionType} from '../../game/Action'

export enum AppAction {
  OPEN_HELP_DIALOG = 'AppAction.OPEN_HELP_DIALOG',
  OPEN_NEW_GAME_DIALOG = 'AppAction.OPEN_NEW_GAME_DIALOG',
  OPEN_SETTINGS_DIALOG = 'AppAction.OPEN_SETTINGS_DIALOG',
}

export type ActionType = GameActionType | ReduxActionType<AppAction>

export const openHelpDialog = mkActionFactory<void>(AppAction.OPEN_HELP_DIALOG)
export const openNewGameDialog = mkActionFactory<void>(AppAction.OPEN_NEW_GAME_DIALOG)
export const openSettingsDialog = mkActionFactory<void>(AppAction.OPEN_SETTINGS_DIALOG)

function mkActionFactory<Payload>(type: AppAction) {
  return createAction<Payload>(type) as (payload: Payload) => ActionType
}
