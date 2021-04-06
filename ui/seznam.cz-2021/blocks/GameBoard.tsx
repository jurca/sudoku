import classnames from 'classnames'
import * as React from 'react'
import {HierarchicalMatrix} from '../../../game/selectors'
import {ISudokuMatrixCell} from '../../../game/state'
import styles from './gameBoard.css'
import GameBoardBlock, {ContentMatrix} from './GameBoardBlock'
import GameBoardCell, {IMatrix3x3} from './GameBoardCell'
import InputKeyboard from './InputKeyboard'
import InputModeSwitch, {InputMode} from './InputModeSwitch'

interface IProps {
  readonly gameState: HierarchicalMatrix
  readonly selectedCell: null | ISudokuMatrixCell
  readonly inputModeSwitchName: string
  readonly defaultInputMode: InputMode
  onCellAction(cell: ISudokuMatrixCell): void
  onInput(pressedKey: number): void
  onInputModeChange(currentMode: InputMode): void
}

export default function GameBoard(props: IProps) {
  const {selectedCell} = props
  const selectedCellBlockRow = selectedCell && props.gameState.findIndex(
    (blockRow) => blockRow.find((block) => block.find((row) => row.includes(selectedCell))),
  )
  const selectedCellBlockColumn =
    selectedCellBlockRow != null && selectedCellBlockRow > -1 && selectedCell ?
      props.gameState[selectedCellBlockRow].findIndex((block) => block.find((row) => row.includes(selectedCell)))
    :
      null
  const selectedBlock =
    selectedCellBlockRow != null && selectedCellBlockColumn != null && selectedCellBlockColumn > -1 ?
      props.gameState[selectedCellBlockRow][selectedCellBlockColumn]
    :
      null
  const selectedCellRow = selectedCell && selectedBlock && selectedBlock.findIndex((row) => row.includes(selectedCell))
  const selectedCellColumn =
    selectedCell && selectedBlock && selectedCellRow && selectedCellRow > -1 ?
      selectedBlock[selectedCellRow].findIndex((cell) => cell === selectedCell)
    :
      null

  return (
    <div className={styles.board}>
      <div className={classnames('game-board__matrix', styles.matrixContainer)}>
        <div className={styles.matrix}>
          <GameBoardBlock>
            {props.gameState.map((blockRow, blockRowIndex) =>
              blockRow.map((block, blockColumnIndex) =>
                <GameBoardBlock>
                  {block.map((row, cellRowIndex) =>
                    row.map((cell, cellColumIndex) => {
                      const onCellAction = React.useMemo(
                        () => () => props.onCellAction(cell),
                        [props.onCellAction, cell],
                      )
                      return (
                        <GameBoardCellWrapper
                          cell={cell}
                          isHighlighted={
                            (blockRowIndex === selectedCellBlockRow && cellRowIndex === selectedCellRow) ||
                            (blockColumnIndex === selectedCellBlockColumn && cellColumIndex === selectedCellColumn) ||
                            (blockRowIndex === selectedCellBlockRow && blockColumnIndex === selectedCellBlockColumn)
                          }
                          isSelected={cell === selectedCell}
                          selectedCellValue={selectedCell && selectedCell.value}
                          onAction={onCellAction}
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
        <InputKeyboard onAction={props.onInput}/>
      </div>
      <div className={styles.switch}>
        <InputModeSwitch
          name={props.inputModeSwitchName}
          defaultMode={props.defaultInputMode}
          onModeChange={props.onInputModeChange}
        />
      </div>
    </div>
  )
}

interface IGameBoardCellWrapperProps {
  readonly cell: ISudokuMatrixCell
  readonly isSelected: boolean
  readonly isHighlighted: boolean
  readonly selectedCellValue: null | number
  onAction(): void
}

function GameBoardCellWrapper(
  {cell, isSelected, isHighlighted, selectedCellValue, onAction}: IGameBoardCellWrapperProps,
) {
  const isPreFilled = !!(cell.initialValue && cell.initialValue === cell.value)
  const hasNotes = !isPreFilled && cell.userMarkedOptions.length
  return (
    <GameBoardCell
      className={classnames({
        'game-board__cell-with-notes': hasNotes,
        'game-board__highlighted-cell': !hasNotes && isHighlighted,
        'game-board__matching-selected-cell': selectedCellValue && !isSelected && cell.value === selectedCellValue,
        'game-board__pre-filled-cell': isPreFilled,
        'game-board__selected-cell': isSelected,
      })}
      onAction={onAction}
    >
      {(() => {
        switch (true) {
          case !!cell.value:
            return `${cell.value}`
          case cell.userMarkedOptions.length > 0:
            const values = new Array(9).fill(0).map(
              (_, index) => cell.userMarkedOptions.includes(index + 1) ? `${index + 1}` : null,
            )
            return [
              values.slice(0, 3),
              values.slice(3, 6),
              values.slice(6, 9),
            ] as unknown as IMatrix3x3
          default:
            return null
        }
      })()}
    </GameBoardCell>
  )
}
