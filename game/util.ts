import {checkBoard} from './boardChecker'
import {IEndedGamePlayBreak, IStartedGamePlayBreak, SudokuMatrixState} from './state'

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

export function isComplete(sudokuMatrix: SudokuMatrixState): boolean {
  return checkBoard(sudokuMatrix) && sudokuMatrix.every((row) => row.every((cell) => !!cell.value))
}

// https://github.com/tc39/proposal-array-last (stage 1 proposal at 2021-04-13)
export function lastItem<E>(array: readonly E[]): undefined | E {
  return array[array.length - 1]
}
