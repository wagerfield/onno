import {
  Nil,
  Keys,
  Props,
  TypeGuard,
  StyleObject,
  StyleOptions,
  StyleFunction,
  TransformFunction,
  PartialStyleOptions
} from "./types"
import { isNil, isArray, isFunction, pathOr, toPath } from "./utils"

const isTransform = isFunction as TypeGuard<TransformFunction>

export const getKey = <P extends Props>(props: P, keys?: Keys): string | Nil =>
  keys && keys.find((k) => props[k] != null)

export const getValue = <P extends Props>(props: P, keys?: Keys) => {
  const k = getKey(props, keys)
  return k && props[k]
}

export const createStyle = (styleValue?: any, styleKeys?: Keys) => {
  if (isNil(styleValue) || !isArray(styleKeys)) return null
  return styleKeys.reduce(
    (s, k) => {
      s[k] = styleValue
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

  // Resolve value from lookup path
  value = pathOr(value)(toPath(value))(lookup)

  // Transform value
  if (isTransform(transform)) value = transform(value)

  // Return style object
  return createStyle(value, styleKeys)
}

export const compose = <P>(fns: StyleFunction<P>[]): StyleFunction<P> => fns[0]

export const extend = (a: PartialStyleOptions) => <P>(b: StyleOptions) =>
  style<P>({ ...a, ...b })
