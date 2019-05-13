import * as T from "./types"

export const isArray = Array.isArray

export const isNil = (x: any): x is void => x == null

export const isUnitless = (x: any) => typeof x === "number" && !!x

export const isFraction = (x: any) => isUnitless(x) && x > 0 && x < 1

export const when = (p: T.Pred) => (f: T.Func) => (x: any) => (p(x) ? f(x) : x)

export const addPx = when(isUnitless)((x) => x + "px")

export const addPc = when(isFraction)((x) => x * 100 + "%")

export const addPcOrPx = (x: any) => addPx(addPc(x))

export const mq = (x: any) => `@media(min-width: ${addPx(x)})`

export const toPath = (x: any) => (typeof x === "string" ? x.split(".") : [x])

export function get(path?: any, obj?: any) {
  if (isNil(path) || isNil(obj)) return null
  const keys = isArray(path) ? path : toPath(path)
  return keys.reduce((v, k) => {
    let r = v && v[k]
    if (r && r.alias) r = r.value
    else if (isArray(v)) {
      const a = v.find((o) => o && o.alias === k)
      if (a) r = a.value
    }
    return isNil(r) ? null : r
  }, obj)
}

export function resolve(paths?: any[], obj?: any) {
  if (isNil(obj) || !isArray(paths)) return null
  return paths.reduceRight((v, p) => {
    const r = get(p, obj)
    return isNil(r) ? v : r
  }, null)
}

export const uniq = <V>(list: V[]) =>
  list.reduce(
    (a, v) => {
      if (a.indexOf(v) === -1) a.push(v)
      return a
    },
    [] as V[]
  )
