import * as React from 'react'
import {createHierarchicalCellMatrix} from '../../../game/selectors'
import {IMatrixCoordinates, ISudokuMatrixCell, SudokuMatrix} from '../../../game/state'
import GameBoardUI from '../blocks/GameBoard'
import {InputMode} from '../blocks/InputModeSwitch'
import GameBoardTheme from '../theme/GameBoardTheme'
import PrimaryColor from '../theme/PrimaryColor'
import {NOTED_VALUES_ATTRIBUTE, SELECTED_VALUE_ATTRIBUTE} from '../theme/stateReflectingAttributes'
import Theme from '../theme/Theme'

interface IProps {
  readonly gameState: SudokuMatrix
  readonly inputModeSwitchName: string
  readonly defaultInputMode: InputMode
  readonly uniqueClassName: string
  readonly primaryColor: PrimaryColor
  readonly theme: Theme
  onToggleCellValue(cell: IMatrixCoordinates, value: null | number, mode: InputMode): void
}

export default function GameBoard(props: IProps) {
  const [selectedCell, setSelectedCell] = React.useState<null | {readonly row: number, readonly column: number}>(null)
  const [inputMode, setInputMode] = React.useState(props.defaultInputMode)

  const selectedCellObject = selectedCell && props.gameState[selectedCell.row][selectedCell.column]

  const onCellAction = React.useMemo(
    () => (cell: ISudokuMatrixCell) => {
      if (cell.initialValue) {
        return
      }

      const row = props.gameState.findIndex((matrixRow) => matrixRow.includes(cell))
      const column = row > -1 ? props.gameState[row].findIndex((otherCell) => otherCell === cell) : -1

      if (inputMode === InputMode.ERASE) {
        props.onToggleCellValue({column, row}, null, inputMode)
        return
      }

      setSelectedCell({row, column})
    },
    [props.gameState, inputMode, setSelectedCell, props.onToggleCellValue],
  )
  const onInputModeChange = React.useMemo(
    () => (newInputMode: InputMode) => {
      if (newInputMode === InputMode.ERASE) {
        setSelectedCell(null)
      }
      setInputMode(newInputMode)
    },
    [setSelectedCell, setInputMode],
  )
  const onInput = React.useMemo(
    () => (pressedKey: number) => {
      if (inputMode === InputMode.ERASE || !selectedCell || !selectedCellObject) {
        return
      }
      if (inputMode === InputMode.NOTES && selectedCellObject.value) {
        return
      }

      props.onToggleCellValue(selectedCell, pressedKey, inputMode)
    },
    [selectedCell, selectedCellObject, inputMode],
  )

  const stateAttributes = {
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
          defaultInputMode={inputMode}
          inputModeSwitchName={props.inputModeSwitchName}
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
