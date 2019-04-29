export type Unit = number | string

export type PathKey = number | string | null

export type Path = PathKey[]

export type Predicate = (value: any) => boolean

export type Reducer<T> = (acc: T, val: T) => T

export type TypeGuard<T> = (x: any) => x is T

export interface Alias {
  alias: string
  value: Unit
}

export interface Props {
  [key: string]: any
}

export type ThemeArrayValue = Alias | Unit

export type ThemeArray = ThemeArrayValue[]

export interface ThemeObject {
  [key: string]: ThemeObject | ThemeArray | Unit
}

export type ThemeValue = ThemeArray | ThemeObject | void

export interface Theme {
  [key: string]: ThemeValue
  // Breakpoints
  breakpoints?: ThemeValue
  // Typography
  lineHeights?: ThemeValue
  letterSpacings?: ThemeValue
  fontFamilies?: ThemeValue
  fontWeights?: ThemeValue
  fontSizes?: ThemeValue
  // Color
  palette?: ThemeValue
  colors?: ThemeValue
  // Layout
  space?: ThemeValue
  sizes?: ThemeValue
  widths?: ThemeValue
  maxWidths?: ThemeValue
  minWidths?: ThemeValue
  heights?: ThemeValue
  maxHeights?: ThemeValue
  minHeights?: ThemeValue
  // Border
  borders?: ThemeValue
  borderStyles?: ThemeValue
  borderWidths?: ThemeValue
  // Misc
  radii?: ThemeValue
  shadows?: ThemeValue
  // Variants
  buttons?: ThemeValue
  textStyles?: ThemeValue
  colorStyles?: ThemeValue
}

export interface ThemeProps extends Props {
  theme?: Theme
}

export type Keys = string[]

export type TransformFunction = (value: any) => any

export interface StyleOptions {
  propsKeys: Keys
  styleKeys: Keys
  themeKeys?: Keys
  transform?: TransformFunction
  fallback?: any
}

export interface StyleObject {
  [key: string]: StyleObject | Unit
}

export type StyleFunction = <P>(props: P) => null | StyleObject | StyleObject[]
