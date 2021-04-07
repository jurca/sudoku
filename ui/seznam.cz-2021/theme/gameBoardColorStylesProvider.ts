import IGameBoardColors from './IGameBoardColors'
import IGameBoardColorStyles from './IGameBoardColorStyles'

export default function gameBoardColorStylesProvider(
  selectorPrefix: string,
  styles: IGameBoardColorStyles,
  colors: IGameBoardColors,
): string {
  return Object.keys(styles).map((selector) => {
    const colorPath = styles[selector]
    const colorGroup = colors[colorPath[0]]
    const color = colorGroup[colorPath[1] as keyof typeof colorGroup]
    return `${selectorPrefix}${selector} {\n  color: ${color};\n}`
  }).join('\n')
}
