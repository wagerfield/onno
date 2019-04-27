import { Unit, Pred, ThemeProps, StyleOptions, StyleFunction } from "./types"

export const eq = <T>(a: any) => (b: any): b is T => a === b

export const not = (f: Pred) => (x: any) => !f(x)

export const both = <T>(a: Pred, b: Pred) => (x: any): x is T => a(x) && b(x)

export const isType = <T>(type: string) => (x: any): x is T => typeof x === type

export const isNil = (x: any): x is void => x == null

export const isNotNil = not(isNil)

export const isNotNaN = not(isNaN)

export const isNumber = both<number>(isType("number"), isNotNaN)

export const isObject = both(isType("object"), isNotNil)

export const isString = isType<string>("string")

export const isFunction = isType("function")

export const isArray = Array.isArray

export const isZero = eq<0>(0)

export const isNotZero = not(isZero)

export const isUnitless = both<number>(isNumber, isNotZero)

export const addUnit = (unit: string) => (x: Unit): string =>
  isUnitless(x) ? x + unit : x

export const addEm = addUnit("em")

export const addPx = addUnit("px")

export const addPct = addUnit("%")

export const addRem = addUnit("rem")

export const mediaQuery = (x: Unit) =>
  `@media screen and (min-width: ${addPx(x)})`

export const style = <P extends ThemeProps>({
  prop,
  alias,
  cssProperty,
  themeKey,
  transform
}: StyleOptions): StyleFunction<P> => (props: P) => {
  let value = (alias && props[alias]) || props[prop]
  if (props.theme && isString(themeKey)) {
    value = props.theme[themeKey][value]
  }
  if (isFunction(transform)) {
    value = transform(value)
  }
  return { [cssProperty || prop]: value }
}
