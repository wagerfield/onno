import * as T from "./types"
import {
  mq,
  get,
  uniq,
  resolve,
  toArray,
  isArray,
  isNil,
  isObject,
  isUndefined
} from "./utils"

const KEYS: T.StyleOptionsKeys[] = ["propsKeys", "styleKeys", "themeKeys"]

const BREAKPOINTS: T.Breakpoints = ["xs", "sm", "md", "lg", "xl"].map(
  (alias, index) => ({ alias, value: index * 360 })
)

const push = Array.prototype.push

export function render<S extends T.Style>(keys?: T.Keys, value?: any) {
  if (isNil(value) || !isArray(keys) || !keys.length) return null
  return keys.reduce(
    (s, k) => {
      s[k] = value
      return s
    },
    {} as S
  )
}

export function style<P extends T.ThemeProps, S extends T.Style = any>(
  options: T.StyleOptions
): T.RenderFunction<P, S> {
  const { propsKeys, styleKeys, themeKeys, transform, defaults } = options

  // Create scoped renderValue style function
  const renderValue = (value: any, theme?: T.Theme) => {
    if (!isUndefined(resolve(themeKeys, theme))) {
      // Resolve theme value
      const mappedKeys = themeKeys!.map((k) => `${k}.${value}`)
      const themeValue = resolve(mappedKeys, theme)
      if (!isNil(themeValue)) value = themeValue
    } else if (defaults) {
      // Resolve default value
      const defaultValue = get(value, defaults)
      if (!isNil(defaultValue)) value = defaultValue
    }

    // Transform value
    if (typeof transform === "function") value = transform(value)

    // Resolve style object
    if (styleKeys === null) {
      // Return style object
      return isObject(value) && !isArray(value) ? (value as S) : null
    } else {
      // Render style object
      const keys = isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)
      return render<S>(keys, value)
    }
  }

  // Create scoped renderProps style function
  const renderProps: T.RenderFunction<P, S> = (props: P) => {
    // Get first propsValue from propsKeys
    const propsValue = resolve(propsKeys, props)

    // Return null when value is undefined
    if (isNil(propsValue)) return null

    // Build styles array
    const { theme } = props
    const styles: T.StyleArray<S> = []
    const pushStyle = (value: any, query?: string) => {
      const result: T.StyleObject<S> | null = renderValue(value, theme)
      return result && styles.push(query ? { [query]: result } : result)
    }

    // Handle responsive prop values
    if (isObject(propsValue)) {
      const themeBreaks = theme && theme.breakpoints
      const breakpoints = isUndefined(themeBreaks) ? BREAKPOINTS : themeBreaks
      if (isArray(breakpoints)) {
        breakpoints.forEach((value: any, index) => {
          const breakpoint = get(index, breakpoints)
          const styleValue = resolve([index, value.alias], propsValue)
          if (!isNil(styleValue)) pushStyle(styleValue, mq(breakpoint))
        })
      }
    } else pushStyle(propsValue)

    // Return styles array when not empty
    return styles.length ? styles : null
  }

  // Set options and composed
  renderProps.options = options
  renderProps.composed = false
  return renderProps
}

export function compose<P extends T.ThemeProps, S extends T.Style>(
  renderers: T.AnyRenderFunction[]
): T.RenderFunction<P, S>

export function compose<P extends T.ThemeProps, S extends T.Style>(
  ...renderers: T.AnyRenderFunction[]
): T.RenderFunction<P, S>

export function compose<P extends T.ThemeProps, S extends T.Style>(
  ...args: any[]
): T.RenderFunction<P, S> {
  const renderers = uniq<T.AnyRenderFunction>(toArray(args))
  const options: T.StyleOptions = {
    propsKeys: [],
    styleKeys: [],
    themeKeys: []
  }

  // Build options keys
  renderers.forEach((fn) =>
    KEYS.forEach((key) => {
      const keys = fn.options[key]
      if (keys) push.apply(options[key], keys)
    })
  )

  // Make keys unique
  KEYS.forEach((key) => (options[key] = uniq(options[key]!)))

  // Create scoped renderProps style function
  const renderProps: T.RenderFunction<P, S> = (props: P) => {
    const result: S[] = []
    renderers.forEach((fn) => {
      const r = fn(props)
      if (r) push.apply(result, r)
    })
    return result.length ? result : null
  }

  // Set options and composed
  renderProps.options = options
  renderProps.composed = true
  return renderProps
}

export const extend = (a: Partial<T.StyleOptions>) => <
  P extends T.ThemeProps,
  S extends T.Style
>(
  b: T.StyleOptions
) => style<P, S>({ ...a, ...b })

export const variant = <P extends T.ThemeProps, S extends T.Style = any>(
  options: T.VariantOptions
): T.RenderFunction<P, S> => style<P, S>({ ...options, styleKeys: null })
