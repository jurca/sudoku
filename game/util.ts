import {IEndedGamePlayBreak, IStartedGamePlayBreak} from './state'

export function getGamePlayDuration(
  gameStart: {readonly logicalTimestamp: number},
  breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]],
): number {
  let lastGamePlayStart = gameStart.logicalTimestamp
  let duration = 0

  for (const gamePlayBreak of breaks.slice().reverse()) {
    duration += gamePlayBreak.startLogicalTimestamp - lastGamePlayStart
    if ('endLogicalTimestamp' in gamePlayBreak) {
      lastGamePlayStart = gamePlayBreak.endLogicalTimestamp
    }
  }

  if (!breaks.length || (breaks[0] && 'endLogicalTimestamp' in breaks[0])) {
    duration += performance.now() - lastGamePlayStart
  }

  return duration
}
