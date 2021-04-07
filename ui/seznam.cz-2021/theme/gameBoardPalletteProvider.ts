import lightRedPallette from './gameBoardPallette/lightRed'
import IGameBoardPallette from './IGameBoardPallette'
import PrimaryColor from './PrimaryColor'
import Theme from './Theme'

export default function gameBoardPalletteProvider(theme: Theme, primaryColor: PrimaryColor): IGameBoardPallette {
  switch (theme) {
    case Theme.LIGHT:
      switch (primaryColor) {
        case PrimaryColor.RED:
          return lightRedPallette
        default:
          throw new Error(`Unknown primary color was provided: ${primaryColor}`)
      }
    default:
      throw new Error(`Unknown theme was provided: ${theme}`)
  }
}
