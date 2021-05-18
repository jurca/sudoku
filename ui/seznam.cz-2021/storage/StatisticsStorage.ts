import IStorage, { ReadOnlySerializable } from './IStorage'

export interface IStatistics {
  readonly gamesStarted: number
}

const STORAGE_KEY = 'statistics'

export const DEFAULT_STATISTICS: IStatistics = {
  gamesStarted: 0,
}

export default class StatisticsStorage {
  constructor(
    private readonly storage: IStorage,
  ) {
  }

  public async get(): Promise<IStatistics> {
    const value = await this.storage.get(STORAGE_KEY)
    return importStatistics(value)
  }

  public set(statistics: IStatistics): Promise<void> {
    return this.storage.set(STORAGE_KEY, statistics as unknown as ReadOnlySerializable)
  }
}

function importStatistics(value: ReadOnlySerializable): IStatistics {
  if (!value || typeof value !== 'object') {
    return DEFAULT_STATISTICS
  }

  if (value instanceof Array) {
    return DEFAULT_STATISTICS
  }

  return {
    ...DEFAULT_STATISTICS,
    gamesStarted: parseInt(value.gamesStarted as any, 10) || 0,
  }
}
