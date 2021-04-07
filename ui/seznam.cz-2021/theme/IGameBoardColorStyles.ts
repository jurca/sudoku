import IGameBoardColors from './IGameBoardColors'

export default interface IGameBoardColorStyles {
  readonly [cssSelector: string]:
    readonly ['matrix', keyof IGameBoardColors['matrix']] |
    readonly ['inputKeyboard', keyof IGameBoardColors['inputKeyboard']] |
    readonly ['inputModeSwitch', keyof IGameBoardColors['inputModeSwitch']]
}
