import IStorage, {ReadOnlySerializable, Serializable} from './IStorage'

const COMPATIBILITY_TEST_ITEM_KEY = 'io.github.jurca/sudoku/LocalStorage.COMPATIBILITY_TEST_ITEM_KEY'

export default class DOMStorage implements IStorage {
  constructor(
    private readonly keyPrefix: string,
    private readonly storage: Storage,
  ) {
    const testingValue = `${Math.random()}`
    this.storage.setItem(COMPATIBILITY_TEST_ITEM_KEY, testingValue)
    const storedValue = this.storage.getItem(COMPATIBILITY_TEST_ITEM_KEY)
    this.storage.removeItem(COMPATIBILITY_TEST_ITEM_KEY)
    if (storedValue !== testingValue) {
      throw new Error(
        `The storage is not fully available, retrieved testing value is not the same as the stored one`,
      )
    }
  }

  public get(key: string): Promise<Serializable> {
    return this.wrapIntoPromise(() => {
        const storedValue = this.storage.getItem(this.keyPrefix + key)
        return storedValue === null ? storedValue : JSON.parse(storedValue)
    })
  }

  public set(key: string, value: ReadOnlySerializable): Promise<void> {
    return this.wrapIntoPromise(() => this.storage.setItem(this.keyPrefix + key, JSON.stringify(value)))
  }

  public delete(key: string): Promise<void> {
    return this.wrapIntoPromise(() => this.storage.removeItem(this.keyPrefix + key))
  }

  private wrapIntoPromise<R>(operation: () => R): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      try {
        resolve(operation())
      } catch (error) {
        reject(error)
      }
    })
  }
}
