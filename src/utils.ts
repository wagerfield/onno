import {
  Unit,
  Path,
  Alias,
  Reducer,
  Predicate,
  TypeGuard,
  TransformFunction
} from "./types"

export const gt = (a: any) => (b: any) => b > a

export const lt = (a: any) => (b: any) => b < a

export const eq = (a: any) => (b: any) => a === b

export const has = (key: string) => (x: any) =>
  Object.prototype.hasOwnProperty.call(x, key)

export const not = (fn: Predicate) => (x: any) => !fn(x)

export const both = (a: Predicate, b: Predicate) => (x: any) => a(x) && b(x)

export const either = (a: Predicate, b: Predicate) => (x: any) => a(x) || b(x)

export const isType = (type: string) => (x: any) => typeof x === type

export const isNil = (x: any): x is void => x == null

export const isNotNil = not(isNil)

export const isNotNaN = not(isNaN)

export const isArray = Array.isArray

export const isFunction = isType("function")

export const isObject = both(isType("object"), isNotNil)

export const isNumber = both(isType("number"), isNotNaN) as TypeGuard<number>

export const isString = isType("string") as TypeGuard<string>

export const isNegative = both(isNumber, lt(0)) as TypeGuard<number>

export const isPositive = both(isNumber, gt(0)) as TypeGuard<number>

export const isZero = eq(0) as TypeGuard<number>

export const isNotZero = not(isZero)

export const isAlias = both(has("alias"), has("value")) as TypeGuard<Alias>

export const isUnitless = both(isNumber, isNotZero) as TypeGuard<number>

export const isUnit = either(isNumber, isString) as TypeGuard<Unit>

export const addUnit = (unit: string) => (x: Unit): string =>
  isUnitless(x) ? x + unit : x

export const addEm = addUnit("em")

export const addPx = addUnit("px")

export const addPct = addUnit("%")

export const addRem = addUnit("rem")

export const mediaQuery = (x: Unit, fn: TransformFunction = addPx) =>
  `@media screen and (min-width: ${fn(x)})`

export const reduce = <T>(iterator: Reducer<T>) => (initial: T) => (
  list: T[]
) => list.reduce(iterator, initial)

export const toPath = (x: any) => (isString(x) ? x.split(".") : [x])

export const pathOr = (fallback: any) => (path: Path) => (x: any) => {
  if (!path || !path.length || !x) return fallback
  const isFallback = eq(fallback)
  return path.reduce((v, k) => {
    if (isFallback(v)) return v
    const value = k && v[k]
    return value || fallback
  }, x)
}
