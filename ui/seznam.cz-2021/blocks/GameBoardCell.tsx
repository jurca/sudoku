import classnames from 'classnames'
import * as React from 'react'
import Icon, {IconType} from '../reusable/Icon'
import styles from './gameBoardCell.css'

export type IMatrix3x3 = readonly [
  readonly [null | string, null | string, null | string],
  readonly [null | string, null | string, null | string],
  readonly [null | string, null | string, null | string],
]

export enum CssClassNames {
  ROOT = 'game-board-cell',
  CONTENT = 'game-board-cell__content',
}

export const VALUE_ATTRIBUTE = 'data-value'

interface IProps {
  readonly className?: string
  readonly children?: null | IMatrix3x3 | IconType | string
  onAction(): void
}

export default function GameBoardCell({className, children: content, onAction}: IProps) {
  const dataAttributes = {
    ...(typeof content === 'string' ? {
      [VALUE_ATTRIBUTE]: content,
    } : {})
  }
  return (
    <button
      className={classnames(CssClassNames.ROOT, styles.gameBoardCell, className)}
      {...dataAttributes}
      onClick={onAction}
    >
      {(() => {
        switch (true) {
          case content === undefined || content === null:
            return null
          case isIconType(content):
            return (
              <span className={classnames(CssClassNames.CONTENT, styles.icon, styles.content)}>
                <Icon icon={content as IconType}/>
              </span>
            )
          case Array.isArray(content):
            return (
              <span className={styles.matrix}>
                {(content as unknown as IMatrix3x3).map((row, rowIndex) =>
                  <span key={rowIndex} className={classnames(CssClassNames.CONTENT, styles.row, styles.content)}>
                    {row.map((cell, cellIndex) =>
                      <span key={cellIndex} className={styles.cell}>
                        {cell}
                      </span>,
                    )}
                  </span>,
                )}
              </span>
            )
          default:
            return (
              <span className={classnames(CssClassNames.CONTENT, styles.symbol, styles.content)}>
                {content}
              </span>
            )
        }
      })()}
    </button>
  )
}

export {IconType}

const iconTypes = Object.values(IconType)

function isIconType(value: unknown): value is IconType {
  return iconTypes.includes(value as IconType)
}
