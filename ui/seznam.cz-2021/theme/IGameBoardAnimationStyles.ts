import AnimationDirection from './AnimationDirection';
import AnimationEasing from './AnimationEasing';
import AnimationFillMode from './AnimationFillMode';
import ColorAnimation from './ColorAnimation'

export default interface IGameBoardAnimationStyles {
  readonly [cssSelector: string]:
    [
      number,
      AnimationEasing,
      number,
      number | 'infinite',
      AnimationDirection,
      AnimationFillMode,
      AnimationPlayState,
      ColorAnimation,
    ]
}
