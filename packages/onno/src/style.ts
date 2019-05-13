import * as T from "./types"
import { get, mq, resolve, uniq, isArray, isNil, isUndefined } from "./utils"

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

export function style<P extends T.ThemeProps, S extends T.Style>(
  options: T.StyleOptions
): T.StyleFunction<P, S> {
  const { propsKeys, styleKeys, themeKeys, transform, defaults } = options
  const keys = isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

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

    // Render style object
    return render<S>(keys as T.Keys, value)
  }

  // Create scoped renderProps style function
  const renderProps: T.StyleFunction<P, S> = (props: P) => {
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
    if (typeof propsValue === "object") {
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

  // Store options
  renderProps.options = options

  // Set composed flag
  renderProps.composed = false

  // Return renderProps function
  return renderProps
}

export function compose<P extends T.ThemeProps, S extends T.Style>(
  styles: T.StyleFunction<any, any>[]
): T.StyleFunction<P, S> {
  const styleSet = uniq(styles)
  const options: T.StyleOptions = {
    propsKeys: [],
    styleKeys: [],
    themeKeys: []
  }

  // Build options keys
  styleSet.forEach((fn) =>
    KEYS.forEach((key) => {
      const keys = fn.options[key]
      if (keys) push.apply(options[key], keys)
    })
  )

  // Make keys unique
  KEYS.forEach((key) => (options[key] = uniq(options[key]!)))

  // Create scoped renderProps style function
  const renderProps = (props: P) => {
    const result: S[] = []
    styleSet.forEach((fn) => {
      const r = fn(props)
      if (r) push.apply(result, r)
    })
    return result.length ? result : null
  }

  // Store options
  renderProps.options = options

  // Set composed flag
  renderProps.composed = true

  // Return renderProps function
  return renderProps
}

export const extend = (a: Partial<T.StyleOptions>) => <
  P extends T.ThemeProps,
  S extends T.Style
>(
  b: T.StyleOptions
) => style<P, S>({ ...a, ...b })
