export type Length = number

export type Nil = null | undefined

export type Primitive = number | string

export type Key = string

export type Keys = Key[]

export type Func = (...args: any[]) => any

export type Pred = (...args: any[]) => boolean

export type ResponsivePropArray<T> = T[]

export interface ResponsivePropObject<T> {
  [key: string]: T
}

export type ResponsiveProp<T> = ResponsivePropArray<T> | ResponsivePropObject<T>

export type Prop<T> = T | ResponsiveProp<T> | Nil

export interface Alias<T> {
  alias: Key
  value: T
}

export type ThemeArrayValue<T> = Alias<T> | T

export type ThemeArray<T> = ThemeArrayValue<T>[]

export interface ThemeObject<T> {
  [key: string]: ThemeObject<T> | ThemeArray<T> | T
}

export type ThemeValue<T = Primitive> = ThemeArray<T> | ThemeObject<T> | null

export type Breakpoints<T = Primitive> = ThemeArray<T> | null

export interface Theme {
  [key: string]: ThemeValue | undefined
  // Breakpoints
  breakpoints?: Breakpoints
  // Global
  global?: ThemeValue
  // Animation
  animations?: ThemeValue
  transitions?: ThemeValue
  // Border
  borders?: ThemeValue
  borderStyles?: ThemeValue
  borderWidths?: ThemeValue
  // Radii
  borderRadii?: ThemeValue
  radii?: ThemeValue
  // Color
  colors?: ThemeValue
  // Display
  opacities?: ThemeValue
  // Layout
  sizes?: ThemeValue
  widths?: ThemeValue
  minWidths?: ThemeValue
  maxWidths?: ThemeValue
  heights?: ThemeValue
  minHeights?: ThemeValue
  maxHeights?: ThemeValue
  zIndices?: ThemeValue
  // Shadow
  textShadows?: ThemeValue
  boxShadows?: ThemeValue
  // Space
  spaces?: ThemeValue
  // Text
  fontFamilies?: ThemeValue
  fontSizes?: ThemeValue
  fontWeights?: ThemeValue
  lineHeights?: ThemeValue
  letterSpacings?: ThemeValue
  // Variants
  buttonStyles?: ThemeValue
  colorStyles?: ThemeValue
  textStyles?: ThemeValue
  // Components
  components?: ThemeValue
}

export interface ThemeProps {
  theme?: Theme
}

export type TransformFunction = (value: any) => any

export type StyleOptionsKeys = "propsKeys" | "styleKeys" | "themeKeys"

export interface VariantOptions {
  propsKeys: Keys
  themeKeys?: Keys
  transform?: TransformFunction
  defaults?: ThemeValue
}

export interface StyleOptions extends VariantOptions {
  styleKeys?: Keys | null
}

export interface Style {
  [key: string]: number | string | string[] | undefined
}

export interface NestedStyle<S extends Style> {
  [key: string]: S
}

export type StyleObject<S extends Style> = S | NestedStyle<S>

export type StyleArray<S extends Style> = StyleObject<S>[]

export interface RenderFunction<P extends ThemeProps, S extends Style> {
  (props: P): StyleArray<S> | null
  options: StyleOptions
  composed: boolean
}

export type AnyRenderFunction = RenderFunction<any, any>
