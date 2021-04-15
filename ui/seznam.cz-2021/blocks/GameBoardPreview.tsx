import classnames from 'classnames'
import * as React from 'react'
import {HierarchicalMatrix} from '../../../game/selectors'
import {ISudokuMatrixCell} from '../../../game/state'
import {CssClassNames} from './GameBoard'
import GameBoardBlock, {ContentMatrix} from './GameBoardBlock'
import GameBoardCell from './GameBoardCell'
import styles from './gameBoardPreview.css'
import InputKeyboard from './InputKeyboard'

interface IProps {
  readonly matrix: HierarchicalMatrix,
}

const NOOP = () => undefined

const EMPTY_CELL: ISudokuMatrixCell = {
  initialValue: null,
  userMarkedOptions: [],
  value: null,
}

export default function GameBoardPreview(props: IProps) {
  const matrix = React.useMemo(
    () => props.matrix.map(
      (blockRow, blockRowIndex) => blockRow.map((block, blockColumnIndex) =>
        block.map((row, rowIndex) => row.map((cell, cellIndex) =>
          !blockRowIndex && !blockColumnIndex && !rowIndex && !cellIndex ? EMPTY_CELL : cell,
        )),
      ),
    ),
    [props.matrix],
  )

  return (
    <div className={styles.boardPreview}>
      <div className={classnames(CssClassNames.MATRIX, styles.matrixContainer)}>
        <div className={styles.matrix}>
          <GameBoardBlock>
            {matrix.map((blockRow, blockRowIndex) =>
              blockRow.map((block, blockColumnIndex) =>
                <GameBoardBlock>
                  {block.map((row, cellRowIndex) =>
                    row.map((cell, cellColumIndex) => {
                      return (
                        <GameBoardCellWrapper
                          cell={cell}
                          isHighlighted={
                            (!blockRowIndex && !blockColumnIndex) ||
                            (!blockRowIndex && !cellRowIndex) ||
                            (!blockColumnIndex && !cellColumIndex)
                          }
                          isSelected={!blockRowIndex && !blockColumnIndex && !cellRowIndex && !cellColumIndex}
                        />
                      )
                    }),
                  ) as unknown as ContentMatrix}
                </GameBoardBlock>,
              ),
            ) as unknown as ContentMatrix}
          </GameBoardBlock>
        </div>
      </div>
      <div className={styles.keyboard}>
        <InputKeyboard onAction={NOOP}/>
      </div>
    </div>
  )
}

interface IGameBoardCellWrapperProps {
  readonly cell: ISudokuMatrixCell
  readonly isSelected: boolean
  readonly isHighlighted: boolean
}

function GameBoardCellWrapper(
  {cell, isSelected, isHighlighted}: IGameBoardCellWrapperProps,
) {
  const isPreFilled = !!(cell.initialValue && cell.initialValue === cell.value)
  const hasNotes = !isPreFilled && !cell.value && cell.userMarkedOptions.length
  return (
    <GameBoardCell
      className={classnames({
        [CssClassNames.CELL_WITH_NOTES]: hasNotes,
        [CssClassNames.HIGHLIGHTED_CELL]: !hasNotes && isHighlighted,
        [CssClassNames.PRE_FILLED_CELL]: isPreFilled,
        [CssClassNames.SELECTED_CELL]: isSelected,
      })}
      onAction={NOOP}
    >
      {cell.value ? `${cell.value}` : null}
    </GameBoardCell>
  )
}
