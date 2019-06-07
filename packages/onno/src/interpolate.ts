import * as T from "./types"
import { compose } from "./compose"
import { merge, isPlainObject } from "./utils"

export function interpolate<P extends T.ThemeProps, S extends T.Style>(
  options: T.InterpolateOptions
): T.StyleTransformFunction<P, S> {
  let { name, renderers } = options
  if (!/Transform$/.test(name)) name += "Transform"
  const renderer = compose({ name, renderers })
  const { propsKeys, styleKeys } = renderer.options

  // Scoped transform function
  const transform: T.StyleTransformFunction<P, S> = (
    style?: T.StyleObject<S>,
    theme?: T.Theme
  ) => {
    if (!isPlainObject(style)) return null
    const renderedStyle = renderer({ theme, ...style })
    const mergedStyle = renderedStyle && merge<T.StyleObject<S>>(renderedStyle)

    // Iterate over style keys
    return Object.keys(style!).reduce((result, key) => {
      const value = result[key] as T.StyleObject<S>
      if (isPlainObject(value)) {
        result[key] = transform(value, theme)!
      } else {
        const hasPropsKey = propsKeys.includes(key)
        const hasStyleKey = styleKeys.includes(key)
        if (hasPropsKey && !hasStyleKey) delete result[key]
      }
      return result
    }, Object.assign({}, style, mergedStyle))
  }

  // Define transform properties
  Object.defineProperty(transform, "name", { value: name })
  transform.renderer = renderer
  transform.options = options

  // Return transform function
  return transform
}
