import ColorAnimation from './ColorAnimation'
import IGameBoardColors from './IGameBoardColors'

type IGameBoardColorAnimations = { // We are using type instead of interface due to the "value in enum" clause below
  readonly [animationName in ColorAnimation]: {
    readonly [step: string]:
      readonly ['matrix', keyof IGameBoardColors['matrix']] |
      readonly ['inputKeyboard', keyof IGameBoardColors['inputKeyboard']] |
      readonly ['inputModeSwitch', keyof IGameBoardColors['inputModeSwitch']]
  }
}

export default IGameBoardColorAnimations
