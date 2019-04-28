import {
  Unit,
  TypeGuard,
  ThemeProps,
  StyleObject,
  StyleOptions,
  StyleFunction,
  TransformFunction
} from "./types"
import { isFunction, isNil, toPath, pathOr } from "./utils"

const isTransform = isFunction as TypeGuard<TransformFunction>

export const style = ({
  propsKeys,
  styleKeys,
  themeKey,
  fallback,
  transform
}: StyleOptions): StyleFunction => {
  // Resolve lookup from themeKey
  const getLookup = pathOr(fallback)(["theme", themeKey])

  // Create StyleObject from styleKeys
  const createStyle = (styleValue: Unit) => {
    const styleObject: StyleObject = {}
    return styleKeys.reduce((v, k) => {
      v[k] = styleValue
      return v
    }, styleObject)
  }

  // Return StyleFunction
  return <P extends ThemeProps>(props: P) => {
    // Get first props value from propsKeys
    let value: any = propsKeys.reduce((v, k) => (isNil(v) ? props[k] : v), null)

    // Return null when value is undefined
    if (isNil(value)) return null

    // Resolve path and lookup
    const path = toPath(value)
    const lookup = getLookup(props)

    // Resolve value from lookup
    value = pathOr(value)(path)(lookup)

    // Transform value
    if (isTransform(transform)) value = transform(value)

    // Return style object
    return createStyle(value)
  }
}
