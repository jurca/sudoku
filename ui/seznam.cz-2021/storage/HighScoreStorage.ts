import Difficulty from '../../../conf/Difficulty'
import {fromEntries, objectValues} from '../../../game/util'
import IStorage, { ReadOnlySerializable } from './IStorage'

export interface IDifficultyStatistics {
  readonly wonGamesWithHints: number
  readonly wonGamesWithoutHints: number
  readonly shortestWonGame: number
  readonly longestWonGame: number
}

export type HighScores = { // [key in enum] is not supported in interfaces
  readonly [difficulty in Difficulty]: IDifficultyStatistics
}

export type Observer = (newHighScores: HighScores) => void

const STORAGE_KEY = 'highScores'
const DIFFICULTIES: readonly Difficulty[] = objectValues(Difficulty)
const DEFAULT_DIFFICULTY_STATISTICS: IDifficultyStatistics = {
  longestWonGame: 0,
  shortestWonGame: 0,
  wonGamesWithHints: 0,
  wonGamesWithoutHints: 0,
}
export const DEFAULT_HIGH_SCORES = fromEntries(
  DIFFICULTIES.map((difficulty) => [difficulty, DEFAULT_DIFFICULTY_STATISTICS]),
) as HighScores

export default class HighScoreStorage {
  private readonly observers = new Set<Observer>()

  constructor(
    private readonly storage: IStorage,
  ) {
  }

  public async get(): Promise<HighScores> {
    const scores = await this.storage.get(STORAGE_KEY)
    return importHighScores(scores)
  }

  public async set(highScores: HighScores): Promise<void> {
    await this.storage.set(STORAGE_KEY, highScores as unknown as ReadOnlySerializable)
    for (const observer of Array.from(this.observers)) {
      observer(highScores)
    }
  }

  public async addWonGame(difficulty: Difficulty, duration: number, usedHints: boolean): Promise<void> {
    const scores = await this.get()
    const updatedScores: HighScores = {
      ...scores,
      [difficulty]: {
        ...scores[difficulty],
        longestWonGame: Math.max(scores[difficulty].longestWonGame, Math.floor(duration)),
        shortestWonGame: (scores[difficulty].shortestWonGame ?
          Math.min(scores[difficulty].shortestWonGame, Math.floor(duration))
        :
          Math.floor(duration)
        ),
        wonGamesWithHints: scores[difficulty].wonGamesWithHints + (usedHints ? 1 : 0),
        wonGamesWithoutHints: scores[difficulty].wonGamesWithoutHints + (usedHints ? 0 : 1),
      },
    }
    return this.set(updatedScores)
  }

  public addObserver(observer: Observer): void {
    this.observers.add(observer)
  }

  public removeObserver(observer: Observer): void {
    this.observers.delete(observer)
  }
}

function importHighScores(value: ReadOnlySerializable): HighScores {
  if (!value || typeof value !== 'object') {
    return DEFAULT_HIGH_SCORES
  }

  if (value instanceof Array) {
    return DEFAULT_HIGH_SCORES
  }

  return fromEntries(
    DIFFICULTIES.map((difficulty) => [difficulty, importDifficultyStatistics(value[difficulty])]),
  ) as HighScores
}

function importDifficultyStatistics(value: ReadOnlySerializable): IDifficultyStatistics {
  if (!value || typeof value !== 'object' || value instanceof Array) {
    return DEFAULT_DIFFICULTY_STATISTICS
  }

  return {
    ...DEFAULT_DIFFICULTY_STATISTICS,
    longestWonGame: importUint(value.longestWonGame),
    shortestWonGame: importUint(value.shortestWonGame),
    wonGamesWithHints: importUint(value.wonGamesWithHints),
    wonGamesWithoutHints: importUint(value.wonGamesWithoutHints),
  }
}

function importUint(value: ReadOnlySerializable): number {
  const uintValue = typeof value === 'number' ? Math.max(Math.floor(value), 0) : 0
  return uintValue > 9007199254740991 /* Number.MAX_SAFE_INTEGER */ ? 9007199254740991 : uintValue
}
