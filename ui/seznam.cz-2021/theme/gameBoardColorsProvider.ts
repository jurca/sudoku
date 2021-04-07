import defaultColorMapping from './defaultGameBoardColorMapping'
import gameBoardPalletteProvider from './gameBoardPalletteProvider'
import IGameBoardColors from './IGameBoardColors'
import IGameBoardPallette from './IGameBoardPallette'
import PrimaryColor from './PrimaryColor'
import Theme from './Theme'

export default function gameBoardColorsProvider(theme: Theme, primaryColor: PrimaryColor): IGameBoardColors {
  const pallette = gameBoardPalletteProvider(theme, primaryColor)
  return fromEntries(objectEntries(defaultColorMapping as {[key: string]: any}).map(
    ([component, colorMapping]) => [
      component,
      fromEntries(objectEntries(colorMapping).map(
        ([property, colorName]) => [property, pallette[colorName as keyof IGameBoardPallette]],
      )),
    ],
  )) as unknown as IGameBoardColors
}

function objectEntries<T>(obj: {[s: string]: T}): Array<[string, T]> {
  return Object.keys(obj).map((key) => [key, (obj as any)[key]])
}

function fromEntries<T = any>(entries: ReadonlyArray<readonly [string, T]>): {[k: string]: T} {
  const result: {[k: string]: T} = {}
  for (const [key, value] of entries) {
    result[key] = value
  }
  return result
}
