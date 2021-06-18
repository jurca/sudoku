import {CssClassNames as BoardClassNames} from '../blocks/GameBoard'
import {CssClassNames as CellClassNames, VALUE_ATTRIBUTE} from '../blocks/GameBoardCell'
import AnimationDirection from './AnimationDirection'
import AnimationEasing from './AnimationEasing'
import AnimationFillMode from './AnimationFillMode'
import AnimationPlayState from './AnimationPlayState'
import ColorAnimation from './ColorAnimation'
import IGameBoardAnimationStyles from './IGameBoardAnimationStyles'
import {CONFLICTING_VALUE_ATTRIBUTE} from './stateReflectingAttributes'

const defaultStyles: {[selector: string]: IGameBoardAnimationStyles['']} = {}

const ANIMATION_CONFIGURATION: IGameBoardAnimationStyles[''] = [
  250,
  AnimationEasing.EASE_IN_OUT,
  0,
  2,
  AnimationDirection.NORMAL,
  AnimationFillMode.FORWARDS,
  AnimationPlayState.RUNNING,
  ColorAnimation.VALUE_CONFLICT,
]

for (let i = 1; i <= 9; i++) {
  const selectorPrefix = `[${CONFLICTING_VALUE_ATTRIBUTE}='${i}'] .${CellClassNames.ROOT}[${VALUE_ATTRIBUTE}='${i}']`
  defaultStyles[`${selectorPrefix}`] = createAnimation(ColorAnimation.VALUE_CONFLICT)
  defaultStyles[`${selectorPrefix}.${BoardClassNames.PRE_FILLED_CELL}`] = createAnimation(
    ColorAnimation.VALUE_CONFLICT_PRE_FILLED,
  )
  defaultStyles[`${selectorPrefix}.${BoardClassNames.HIGHLIGHTED_CELL}`] = createAnimation(
    ColorAnimation.VALUE_CONFLICT_HIGHLIGHTED,
  )
  defaultStyles[`${selectorPrefix}.${BoardClassNames.CELL_MATCHING_SELECTED_CELL}`] = createAnimation(
    ColorAnimation.VALUE_CONFLICT_CELL_MATCHING_SELECTED_CELL,
  )
}

export default defaultStyles as IGameBoardAnimationStyles

function createAnimation(animationName: ColorAnimation): IGameBoardAnimationStyles[''] {
  return ANIMATION_CONFIGURATION.slice(0, -1).concat(animationName) as IGameBoardAnimationStyles['']
}
