import {
  Nil,
  Keys,
  Props,
  StyleObject,
  StyleOptions,
  StyleFunction,
  PartialStyleOptions
} from "./types"
import { pathOr, toPath, isNil, isArray, isFunction } from "./utils"

export const getKey = <P extends Props>(props: P, keys?: Keys): string | Nil =>
  keys && keys.find((k) => props[k] != null)

export const getValue = <P extends Props>(props: P, keys?: Keys) => {
  const k = getKey(props, keys)
  return k && props[k]
}

export const createStyle = (value?: any, keys?: Keys) => {
  if (isNil(value) || !isArray(keys)) return null
  return keys.reduce(
    (s, k) => {
      s[k] = value
      return s
    },
    {} as StyleObject
  )
}

export const style = <P extends Props>({
  propsKeys,
  styleKeys,
  themeKeys,
  transform,
  fallback
}: StyleOptions): StyleFunction<P> => (props: P) => {
  // Get first props value from propsKeys
  let value = getValue(props, propsKeys)

  // Return null when value is undefined
  if (isNil(value)) return null

  // Resolve themeKey from themeKeys
  const themeKey = getKey(props, themeKeys)

  // // Resolve lookup from themeKey
  const lookup = pathOr(fallback)(["theme", themeKey])(props)

  // Resolve style keys
  const keys = isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Resolve value from lookup path
  value = pathOr(value)(toPath(value))(lookup)

  // Transform value
  if (isFunction(transform)) value = transform(value)

  // Return style object
  return createStyle(value, keys)
}

export const compose = <P>(fns: StyleFunction<P>[]): StyleFunction<P> => fns[0]

export const extend = (a: PartialStyleOptions) => <P>(b: StyleOptions) =>
  style<P>({ ...a, ...b })
