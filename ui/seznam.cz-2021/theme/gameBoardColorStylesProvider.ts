import ColorAnimation from './ColorAnimation'
import IGameBoardAnimationStyles from './IGameBoardAnimationStyles'
import IGameBoardColorAnimations from './IGameBoardColorAnimations'
import IGameBoardColors from './IGameBoardColors'
import IGameBoardColorStyles from './IGameBoardColorStyles'

export default function gameBoardColorStylesProvider(
  selectorPrefix: string,
  animationNamePrefix: string,
  styles: IGameBoardColorStyles,
  animations: IGameBoardColorAnimations,
  animationStyles: IGameBoardAnimationStyles,
  colors: IGameBoardColors,
): string {
  const serializedStyles = Object.keys(styles).map((selector) => {
    const colorPath = styles[selector]
    const colorGroup = colors[colorPath[0]]
    const color = colorGroup[colorPath[1] as keyof typeof colorGroup]
    return `${selectorPrefix}${selector} {\n  color: ${color};\n}`
  }).join('\n')

  const serializedAnimations = Object.keys(animations).map((animationName) => {
    const animation = animations[animationName as ColorAnimation]
    const serializedKeyFrames = Object.keys(animation).map((step) => {
      const colorPath = animation[step]
      const colorGroup = colors[colorPath[0]]
      const color = colorGroup[colorPath[1] as keyof typeof colorGroup]
      return `  ${step} {\n    color: ${color};\n  }`
    }).join('\n')
    return `@keyframes ${animationNamePrefix}${animationName} {\n${serializedKeyFrames}\n}`
  }).join('\n')

  const serializedAnimationStyles = Object.keys(animationStyles).map((selector) => {
    const [duration, easing, delay, iterationCount, direction, fillMode, playState, name] = animationStyles[selector]
    const cssValue = `${duration}ms ${easing} ${delay}ms ${iterationCount} ${direction} ${fillMode} ${playState} ${animationNamePrefix}${name}`
    return `${selectorPrefix}${selector} {\n  animation: ${cssValue};\n}`
  }).join('\n')

  return [
    serializedStyles,
    serializedAnimations,
    serializedAnimationStyles,
  ].join('\n')
}
