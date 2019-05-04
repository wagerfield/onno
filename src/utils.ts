import * as T from "./types"

export const isArray = Array.isArray

export const isNil = (x: any): x is void => x == null

export const isUnitless = (x: any) => typeof x === "number" && !!x

export const isFraction = (x: any) => isUnitless(x) && x > 0 && x < 1

export const when = (p: T.Pred) => (f: T.Func) => (x: any) => (p(x) ? f(x) : x)

export const addPx = when(isUnitless)((x) => x + "px")

export const addPc = when(isFraction)((x) => x * 100 + "%")

export const addPcOrPx = (x: any) => addPx(addPc(x))

export const mq = (x: any) => `@media screen and (min-width: ${addPx(x)})`

export const toPath = (x: any) => (typeof x === "string" ? x.split(".") : [x])

export const get = (key?: any, x?: any) =>
  toPath(key).reduce((v, k) => {
    let r = v && v[k]
    if (isArray(v)) {
      const a = v.find((o) => o && o.alias === k)
      if (a && !isNil(a.value)) r = a.value
      else if (r && r.alias) r = r.value
    }
    return r
  }, x)

export const resolve = (keys?: any[], x?: any) =>
  isArray(keys)
    ? keys.reduceRight((v, k) => {
        const r = get(k, x)
        return isNil(r) ? v : r
      }, null)
    : null
