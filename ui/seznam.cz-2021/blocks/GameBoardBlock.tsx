import classnames from 'classnames'
import * as React from 'react'
import styles from './gameBoardBlock.css'

export type ContentMatrix = readonly [
  readonly [React.ReactChild, React.ReactChild, React.ReactChild],
  readonly [React.ReactChild, React.ReactChild, React.ReactChild],
  readonly [React.ReactChild, React.ReactChild, React.ReactChild],
]

export enum CssClassNames {
  ROOT = 'game-board-block',
}

interface IProps {
  readonly children: ContentMatrix
}

export default function GameBoardBlock({children: content}: IProps) {
  return (
    <div className={classnames(CssClassNames.ROOT, styles.block)}>
      {content.map((row, rowIndex, rows) =>
        <React.Fragment key={rowIndex}>
          <div className={styles.row}>
            {row.map((cell, cellIndex, cells) =>
              <React.Fragment key={cellIndex}>
                <div className={styles.cell}>
                  {cell}
                </div>
                {cellIndex < cells.length - 1 &&
                  <div className={styles.separator}/>
                }
              </React.Fragment>,
            )}
          </div>
          {rowIndex < rows.length - 1 &&
            <div className={styles.separator}/>
          }
        </React.Fragment>,
      )}
    </div>
  )
}
