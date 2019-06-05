import * as T from "./types"
import { compose } from "./compose"
import {
  mq,
  get,
  resolve,
  isArray,
  isNil,
  isObject,
  isPlainObject,
  isUndefined
} from "./utils"

const BREAKPOINTS: T.Breakpoints = ["all", "sm", "md", "lg", "xl"].map(
  (alias, index) => ({ alias, value: index * 360 })
)

export function merge<S extends T.Style>(
  styles: T.StyleArray<S>
): T.StyleObject<S> {
  return styles.reduce((o, s) => Object.assign(o, s), {})
}

export function renderStyle<S extends T.Style>(
  keys?: (keyof S)[],
  value?: any
): S | null {
  if (isNil(value) || !isArray(keys) || !keys.length) return null
  return keys.reduce(
    (s, k) => {
      s[k] = value
      return s
    },
    {} as S
  )
}

export function transformStyle<S extends T.Style>(
  renderer: T.ComposedRenderFunction<any, any>
): T.StyleTransformFunction<S> {
  const { propsKeys, styleKeys } = renderer.options

  // Scoped style transform function
  const transform = (styleObject: T.StyleObject<S>, theme?: T.Theme) => {
    const renderedStyle = renderer({ theme, ...styleObject })
    const mergedStyle = renderedStyle && merge(renderedStyle)

    // Iterate over style keys
    return Object.keys(styleObject).reduce((result, key) => {
      const value = result[key] as T.StyleObject<S>
      if (isPlainObject(value)) {
        result[key] = transform(value, theme)
      } else {
        const hasPropsKey = propsKeys.includes(key)
        const hasStyleKey = styleKeys.includes(key)
        if (hasPropsKey && !hasStyleKey) delete result[key]
      }
      return result
    }, Object.assign({}, styleObject, mergedStyle))
  }

  // Return transform function
  return transform
}

export function style<P extends T.ThemeProps, S extends T.Style>(
  options: T.StyleOptions
): T.RenderFunction<P, S> {
  const {
    propsKeys,
    styleKeys,
    themeKeys,
    transform,
    renderers,
    defaults
  } = options

  // Validate propsKeys
  if (!isArray(propsKeys) || propsKeys.length < 1) {
    throw Error("propsKeys must be an array containing at least one key")
  }

  // Resolve style transform and keys
  const name = propsKeys[0] // Renderer function name
  const keys = isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Create style transform from renderers
  let transformer: T.StyleTransformFunction<S>
  if (isArray(renderers)) {
    const renderer = compose({ name: `${name}Renderer`, renderers })
    transformer = transformStyle(renderer)
  }

  // Reassign resolved style keys to options
  if (isUndefined(styleKeys)) options.styleKeys = keys

  // Scoped value renderer
  const renderValue = (value: any, theme?: T.Theme): any => {
    // Resolve theme value
    let themeValue = resolve(themeKeys, theme)
    if (!isUndefined(themeValue)) {
      if (value !== ".") {
        themeValue = resolve(themeKeys!.map((k) => `${k}.${value}`), theme)
      }
      if (!isNil(themeValue)) value = themeValue
    } else if (defaults) {
      // Resolve defaults value
      const defaultValue = get(value, defaults)
      if (!isNil(defaultValue)) value = defaultValue
    }

    // Transform value
    if (typeof transform === "function") value = transform(value)

    // Skip rendering
    if (styleKeys === null) {
      // Return raw style object
      return isPlainObject(value) ? value : null
    } else {
      // Return rendered style object
      return renderStyle<S>(keys, value)
    }
  }

  // Scoped props renderer
  const renderProps: T.RenderFunction<P, S> = (props: P) => {
    // Get first propsValue from propsKeys
    const propsValue = resolve(propsKeys, props)

    // Return null when value is nil
    if (isNil(propsValue)) return null

    // Build styles array
    const { theme } = props
    const styles: T.StyleArray<S> = []
    const pushStyle = (value: any, query?: string | null) => {
      let result = renderValue(value, theme)
      if (result) {
        if (transformer) result = transformer(result, theme)
        if (query) result = { [query]: result }
        styles.push(result)
      }
    }

    // Handle responsive prop values
    if (isObject(propsValue)) {
      const themeBreaks = theme && theme.breakpoints
      const breakpoints = isUndefined(themeBreaks) ? BREAKPOINTS : themeBreaks
      if (isArray(breakpoints)) {
        breakpoints.forEach((value: any, index) => {
          const breakpoint = get(index, breakpoints)
          const isZero = parseInt(breakpoint, 10) === 0
          const query = isZero ? null : mq(breakpoint)
          const styleValue = resolve([index, value.alias], propsValue)
          if (!isNil(styleValue)) pushStyle(styleValue, query)
        })
      }
    } else pushStyle(propsValue)

    // Return styles array when not empty
    return styles.length ? styles : null
  }

  // Define renderProps function properties
  renderProps.options = options
  renderProps.type = "style" as "style"
  Object.defineProperty(renderProps, "name", { value: name })

  // Return renderProps function
  return renderProps
}

export function variant<P extends T.ThemeProps, S extends T.Style>(
  options: T.VariantOptions
): T.RenderFunction<P, S> {
  const renderProps = style<P, S>({ ...options, styleKeys: null })
  renderProps.type = "variant" as "variant"
  return renderProps
}

export function extend(a: Partial<T.StyleOptions>) {
  return <P extends T.ThemeProps, S extends T.Style>(b: T.StyleOptions) =>
    style<P, S>({ ...a, ...b })
}
