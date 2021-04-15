import {objectValues} from '../../../game/util'
import PrimaryColor from '../theme/PrimaryColor'
import Theme from '../theme/Theme'
import IStorage, { ReadOnlySerializable } from './IStorage'

export interface ISettings {
  readonly automaticValidation: boolean
  readonly theme: Theme
  readonly primaryColor: PrimaryColor
}

export type Observer = (state: ISettings) => void

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: ISettings = {
  automaticValidation: true,
  primaryColor: PrimaryColor.RED,
  theme: Theme.LIGHT,
}

const themes = objectValues(Theme)
const primaryColors = objectValues(PrimaryColor)

export default class SettingsStorage {
  private readonly observers = new Set<Observer>()

  constructor(
    private readonly storage: IStorage,
  ) {
  }

  public async get(): Promise<ISettings> {
    const value = await this.storage.get(STORAGE_KEY)
    return importSettings(value)
  }

  public async set(settings: ISettings): Promise<void> {
    await this.storage.set(STORAGE_KEY, settings as unknown as ReadOnlySerializable)
    for (const observer of this.observers) {
      observer(settings)
    }
  }

  public addObserver(observer: Observer): void {
    this.observers.add(observer)
  }

  public removeObserver(observer: Observer): void {
    this.observers.delete(observer)
  }
}

function importSettings(value: ReadOnlySerializable): ISettings {
  if (!value || typeof value !== 'object') {
    return DEFAULT_SETTINGS
  }

  if (value instanceof Array) {
    return DEFAULT_SETTINGS
  }

  return {
    ...DEFAULT_SETTINGS,
    automaticValidation: !!value.automaticValidation,
    primaryColor: importEnumValue(value.primaryColor, primaryColors, DEFAULT_SETTINGS.primaryColor),
    theme: importEnumValue(value.theme, themes, DEFAULT_SETTINGS.theme),
  }
}

function importEnumValue<E>(value: unknown, values: readonly E[], defaultValue: E): E {
  return values.includes(value as E) ? value as E : defaultValue
}
