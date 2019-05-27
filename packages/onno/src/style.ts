import * as T from "./types"
import {
  mq,
  get,
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

export function renderStyle<S extends T.Style>(
  keys?: T.Keys,
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

export function style<P extends T.ThemeProps, S extends T.Style = any>(
  options: T.StyleOptions
): T.RenderFunction<P, S> {
  const { propsKeys, styleKeys, themeKeys, transform, defaults } = options
  const keys = isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Scoped value renderer
  const renderValue = (value: any, theme?: T.Theme): S | null => {
    if (!isUndefined(resolve(themeKeys, theme))) {
      // Resolve theme value
      const mappedKeys = themeKeys!.map((k) => `${k}.${value}`)
      const themeValue = resolve(mappedKeys, theme)
      if (!isNil(themeValue)) value = themeValue
    } else if (defaults) {
      // Resolve defaults value
      const defaultValue = get(value, defaults)
      if (!isNil(defaultValue)) value = defaultValue
    }

    // Transform value
    if (typeof transform === "function") value = transform(value)

    // Return raw value or rendered style object
    if (styleKeys === null) {
      return isObject(value) && !isArray(value) ? (value as S) : null
    } else {
      return renderStyle<S>(keys, value)
    }
  }

  // Scoped props renderer
  const renderProps: T.RenderFunction<P, S> = (props: P) => {
    // Get first propsValue from propsKeys
    const propsValue = resolve(options.propsKeys, props)

    // Return null when value is nil
    if (isNil(propsValue)) return null

    // Build styles array
    const { theme } = props
    const styles: T.StyleArray<S> = []
    const pushStyle = (value: any, query?: string) => {
      const result = renderValue(value, theme)
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

  // Return renderProps function
  renderProps.type = "style" as "style"
  renderProps.options = options
  return renderProps
}

export function uniq(
  renderers: T.AnyRenderFunction[],
  initial: T.AnyRenderFunction[] = []
): T.AnyRenderFunction[] {
  return renderers.reduce((collection, renderer) => {
    if (renderer.options.renderers) {
      uniq(renderer.options.renderers, initial)
    } else if (collection.indexOf(renderer) === -1) {
      collection.push(renderer)
    }
    return collection
  }, initial)
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
  const renderers = uniq(toArray(args))
  const options: T.StyleOptions = {
    propsKeys: [],
    styleKeys: [],
    themeKeys: [],
    renderers
  }

  // Build options keys
  renderers.forEach((fn) =>
    KEYS.forEach((key) => {
      const keys = fn.options[key]
      if (keys) push.apply(options[key], keys)
    })
  )

  // Create scoped renderProps style function
  const renderProps: T.RenderFunction<P, S> = (props: P) => {
    const result: S[] = []
    renderers.forEach((fn) => {
      const r = fn(props)
      if (r) push.apply(result, r)
    })
    return result.length ? result : null
  }

  // Return render function
  renderProps.type = "compose" as "compose"
  renderProps.options = options
  return renderProps
}

export const extend = (a: Partial<T.StyleOptions>) => <
  P extends T.ThemeProps,
  S extends T.Style
>(
  b: T.StyleOptions
) => style<P, S>({ ...a, ...b })

export function variant<P extends T.ThemeProps, S extends T.Style = any>(
  options: T.StyleOptions
): T.RenderFunction<P, S> {
  const renderProps = style<P, S>({ ...options, styleKeys: null })

  // Return render function
  renderProps.type = "variant" as "variant"
  return renderProps
}
