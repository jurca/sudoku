export type PrimitiveSerializableValue = null | boolean | number | string
export type ReadOnlySerializable =
  PrimitiveSerializableValue |
  readonly ReadOnlySerializable[] |
  {readonly [key: string]: ReadOnlySerializable}
export type Serializable =
  PrimitiveSerializableValue |
  Serializable[] |
  {[key: string]: Serializable}

export default interface IStorage {
  get(key: string): Promise<Serializable>
  set(key: string, value: ReadOnlySerializable): Promise<void>
  delete(key: string): Promise<void>
}
