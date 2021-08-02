function flat<E>(this: E[][], depth: 1): E[]
function flat<E>(this: E[][][], depth: 2): E[]
function flat<E>(this: E[][][][], depth: 3): E[]
function flat<E>(this: E[][][][][], depth: 4): E[]
function flat<E>(this: E[], depth: number = 1): any[] {
  if (depth < 1) {
    return this
  }

  const flattened = ([] as any[]).concat(...this)
  const applyRecursion = depth > 1 && flattened.find(element => Array.isArray(element))
  return applyRecursion ? flat.call(flattened, depth - 1 as any) : flattened
}

if (typeof Array.prototype.flat !== 'function') {
  Array.prototype.flat = flat
}

function replaceAll(
  this: string,
  searchValue: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string),
): string {
  const match = this.match(searchValue)
  return match ?
    this.replace(
      searchValue,
      typeof replacement === 'string' ?
        replacement
      :
        replacement(match[0], ...match.slice(1), this.indexOf(match[0]), this),
    )
  :
    this
}

if (typeof String.prototype.replaceAll !== 'function') {
  String.prototype.replaceAll = replaceAll
}

// Declarations below were copied from TypeScript's lib.es2019.array.d.ts

type FlatArray<Arr, Depth extends number> = {
  "done": Arr,
  "recur": Arr extends ReadonlyArray<infer InnerArr>
      ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
      : Arr
}[Depth extends -1 ? "done" : "recur"];

interface ReadonlyArray<T> {

  /**
   * Calls a defined callback function on each element of an array. Then, flattens the result into
   * a new array.
   * This is identical to a map followed by flat with depth 1.
   *
   * @param callback A function that accepts up to three arguments. The flatMap method calls the
   * callback function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If
   * thisArg is omitted, undefined is used as the this value.
   */
  flatMap<U, This = undefined> (
      callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
      thisArg?: This
  ): U[]


  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the
   * specified depth.
   *
   * @param depth The maximum recursion depth
   */
  flat<A, D extends number = 1>(
      this: A,
      depth?: D
  ): FlatArray<A, D>[]
}

interface Array<T> {

  /**
   * Calls a defined callback function on each element of an array. Then, flattens the result into
   * a new array.
   * This is identical to a map followed by flat with depth 1.
   *
   * @param callback A function that accepts up to three arguments. The flatMap method calls the
   * callback function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If
   * thisArg is omitted, undefined is used as the this value.
   */
  flatMap<U, This = undefined> (
      callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
      thisArg?: This
  ): U[]

  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the
   * specified depth.
   *
   * @param depth The maximum recursion depth
   */
  flat<A, D extends number = 1>(
      this: A,
      depth?: D
  ): FlatArray<A, D>[]
}

// Declarations below were copied from TypeScript's lib.es2021.string.d.ts

interface String {
  /**
   * Replace all instances of a substring in a string, using a regular expression or search string.
   * @param searchValue A string to search for.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   */
  replaceAll(searchValue: string | RegExp, replaceValue: string): string;

  /**
   * Replace all instances of a substring in a string, using a regular expression or search string.
   * @param searchValue A string to search for.
   * @param replacer A function that returns the replacement text.
   */
  replaceAll(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
}
