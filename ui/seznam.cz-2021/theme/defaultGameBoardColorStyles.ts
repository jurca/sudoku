import {CssClassNames as BoardClassNames} from '../blocks/GameBoard'
import {CssClassNames as BlockClassNames} from '../blocks/GameBoardBlock'
import {CssClassNames as CellClassNames} from '../blocks/GameBoardCell'
import {CssClassNames as InputKeysClassNames, KEY_VALUE_ATTRIBUTE} from '../blocks/InputKeyboard'
import {CssClassNames as InputModeClassNames} from '../blocks/InputModeSwitch'
import IGameBoardColorStyles from './IGameBoardColorStyles'
import {INPUT_MODE_ATTRIBUTE, NOTED_VALUES_ATTRIBUTE, SELECTED_VALUE_ATTRIBUTE} from './stateReflectingAttributes'

const defaultStyles: IGameBoardColorStyles = {
  [`.${BoardClassNames.MATRIX}`]: ['matrix', 'border'],
  [`.${BlockClassNames.ROOT}`]: ['matrix', 'blockSeparator'],
  [`.${BlockClassNames.ROOT} .${BlockClassNames.ROOT}`]: ['matrix', 'cellSeparator'],
  [`.${BoardClassNames.MATRIX} .${CellClassNames.ROOT}`]: ['matrix', 'cellBackground'],
  [`.${BoardClassNames.MATRIX} .${BoardClassNames.PRE_FILLED_CELL}`]: ['matrix', 'preFilledCellBackground'],
  [`.${BoardClassNames.MATRIX} .${BoardClassNames.HIGHLIGHTED_CELL}`]: ['matrix', 'highlightedCellBackground'],
  [`.${BoardClassNames.MATRIX} .${BoardClassNames.CELL_MATCHING_SELECTED_CELL}`]: ['matrix', 'cellMatchingSelectedCellBackground'],
  [`.${BoardClassNames.MATRIX} .${BoardClassNames.CELL_WITH_NOTES}`]: ['matrix', 'cellWithNotesBackground'],
  [`.${BoardClassNames.MATRIX} .${BoardClassNames.SELECTED_CELL}`]: ['matrix', 'selectedCell'],
  [`[${INPUT_MODE_ATTRIBUTE}='InputMode.NOTES'] .${BoardClassNames.MATRIX} .${BoardClassNames.SELECTED_CELL}`]: ['matrix', 'selectedNotesCell'],
  [`.${BoardClassNames.MATRIX} .${CellClassNames.CONTENT}`]: ['matrix', 'cellContent'],
  [`.${InputKeysClassNames.ROOT}`]: ['inputKeyboard', 'border'],
  [`.${InputKeysClassNames.KEY}`]: ['inputKeyboard', 'keyBackground'],
  [`.${InputKeysClassNames.KEY} .${CellClassNames.CONTENT}`]: ['inputKeyboard', 'keyContent'],
  [`.${InputKeysClassNames.SEPARATOR}`]: ['inputKeyboard', 'separator'],
  [`.${InputModeClassNames.ROOT}`]: ['inputModeSwitch', 'border'],
  [`.${InputModeClassNames.MODE}`]: ['inputModeSwitch', 'optionBackground'],
  [`:checked + .${InputModeClassNames.MODE}`]: ['inputModeSwitch', 'activeOptionBackground'],
  [`.${InputModeClassNames.ICON}`]: ['inputModeSwitch', 'optionContent'],
  [`.${InputModeClassNames.SEPARATOR}`]: ['inputModeSwitch', 'separator'],
}

for (let i = 1; i <= 9; i++) {
  const keySelector = `.${InputKeysClassNames.KEY}[${KEY_VALUE_ATTRIBUTE}='${i}']`
  Object.assign(defaultStyles, {
    [`[${SELECTED_VALUE_ATTRIBUTE}='${i}'] ${keySelector}`]: ['inputKeyboard', 'activeKeyBackground'],
    [`[${NOTED_VALUES_ATTRIBUTE}~='${i}'] ${keySelector}`]: ['inputKeyboard', 'notesActiveKeyBackground'],
  })
}

export default defaultStyles
