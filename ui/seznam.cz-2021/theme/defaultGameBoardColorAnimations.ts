import ColorAnimation from './ColorAnimation'
import IGameBoardColorAnimations from './IGameBoardColorAnimations'

const defaultStyles: IGameBoardColorAnimations = {
  [ColorAnimation.VALUE_CONFLICT]: {
    'from': ['matrix', 'cellBackground'],
    '50%': ['matrix', 'selectedCell'],
    'to': ['matrix', 'cellBackground'],
  },
  [ColorAnimation.VALUE_CONFLICT_PRE_FILLED]: {
    'from': ['matrix', 'preFilledCellBackground'],
    '50%': ['matrix', 'selectedCell'],
    'to': ['matrix', 'preFilledCellBackground'],
  },
  [ColorAnimation.VALUE_CONFLICT_HIGHLIGHTED]: {
    'from': ['matrix', 'highlightedCellBackground'],
    '50%': ['matrix', 'selectedCell'],
    'to': ['matrix', 'highlightedCellBackground'],
  },
  [ColorAnimation.VALUE_CONFLICT_CELL_MATCHING_SELECTED_CELL]: {
    'from': ['matrix', 'cellBackground'],
    '50%': ['matrix', 'selectedCell'],
    'to': ['matrix', 'cellBackground'],
  },
}

export default defaultStyles
