import * as T from "./types"
import * as U from "./utils"

export const breakpoints = [
  { alias: "sm", value: 360 },
  { alias: "md", value: 720 },
  { alias: "lg", value: 1080 },
  { alias: "xl", value: 1440 }
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
}: T.StyleOptions): T.StyleFunction<P, S> => (props: P) => {
  // Get first props value from propsKeys
  let value = U.get(propsKeys, props)

  // Return null when value is undefined
  if (U.isNil(value)) return null

  // Set themed flag
  let themed = false

  // Resolve theme value
  if (props.theme && U.isArray(themeKeys)) {
    const mappedKeys = themeKeys.map((k) => `${k}.${value}`)
    const themeValue = U.get(mappedKeys, props.theme)
    themed = !U.isNil(themeValue)
    if (themed) value = themeValue
  }

  // Resolve fallback value
  if (fallback && !themed) {
    const fallbackValue = U.get([value], fallback)
    if (!U.isNil(fallbackValue)) value = fallbackValue
  }

  // Transform value
  if (typeof transform === "function") value = transform(value)

  // Resolve style keys
  const keys = U.isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Render style from keys and value
  const result = render<S>(keys, value)

  // Return style array
  return result && [result]
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
