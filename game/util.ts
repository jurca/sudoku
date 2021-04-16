import {checkBoard} from './boardChecker'
import {IEndedGamePlayBreak, IStartedGamePlayBreak, SudokuMatrixState} from './state'

export function getGamePlayDuration(
  gameStart: {readonly logicalTimestamp: number},
  breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]],
  gameEnd: null | number,
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
    if (gameEnd) {
      duration += gameEnd - lastGamePlayStart
    } else {
      duration += performance.now() - lastGamePlayStart
    }
  }

  return duration
}

export function isComplete(sudokuMatrix: SudokuMatrixState): boolean {
  return checkBoard(sudokuMatrix) && sudokuMatrix.every((row) => row.every((cell) => !!cell.value))
}

export function objectValues<T>(obj: {[key: string]: T}): T[] {
  return Object.keys(obj).map((key) => obj[key])
}

export function fromEntries<T = any>(entries: ReadonlyArray<readonly [string, T]>): {[k: string]: T} {
  const result: {[k: string]: T} = {}
  for (const [key, value] of entries) {
    result[key] = value
  }
  return result
}

// https://github.com/tc39/proposal-array-last (stage 1 proposal at 2021-04-13)
export function lastItem<E>(array: readonly E[]): undefined | E {
  return array[array.length - 1]
}
