export type Length = number

export type Nil = null | undefined

export type Unit = number | string

export type Key = string

export type Keys = Key[]

export type Predicate = (...args: any[]) => boolean

export type ResponsivePropArray<P> = P[]

export interface ResponsivePropObject<P> {
  [key: string]: P
}

export type ResponsiveProp<P> = ResponsivePropArray<P> | ResponsivePropObject<P>

export type Prop<P = Unit> = P | ResponsiveProp<P> | Nil

export interface Props {
  [key: string]: any
}

export interface Alias {
  alias: Key
  value: Unit
}

export type ThemeArrayValue = Alias | Unit

export type ThemeArray = ThemeArrayValue[]

export interface ThemeObject {
  [key: string]: ThemeObject | ThemeArray | Unit
}

export type ThemeValue = ThemeArray | ThemeObject | Nil

export type BreakpointsArray = ThemeArray

export interface BreakpointsObject {
  [key: string]: Unit
}

export type Breakpoints = BreakpointsArray | BreakpointsObject | Nil

export interface Theme {
  [key: string]: ThemeValue
  // Breakpoints
  breakpoints?: Breakpoints
  // Global
  global?: ThemeValue
  // Color
  colors?: ThemeValue
  palette?: ThemeValue
  // Space
  space?: ThemeValue
  spaces?: ThemeValue
  // Layout
  widths?: ThemeValue
  minWidths?: ThemeValue
  maxWidths?: ThemeValue
  heights?: ThemeValue
  minHeights?: ThemeValue
  maxHeights?: ThemeValue
  sizes?: ThemeValue
  // Typography
  lineHeights?: ThemeValue
  letterSpacings?: ThemeValue
  fontFamilies?: ThemeValue
  fontWeights?: ThemeValue
  fontSizes?: ThemeValue
  // Border
  borders?: ThemeValue
  borderStyles?: ThemeValue
  borderWidths?: ThemeValue
  // Misc
  radii?: ThemeValue
  shadows?: ThemeValue
  zIndices?: ThemeValue
  // Variants
  buttons?: ThemeValue
  textStyles?: ThemeValue
  colorStyles?: ThemeValue
}

export interface ThemeProps extends Props {
  theme?: Theme
}

export type TransformFunction = (value: any) => any

export interface StyleOptions {
  propsKeys: Keys
  styleKeys?: Keys
  themeKeys?: Keys
  transform?: TransformFunction
  fallback?: ThemeValue
}

export type StyleValue = Unit | string[] // string[] for fallback values

export interface Style {
  [key: string]: StyleValue
}

export interface NestedStyle<S extends Style> {
  [key: string]: S
}

export type StyleArrayValue<S extends Style> = S | NestedStyle<S>

export type StyleArray<S extends Style> = StyleArrayValue<S>[]

export type StyleFunction<P extends Props, S extends Style> = (
  props: P
) => StyleArray<S> | null
