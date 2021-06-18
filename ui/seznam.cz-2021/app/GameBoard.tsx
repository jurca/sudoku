import * as React from 'react'
import {createHierarchicalCellMatrix} from '../../../game/selectors'
import {IMatrixCoordinates, ISudokuMatrixCell, SudokuMatrix} from '../../../game/state'
import GameBoardUI from '../blocks/GameBoard'
import {InputMode} from '../blocks/InputModeSwitch'
import GameBoardTheme from '../theme/GameBoardTheme'
import PrimaryColor from '../theme/PrimaryColor'
import {
  INPUT_MODE_ATTRIBUTE,
  NOTED_VALUES_ATTRIBUTE,
  SELECTED_VALUE_ATTRIBUTE,
} from '../theme/stateReflectingAttributes'
import Theme from '../theme/Theme'

interface IProps {
  readonly gameState: SudokuMatrix
  readonly selectedCell: null | IMatrixCoordinates
  readonly inputModeSwitchName: string
  readonly inputMode: InputMode
  readonly usedUpValues: readonly number[]
  readonly uniqueClassName: string
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
  onToggleCellValue(cell: IMatrixCoordinates, value: null | number, mode: InputMode): void
  onSetSelectedCell(cell: null | IMatrixCoordinates): void
  onSetInputMode(inputMode: InputMode): void
}

export default function GameBoard(props: IProps) {
  const selectedCellObject = props.selectedCell && props.gameState[props.selectedCell.row][props.selectedCell.column]

  const onCellAction = React.useMemo(
    () => (cell: ISudokuMatrixCell) => {
      if (cell.initialValue && props.inputMode === InputMode.ERASE) {
        return
      }

      const row = props.gameState.findIndex((matrixRow) => matrixRow.includes(cell))
      const column = row > -1 ? props.gameState[row].findIndex((otherCell) => otherCell === cell) : -1

      if (props.inputMode === InputMode.ERASE) {
        props.onToggleCellValue({column, row}, null, props.inputMode)
        return
      }

      props.onSetSelectedCell({row, column})
    },
    [props.gameState, props.inputMode, props.onSetSelectedCell, props.onToggleCellValue],
  )
  const onInputModeChange = React.useMemo(
    () => (newInputMode: InputMode) => {
      if (newInputMode === InputMode.ERASE) {
        props.onSetSelectedCell(null)
      }
      props.onSetInputMode(newInputMode)
    },
    [props.onSetSelectedCell, props.onSetInputMode],
  )
  const onInput = React.useMemo(
    () => (pressedKey: number) => {
      if (props.inputMode === InputMode.ERASE || !props.selectedCell || !selectedCellObject) {
        return
      }
      if (props.inputMode === InputMode.NOTES && selectedCellObject.value) {
        return
      }

      props.onToggleCellValue(props.selectedCell, pressedKey, props.inputMode)
    },
    [props.selectedCell, selectedCellObject, props.inputMode],
  )

  const stateAttributes = {
    [INPUT_MODE_ATTRIBUTE]: props.inputMode,
    ...(selectedCellObject && selectedCellObject.value && {
      [SELECTED_VALUE_ATTRIBUTE]: selectedCellObject.value,
    }),
    ...(selectedCellObject && !selectedCellObject.value && selectedCellObject.userMarkedOptions.length && {
      [NOTED_VALUES_ATTRIBUTE]: selectedCellObject.userMarkedOptions.join(' '),
    }),
  }

  return (
    <div className={props.uniqueClassName}>
      <div {...stateAttributes}>
        <GameBoardUI
          gameState={createHierarchicalCellMatrix(props.gameState)}
          selectedCell={selectedCellObject}
          inputMode={props.inputMode}
          inputModeSwitchName={props.inputModeSwitchName}
          usedUpValues={props.usedUpValues}
          onInputModeChange={onInputModeChange}
          onCellAction={onCellAction}
          onInput={onInput}
        />
        <GameBoardTheme
          selectorPrefix={`.${props.uniqueClassName} `}
          primaryColor={props.primaryColor}
          theme={props.theme}
        />
      </div>
    </div>
  )
}
