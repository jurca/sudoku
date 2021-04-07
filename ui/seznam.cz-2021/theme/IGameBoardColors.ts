import IGameBoardColorMapping from './IGameBoardColorMapping'

export default interface IGameBoardColors {
  readonly matrix: {
    readonly [key in keyof IGameBoardColorMapping['matrix']]: string
  }
  readonly inputKeyboard: {
    readonly [key in keyof IGameBoardColorMapping['inputKeyboard']]: string
  }
  readonly inputModeSwitch: {
    readonly [key in keyof IGameBoardColorMapping['inputModeSwitch']]: string
  }
}
