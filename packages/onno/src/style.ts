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

export function merge<S extends T.Style>(
  styles: T.StyleArray<S>
): T.StyleObject<S> {
  return styles.reduce((o, s) => Object.assign(o, s), {})
}

export function unique(
  renderers: T.AnyRenderFunction[],
  initial: T.AnyRenderFunction[] = []
): T.AnyRenderFunction[] {
  return renderers.reduce((collection, renderer) => {
    if (renderer.options.renderers) {
      unique(renderer.options.renderers, initial)
    } else if (collection.indexOf(renderer) === -1) {
      collection.push(renderer)
    }
    return collection
  }, initial)
}

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

export function transformStyle<S extends T.Style>(
  renderers: T.AnyRenderFunction[]
): T.StyleTransformFunction<S> {
  const renderer = compose(renderers)
  const { propsKeys, styleKeys } = renderer.options

  // Scoped style transform function
  const transform = (styleObject: T.StyleObject<S>) => {
    const renderedStyle = renderer(styleObject)
    const mergedStyle = renderedStyle && merge(renderedStyle)

    // Iterate over style keys
    return Object.keys(styleObject).reduce((result, key) => {
      const hasPropsKey = propsKeys!.includes(key)
      const hasStyleKey = styleKeys!.includes(key)
      if (hasPropsKey && !hasStyleKey) delete result[key]

      // Transform nested objects
      const value = result[key] as T.StyleObject<S>
      if (isObject(value)) result[key] = transform(value)
      return result
    }, Object.assign({}, styleObject, mergedStyle))
  }

  // Return transform function
  return transform
}

export function style<P extends T.ThemeProps, S extends T.Style = any>(
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
  const transformer = isArray(renderers) && transformStyle(renderers)
  const keys = isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Reassign resolved style keys to options
  if (isUndefined(styleKeys)) options.styleKeys = keys

  // Scoped value renderer
  const renderValue = (value: any, theme?: T.Theme): any => {
    if (!isUndefined(resolve(themeKeys, theme))) {
      // Resolve theme value
      const mappedKeys = themeKeys!.map((k) => `${k}.${value}`)
      const lookupKeys = value === "." ? themeKeys : mappedKeys
      const themeValue = resolve(lookupKeys, theme)
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
      return isObject(value) && !isArray(value) ? value : null
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
    const pushStyle = (value: any, query?: string) => {
      let result = renderValue(value, theme)
      if (result) {
        if (transformer) result = transformer(result)
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

export function compose<P extends T.ThemeProps, S extends T.Style>(
  renderers: T.AnyRenderFunction[]
): T.RenderFunction<P, S>

export function compose<P extends T.ThemeProps, S extends T.Style>(
  ...renderers: T.AnyRenderFunction[]
): T.RenderFunction<P, S>

export function compose<P extends T.ThemeProps, S extends T.Style>(
  ...args: any[]
): T.RenderFunction<P, S> {
  const renderers = unique(toArray(args))
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
    const result: T.StyleArray<S> = renderers.reduce((styles, renderer) => {
      const output = renderer(props)
      if (output) push.apply(styles, output)
      return styles
    }, [])

    // Return the composed style object
    return result.length ? result : null
  }

  // Return renderProps function
  renderProps.type = "compose" as "compose"
  renderProps.options = options
  return renderProps
}

export function variant<P extends T.ThemeProps, S extends T.Style = any>(
  options: T.StyleOptions
): T.RenderFunction<P, S> {
  const renderProps = style<P, S>({ ...options, styleKeys: null })
  renderProps.type = "variant" as "variant"
  return renderProps
}

export function extend(a: Partial<T.StyleOptions>) {
  return <P extends T.ThemeProps, S extends T.Style>(b: T.StyleOptions) =>
    style<P, S>({ ...a, ...b })
}
