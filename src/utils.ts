export const isArray = Array.isArray

export const isNil = (x: any): x is void => x == null

export const addUnit = (unit: string) => (x: any) =>
  x && typeof x === "number" ? x + unit : x

export const addPx = addUnit("px")

export const addPc = addUnit("%")

export const addPcOrPx = (x: any) =>
  x > 0 && x < 1 ? addPc(+x * 100) : addPx(x)

export const mq = (x: any) => `@media screen and (min-width: ${addPx(x)})`

export const toPath = (x: any) => (typeof x === "string" ? x.split(".") : [x])

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
