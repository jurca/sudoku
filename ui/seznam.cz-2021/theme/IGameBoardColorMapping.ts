import IGameBoardPallette from './IGameBoardPallette'

export default interface IGameBoardColorMapping {
  readonly matrix: IGameMatrixColorMapping
  readonly inputKeyboard: IInputKeyboardColorMapping
  readonly inputModeSwitch: IInputModeSwitchColorMapping
}

export interface IGameMatrixColorMapping {
  readonly border: keyof IGameBoardPallette
  readonly blockSeparator: keyof IGameBoardPallette
  readonly cellSeparator: keyof IGameBoardPallette
  readonly cellBackground: keyof IGameBoardPallette
  readonly preFilledCellBackground: keyof IGameBoardPallette
  readonly highlightedCellBackground: keyof IGameBoardPallette
  readonly selectedCell: keyof IGameBoardPallette
  readonly cellMatchingSelectedCellBackground: keyof IGameBoardPallette
  readonly cellWithNotesBackground: keyof IGameBoardPallette
  readonly cellContent: keyof IGameBoardPallette
}

export interface IInputKeyboardColorMapping {
  readonly border: keyof IGameBoardPallette
  readonly separator: keyof IGameBoardPallette
  readonly keyBackground: keyof IGameBoardPallette
  readonly activeKeyBackground: keyof IGameBoardPallette
  readonly notesActiveKeyBackground: keyof IGameBoardPallette
  readonly keyContent: keyof IGameBoardPallette
}

export interface IInputModeSwitchColorMapping {
  readonly border: keyof IGameBoardPallette
  readonly optionBackground: keyof IGameBoardPallette
  readonly activeOptionBackground: keyof IGameBoardPallette
  readonly optionContent: keyof IGameBoardPallette
  readonly separator: keyof IGameBoardPallette
}
