export type Length = number

export type Nil = null | undefined

export type Primitive = boolean | number | string

export type Key = string

export type Keys = Key[]

export type Func = (...args: any[]) => any

export type Pred = (...args: any[]) => boolean

export type ResponsivePropArray<P> = P[]

export interface ResponsivePropObject<P> {
  [key: string]: P
}

export type ResponsiveProp<P> = ResponsivePropArray<P> | ResponsivePropObject<P>

export type Prop<P> = P | ResponsiveProp<P> | Nil

export interface Alias {
  alias: Key
  value: Primitive | ThemeValue
}

export type ThemeArrayValue = Alias | Primitive

export type ThemeArray = ThemeArrayValue[]

export interface ThemeObject {
  [key: string]: ThemeObject | ThemeArray | Primitive
}

export type ThemeValue = ThemeArray | ThemeObject | Nil

export type Breakpoints = ThemeArray | Nil

export interface Theme {
  [key: string]: ThemeValue
  // Breakpoints
  breakpoints?: Breakpoints
  // Global
  global?: ThemeValue
  // Animation
  animations?: ThemeValue
  transitions?: ThemeValue
  // Border
  borders?: ThemeValue
  borderRadii?: ThemeValue
  borderStyles?: ThemeValue
  borderWidths?: ThemeValue
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
  boxShadows?: ThemeValue
  textShadows?: ThemeValue
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
