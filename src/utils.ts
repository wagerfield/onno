import { Unit, Path, PathKey, Alias, Predicate, TypeGuard } from "./types"

export const eq = (a: any) => (b: any) => a === b

export const has = (key: string) => (x: any) =>
  Object.prototype.hasOwnProperty.call(x, key)

export const not = (fn: Predicate) => (...x: any[]) => !fn(...x)

export const both = (a: Predicate, b: Predicate) => (...x: any[]) =>
  a(...x) && b(...x)

export const either = (a: Predicate, b: Predicate) => (...x: any[]) =>
  a(...x) || b(...x)

export const isType = (type: string) => <T>(x: any): x is T => typeof x === type

export const isNil = (x: any): x is void => x == null

export const isNotNil = not(isNil)

export const isNotNaN = not(isNaN)

export const isArray = Array.isArray

export const isFunction = isType("function")

export const isObject = both(isType("object"), isNotNil)

export const isNumber = both(isType("number"), isNotNaN) as TypeGuard<number>

export const isString = isType("string") as TypeGuard<string>

export const isZero = eq(0) as TypeGuard<number>

export const isNotZero = not(isZero)

const hasAliasKeys = both(has("alias"), has("value"))
export const isAlias = both(isObject, hasAliasKeys) as TypeGuard<Alias>

export const isUnitless = both(isNumber, isNotZero) as TypeGuard<number>

export const addUnit = (unit: string) => (x: Unit): string =>
  isUnitless(x) ? x + unit : x

export const addPx = addUnit("px")

export const addPc = addUnit("%")

export const addPcOrPx = (x: Unit) =>
  x > 0 && x < 1 ? addPc(+x * 100) : addPx(x)

export const mq = (x: Unit) => `@media screen and (min-width: ${addPx(x)})`

export const propEq = (key: string) => (val: any) => (x: any) => x[key] === val

export const indexEq = (key: any) => (val: any, idx: number) => +key === idx

export const aliasEq = propEq("alias")

export const getAlias = (key: PathKey, arr: any[]) => {
  const alias = arr.find(either(indexEq(key), aliasEq(key)))
  return isAlias(alias) ? alias.value : alias
}

export const toPath = (x: any) => (isString(x) ? x.split(".") : [x])

export const pathOr = (fallback: any) => (path: Path) => (x: any) => {
  if (!path || !path.length || !x) return fallback
  const isFallback = eq(fallback)
  return path.reduce((v, k) => {
    if (isFallback(v)) return v
    const alias = isArray(v) && getAlias(k, v)
    return alias || (k && v[k]) || fallback
  }, x)
}
