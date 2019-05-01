import { Unit, TypeGuard } from "./types"

export const isType = (type: string) => <T>(x: any): x is T => typeof x === type

export const isNil = (x: any): x is void => x == null

export const isArray = Array.isArray

export const isFunction = isType("function")

export const isNumber = isType("number") as TypeGuard<number>

export const isString = isType("string") as TypeGuard<string>

export const addUnit = (unit: string) => (x: Unit) =>
  x && isNumber(x) ? x + unit : x

export const addPx = addUnit("px")

export const addPc = addUnit("%")

export const addPcOrPx = (x: Unit) =>
  x > 0 && x < 1 ? addPc(+x * 100) : addPx(x)

export const mq = (x: Unit) => `@media screen and (min-width: ${addPx(x)})`

export const toPath = (x: any) => (isString(x) ? x.split(".") : [x])

export const hasPath = (p: any[]) => (o: any) =>
  !!p.length && !p.find((k) => isNil((o = o && o[k])))

export const path = (p: any[]) => (o: any) => p.reduce((v, k) => v && v[k], o)

export const pathOr = (fallback: any) => (p: any[]) => (o: any) => {
  if (!p.length) return fallback
  const v = path(p)(o)
  return isNil(v) ? fallback : v
}

export const getKey = (obj: any, keys?: string[]) =>
  keys && keys.find((k) => hasPath(toPath(k))(obj))

export const getValue = (obj: any, keys?: string[]) => {
  const k = getKey(obj, keys)
  return k && path(toPath(k))(obj)
}
