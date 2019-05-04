import * as T from "./types"
import * as U from "./utils"

const BREAKPOINTS: T.Breakpoints = [
  { alias: "xs", value: 360 * 0 },
  { alias: "sm", value: 360 * 1 },
  { alias: "md", value: 360 * 2 },
  { alias: "lg", value: 360 * 3 },
  { alias: "xl", value: 360 * 4 }
]

export const render = <S extends T.Style>(keys?: T.Keys, value?: any) =>
  !U.isNil(value) && U.isArray(keys) && keys.length
    ? keys.reduce(
        (s, k) => {
          s[k] = value
          return s
        },
        {} as S
      )
    : null

export const style = <P extends T.ThemeProps, S extends T.Style>({
  propsKeys,
  styleKeys,
  themeKeys,
  transform,
  fallback
}: T.StyleOptions): T.StyleFunction<P, S> => {
  const keys = U.isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Create scoped renderValue function
  const renderValue = (value: any, theme?: T.Theme) => {
    let themed = false

    // Resolve theme value
    if (theme && U.isArray(themeKeys)) {
      const mappedKeys = themeKeys.map((k) => `${k}.${value}`)
      const themeValue = U.resolve(mappedKeys, theme)
      themed = !U.isNil(themeValue)
      if (themed) value = themeValue
    }

    // Resolve fallback value
    if (fallback && !themed) {
      const fallbackValue = U.get(value, fallback)
      if (!U.isNil(fallbackValue)) value = fallbackValue
    }

    // Transform value
    if (typeof transform === "function") value = transform(value)

    // Render style object
    return render<S>(keys, value)
  }
  // Return style function
  return (props: P) => {
    // Get first propsValue from propsKeys
    const propsValue = U.resolve(propsKeys, props)

    // Return null when value is undefined
    if (U.isNil(propsValue)) return null

    // Build styles array
    const { theme } = props
    const styles: T.StyleArray<S> = []
    const pushStyle = (value: any, query?: string) => {
      let result: T.StyleObject<S> | null = renderValue(value, theme)
      if (result && query) result = { [query]: result }
      if (result) styles.push(result)
    }

    // Handle responsive prop values
    if (typeof propsValue === "object") {
      const breakpoints = (theme && theme.breakpoints) || BREAKPOINTS
      if (U.isArray(breakpoints)) {
        breakpoints.forEach((value: any, index) => {
          const breakpoint = U.get(index, breakpoints)
          const styleValue = U.resolve([index, value.alias], propsValue)
          if (!U.isNil(styleValue)) pushStyle(styleValue, U.mq(breakpoint))
        })
      }
    } else pushStyle(propsValue)

    // Return styles array when not empty
    return styles.length ? styles : null
  }
}

export const extend = (a: Partial<T.StyleOptions>) => <
  P extends T.ThemeProps,
  S extends T.Style
>(
  b: T.StyleOptions
) => style<P, S>({ ...a, ...b })

export const compose = <P extends T.ThemeProps, S extends T.Style>(
  styles: T.StyleFunction<any, any>[]
): T.StyleFunction<P, S> => (props: P) =>
  styles.reduce(
    (a, f) => {
      const r = f(props)
      return r ? a.concat(r) : a
    },
    [] as S[]
  )
