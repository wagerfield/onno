import { Func, Pred } from "./types"

const IGNORE = /\s|\d+\.\d+/

export const isArray = Array.isArray

export const isNil = (x: any): x is void => x == null

export const isUndefined = (x: any) => x === undefined

export const isType = <T>(type: string) => (x: any): x is T => typeof x === type

export const isObject = isType("object")

export const isNumber = isType<number>("number")

export const isString = isType<string>("string")

export const isUnitless = (x: any) => isNumber(x) && !!x

export const isFraction = (x: any) => isUnitless(x) && x > -1 && x < 1

export const when = (p: Pred) => (f: Func) => (x: any) => (p(x) ? f(x) : x)

export const addPx = when(isUnitless)((x) => x + "px")

export const addPc = when(isFraction)((x) => x * 100 + "%")

export const addRem = when(isUnitless)((x) => x + "rem")

export const addPcOrPx = (x: any) => addPx(addPc(x))

export const mq = (x: any) => `@media(min-width: ${addPx(x)})`

export const toArray = <T>(args: T[]) => (isArray(args[0]) ? args[0] : args)

export const toPath = (x: any) =>
  isString(x) && !IGNORE.test(x) ? x.split(".") : [x]

export function get(path?: any, lookup?: any) {
  if (isNil(path) || isNil(lookup)) return undefined
  if ((isArray(path) ? path[0] : path) === ".") return lookup
  const keys = isArray(path) ? path.concat() : toPath(path)
  const head = keys[0]
  const isKey = isString(head)
  const invert = (isKey && head.indexOf("-") === 0) || head < 0
  if (invert) keys[0] = isKey ? head.substring(1) : Math.abs(head)
  const value = keys.reduce((v, k) => {
    let r = v && v[k]
    if (r && r.alias) r = r.value
    else if (isArray(v)) {
      const a = v.find((o) => o && o.alias === k)
      if (a) r = a.value
    }
    return r
  }, lookup)
  return isNumber(value)
    ? (invert ? -1 : 1) * value
    : isString(value)
    ? (invert ? "-" : "") + value
    : value
}

export function resolve(paths?: any[], lookup?: any) {
  if (isNil(lookup) || !isArray(paths)) return undefined
  return paths.reduceRight((v, p) => {
    const r = get(p, lookup)
    return isUndefined(r) ? v : r
  }, undefined)
}
