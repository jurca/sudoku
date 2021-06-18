import classnames from 'classnames'
import * as React from 'react'
import {IThemeConfiguration} from '../state'
import GameBoardTheme from '../theme/GameBoardTheme'
import {CssClassNames as BoardClassNames} from './GameBoard'
import GameBoardBlock from './GameBoardBlock'
import styles from './gameBoardBlockPreview.css'
import GameBoardCell from './GameBoardCell'

interface IProps {
  readonly uniqueClassName: string
  readonly uniqueAnimationNamespace: string
  readonly themePreview: IThemeConfiguration
}

const NOOP = () => undefined

export default function GameBoardBlockPreview(props: IProps) {
  return (
    <div className={classnames(props.uniqueClassName, styles.preview)}>
      <div className={classnames(styles.block, BoardClassNames.MATRIX)}>
        <GameBoardBlock>{[
          [
            <GameBoardCell className={BoardClassNames.HIGHLIGHTED_CELL} onAction={NOOP}>5</GameBoardCell>,
            <GameBoardCell className={BoardClassNames.HIGHLIGHTED_CELL} onAction={NOOP}>4</GameBoardCell>,
            <GameBoardCell className={BoardClassNames.HIGHLIGHTED_CELL} onAction={NOOP}>{null}</GameBoardCell>,
          ],
          [
            <GameBoardCell onAction={NOOP}>{null}</GameBoardCell>,
            <GameBoardCell className={BoardClassNames.SELECTED_CELL} onAction={NOOP}>3</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>{null}</GameBoardCell>,
          ],
          [
            <GameBoardCell className={BoardClassNames.PRE_FILLED_CELL} onAction={NOOP}>9</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>{null}</GameBoardCell>,
            <GameBoardCell onAction={NOOP}>{null}</GameBoardCell>,
          ],
        ]}</GameBoardBlock>
      </div>
      <GameBoardTheme
        selectorPrefix={`.${props.uniqueClassName} `}
        animationNamePrefix={props.uniqueAnimationNamespace}
        primaryColor={props.themePreview.primaryColor}
        theme={props.themePreview.theme}
      />
    </div>
  )
}
