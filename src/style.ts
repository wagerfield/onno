import * as T from "./types"
import * as U from "./utils"

export const createStyle = <S extends T.Style>(value?: any, keys?: T.Keys) => {
  if (U.isNil(value) || !U.isArray(keys)) return null
  return keys.reduce(
    (s, k) => {
      s[k] = value
      return s
    },
    {} as S
  )
}

export const style = <P extends T.Props, S extends T.Style>({
  propsKeys,
  styleKeys,
  themeKeys,
  transform,
  fallback
}: T.StyleOptions): T.StyleFunction<P, S> => (props: P) => {
  // Get first props value from propsKeys
  let value = U.get(propsKeys)(props)

  // Return null when value is undefined
  if (U.isNil(value)) return null

  // Resolve fallback value
  const fallbackValue = U.get([value])(fallback)
  value = U.isNil(fallbackValue) ? value : fallbackValue

  // Resolve style keys
  const keys = U.isArray(styleKeys) ? styleKeys : propsKeys.slice(0, 1)

  // Transform value
  if (typeof transform === "function") value = transform(value)

  // Create style from value and keys
  const result = createStyle<S>(value, keys)

  // Return style array
  return result && [result]
}

export const compose = <P extends T.Props, S extends T.Style>(
  styles: T.StyleFunction<any, any>[]
): T.StyleFunction<P, S> => (props: P) =>
  styles.reduce(
    (a, f) => {
      const s = f(props)
      return s ? a.concat(s) : a
    },
    [] as S[]
  )

export const extend = (a: Partial<T.StyleOptions>) => <
  P extends T.Props,
  S extends T.Style
>(
  b: T.StyleOptions
) => style<P, S>({ ...a, ...b })
