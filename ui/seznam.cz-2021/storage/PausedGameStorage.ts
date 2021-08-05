import Difficulty from '../../../conf/Difficulty'
import {
  EMPTY_MATRIX_NOTES,
  EMPTY_MATRIX_STATE,
  IEndedGamePlayBreak,
  IHistoryEntry,
  IMatrixCoordinates,
  IStartedGamePlayBreak,
  SudokuMatrixNotes,
  SudokuMatrixState,
} from '../../../game/state'
import {objectValues} from '../../../game/util'
import {InputMode} from '../blocks/InputModeSwitch'
import IStorage, {ReadOnlySerializable} from './IStorage'

export interface IPausedGame {
  readonly difficulty: Difficulty
  readonly inputMode: InputMode
  readonly gameStart: {
    readonly absoluteTimestamp: number,
    readonly logicalTimestamp: number,
  }
  readonly matrix: SudokuMatrixState
  readonly notes: SudokuMatrixNotes
  readonly history: readonly IHistoryEntry[]
  readonly breaks: readonly [] | readonly [IStartedGamePlayBreak | IEndedGamePlayBreak, ...IEndedGamePlayBreak[]]
  readonly valuePickerOpenAt: null | IMatrixCoordinates
}

export type Observer = (state: IPausedGame) => void

const STORAGE_KEY = 'pausedGame'

const DEFAULT_PAUSED_GAME: IPausedGame = {
  difficulty: Difficulty.MEDIUM,
  inputMode: InputMode.INPUT,
  gameStart: {
    absoluteTimestamp: Date.now(),
    logicalTimestamp: 0,
  },
  matrix: EMPTY_MATRIX_STATE,
  notes: EMPTY_MATRIX_NOTES,
  history: [],
  breaks: [],
  valuePickerOpenAt: null,
}

export default class PausedGameStorage {
  private readonly observers = new Set<Observer>()

  constructor(
    private readonly storage: IStorage,
  ) {
  }

  public async get(): Promise<null | IPausedGame> {
    const value = await this.storage.get(STORAGE_KEY)
    return value === null ? null : importPausedGame(value)
  }

  public async set(game: IPausedGame): Promise<void> {
    await this.storage.set(STORAGE_KEY, game as unknown as ReadOnlySerializable)
    for (const observer of Array.from(this.observers)) {
      observer(game)
    }
  }

  public async clear(): Promise<void> {
    return this.storage.delete(STORAGE_KEY)
  }

  public addObserver(observer: Observer): void {
    this.observers.add(observer)
  }

  public removeObserver(observer: Observer): void {
    this.observers.delete(observer)
  }
}

function importPausedGame(value: ReadOnlySerializable): IPausedGame {
  if (!value || typeof value !== 'object' || value instanceof Array) {
    return DEFAULT_PAUSED_GAME
  }

  const gameStart = !value.gameStart || typeof value.gameStart !== 'object' || value.gameStart instanceof Array ?
    DEFAULT_PAUSED_GAME.gameStart
  :
    value.gameStart
  return {
    ...DEFAULT_PAUSED_GAME,
    difficulty: importEnumValue(value.difficulty, objectValues(Difficulty), DEFAULT_PAUSED_GAME.difficulty),
    inputMode: importEnumValue(value.inputMode, objectValues(InputMode), DEFAULT_PAUSED_GAME.inputMode),
    gameStart: {
      absoluteTimestamp: importUint(gameStart.absoluteTimestamp),
      logicalTimestamp: importUint(gameStart.logicalTimestamp),
    },
    matrix: value.matrix instanceof Array ? value.matrix as any : DEFAULT_PAUSED_GAME.matrix,
    notes: value.notes instanceof Array ? value.notes as any : DEFAULT_PAUSED_GAME.notes,
    history: value.history instanceof Array ? value.history as any : DEFAULT_PAUSED_GAME.history,
    breaks: value.breaks instanceof Array ? value.breaks as any : DEFAULT_PAUSED_GAME.breaks,
    valuePickerOpenAt:
      (value.valuePickerOpenAt instanceof Object ?
        value.valuePickerOpenAt as any
      :
        DEFAULT_PAUSED_GAME.valuePickerOpenAt
      ),
  }
}

function importEnumValue<E>(value: unknown, values: readonly E[], defaultValue: E): E {
  return values.includes(value as E) ? value as E : defaultValue
}

function importUint(value: ReadOnlySerializable): number {
  const uintValue = typeof value === 'number' ? Math.max(Math.floor(value), 0) : 0
  return uintValue > 9007199254740991 /* Number.MAX_SAFE_INTEGER */ ? 9007199254740991 : uintValue
}
