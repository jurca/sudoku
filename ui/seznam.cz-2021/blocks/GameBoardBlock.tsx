import classnames from 'classnames'
import * as React from 'react'
import styles from './gameBoardBlock.css'

interface IProps {
  children: readonly [
    readonly [React.ReactChild, React.ReactChild, React.ReactChild],
    readonly [React.ReactChild, React.ReactChild, React.ReactChild],
    readonly [React.ReactChild, React.ReactChild, React.ReactChild],
  ]
}

export default function GameBoardBlock({children: content}: IProps) {
  return (
    <div className={classnames('game-board-block', styles.block)}>
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
