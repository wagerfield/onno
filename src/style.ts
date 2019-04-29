import {
  Keys,
  Props,
  TypeGuard,
  StyleObject,
  StyleOptions,
  StyleFunction,
  TransformFunction
} from "./types"
import {
  isNil,
  isArray,
  isFunction,
  isObject,
  pathOr,
  reduce,
  toPath
} from "./utils"

const isTransform = isFunction as TypeGuard<TransformFunction>

export const resolveKey = <P extends Props>(
  props: P,
  keys?: Keys
): string | null => {
  const resolve = reduce<any>((v, k) => (v || isNil(props[k]) ? v : k))(null)
  return isArray(keys) && isObject(props) ? resolve(keys) : null
}

export const resolveValue = <P extends Props>(props: P, keys?: Keys) => {
  const key = resolveKey(props, keys)
  return key && props[key]
}

export const createStyle = (styleValue?: any, styleKeys?: Keys) => {
  if (isNil(styleValue) || !isArray(styleKeys)) return null
  const styleObject: StyleObject = {}
  return styleKeys.reduce((v, k) => {
    v[k] = styleValue
    return v
  }, styleObject)
}

export const style = ({
  propsKeys,
  styleKeys,
  themeKeys,
  transform,
  fallback
}: StyleOptions): StyleFunction => {
  return <P extends Props>(props: P) => {
    // Get first props value from propsKeys
    let value = resolveValue(props, propsKeys)

    // Return null when value is undefined
    if (isNil(value)) return null

    // Resolve themeKey from themeKeys
    const themeKey = resolveKey(props, themeKeys)

    // // Resolve lookup from themeKey
    const lookup = pathOr(fallback)(["theme", themeKey])(props)

    // Convert value to path
    const path = toPath(value)

    // Resolve value from lookup
    value = pathOr(value)(path)(lookup)

    // Transform value
    if (isTransform(transform)) value = transform(value)

    // Return style object
    return createStyle(value, styleKeys)
  }
}
