import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DEFAULT_COLOR_STYLES from './defaultGameBoardColorStyles'
import colorsProvider from './gameBoardColorsProvider'
import stylesProvider from './gameBoardColorStylesProvider'
import PrimaryColor from './PrimaryColor'
import Theme from './Theme'

interface IProps {
  readonly selectorPrefix: string
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
}

export default function GameBoardTheme(props: IProps) {
  const colors = colorsProvider(props.theme, props.primaryColor)
  const styles = stylesProvider(props.selectorPrefix, DEFAULT_COLOR_STYLES, colors)

  return (
    ReactDOM.createPortal(
      <style>{styles}</style>,
      document.head,
    )
  )
}
