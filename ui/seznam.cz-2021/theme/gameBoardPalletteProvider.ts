import lightBluePallette from './gameBoardPallette/lightBlue'
import lightCyanPallette from './gameBoardPallette/lightCyan'
import lightGreenPallette from './gameBoardPallette/lightGreen'
import lightGrayPallette from './gameBoardPallette/lightGrey'
import lightPinkPallette from './gameBoardPallette/lightPink'
import lightRedPallette from './gameBoardPallette/lightRed'
import lightTurquoisePallette from './gameBoardPallette/lightTurquoise'
import lightVioletPallette from './gameBoardPallette/lightViolet'
import lightYellowPallette from './gameBoardPallette/lightYellow'
import IGameBoardPallette from './IGameBoardPallette'
import PrimaryColor from './PrimaryColor'
import Theme from './Theme'

export default function gameBoardPalletteProvider(theme: Theme, primaryColor: PrimaryColor): IGameBoardPallette {
  switch (theme) {
    case Theme.LIGHT:
      switch (primaryColor) {
        case PrimaryColor.BLUE:
          return lightBluePallette
        case PrimaryColor.CYAN:
          return lightCyanPallette
        case PrimaryColor.GREEN:
          return lightGreenPallette
        case PrimaryColor.GREY:
          return lightGrayPallette
        case PrimaryColor.PINK:
          return lightPinkPallette
        case PrimaryColor.RED:
          return lightRedPallette
        case PrimaryColor.TURQUOISE:
          return lightTurquoisePallette
        case PrimaryColor.VIOLET:
          return lightVioletPallette
        case PrimaryColor.YELLOW:
          return lightYellowPallette
        default:
          throw new Error(`Unknown primary color was provided: ${primaryColor}`)
      }
    default:
      throw new Error(`Unknown theme was provided: ${theme}`)
  }
}
