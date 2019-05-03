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

export const get = (keys?: any[], x?: any) =>
  isArray(keys)
    ? keys.reduceRight((v, k) => {
        const r = toPath(k).reduce((a, b) => {
          let c = a && a[b]
          if (isArray(a)) {
            const d = a.find((o) => o && o.alias === b)
            c = (d && d.value) || (c && c.alias ? c.value : c)
          }
          return c
        }, x)
        return isNil(r) ? v : r
      }, null)
    : null
