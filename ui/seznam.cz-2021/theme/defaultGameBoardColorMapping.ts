// tslint:disable:object-literal-sort-keys

import IGameBoardColorMapping from './IGameBoardColorMapping'

const defaultColorMapping: IGameBoardColorMapping = {
  matrix: {
    border: 'primary5',
    blockSeparator: 'primary5',
    cellSeparator: 'separator',
    cellBackground: 'primary1',
    preFilledCellBackground: 'primary2',
    highlightedCellBackground: 'primary3',
    selectedCell: 'primary4',
    selectedNotesCell: 'secondary',
    cellMatchingSelectedCellBackground: 'primary4',
    cellWithNotesBackground: 'secondary',
    cellContent: 'primary5',
  },
  inputKeyboard: {
    border: 'primary5',
    separator: 'separator',
    keyBackground: 'primary1',
    activeKeyBackground: 'primary4',
    notesActiveKeyBackground: 'secondary',
    keyContent: 'primary5',
  },
  inputModeSwitch: {
    border: 'primary5',
    optionBackground: 'primary1',
    activeOptionBackground: 'primary4',
    optionContent: 'primary5',
    separator: 'separator',
  },
}

export default defaultColorMapping
