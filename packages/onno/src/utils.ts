import { Func, Pred } from "./types"

export const isArray = Array.isArray

export const isNil = (x: any): x is void => x == null

export const isUndefined = (x: any) => x === undefined

export const isObject = (x: any) => typeof x === "object"

export const isUnitless = (x: any) => typeof x === "number" && !!x

export const isFraction = (x: any) => isUnitless(x) && x > -1 && x < 1

export const when = (p: Pred) => (f: Func) => (x: any) => (p(x) ? f(x) : x)

export const addPx = when(isUnitless)((x) => x + "px")

export const addPc = when(isFraction)((x) => x * 100 + "%")

export const addPcOrPx = (x: any) => addPx(addPc(x))

export const mq = (x: any) => `@media(min-width: ${addPx(x)})`

export const toArray = <T>(args: T[]) => (isArray(args[0]) ? args[0] : args)

export const toPath = (x: any) => (typeof x === "string" ? x.split(".") : [x])

export function get(path?: any, lookup?: any) {
  if (isNil(path) || isNil(lookup)) return undefined
  const keys = isArray(path) ? path : toPath(path)
  return keys.reduce((v, k) => {
    let r = v && (v[Math.abs(k)] || v[k])
    if (r && r.alias) r = r.value
    else if (isArray(v)) {
      const a = v.find((o) => o && o.alias === k)
      if (a) r = a.value
    }
    return isUnitless(r) ? r * (+k < 0 ? -1 : 1) : r
  }, lookup)
}

export function resolve(paths?: any[], lookup?: any) {
  if (isNil(lookup) || !isArray(paths)) return undefined
  return paths.reduceRight((v, p) => {
    const r = get(p, lookup)
    return isUndefined(r) ? v : r
  }, undefined)
}

export const uniq = <V>(list: V[]) =>
  list.reduce(
    (a, v) => {
      if (a.indexOf(v) === -1) a.push(v)
      return a
    },
    [] as V[]
  )
