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

export interface Alias<T = Primitive> {
  alias: Key
  value: T
}

// Theme

export type ThemeArrayValue<T> = Alias<T> | T

export type ThemeArray<T = Primitive> = ThemeArrayValue<T>[]

export interface ThemeObject<T = Primitive> {
  [key: string]: ThemeObject<T> | ThemeArray<T> | T
}

export type ThemeValue<T = Primitive> = ThemeArray<T> | ThemeObject<T> | Nil

export type Breakpoints<T = Primitive> = ThemeArray<T> | Nil

export interface Theme {
  [key: string]: ThemeValue
  // Breakpoints
  breakpoints?: Breakpoints
  // Animation
  animations?: ThemeValue
  transitions?: ThemeValue
  // Border
  borders?: ThemeValue
  borderStyles?: ThemeValue
  borderWidths?: ThemeValue
  borderRadii?: ThemeValue
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
  // Styles
  globalStyles?: ThemeValue
  buttonStyles?: ThemeValue
  colorStyles?: ThemeValue
  textStyles?: ThemeValue
  // Components
  components?: ThemeValue
}

export interface ThemeProps {
  theme?: Theme
}

export interface Props extends ThemeProps {
  [key: string]: any
}

// Style

export type StyleValue = number | string | string[] | undefined

export interface Style {
  [key: string]: StyleValue
}

export interface StyleObject<S extends Style> {
  [key: string]: StyleObject<S> | StyleValue
}

export type StyleArray<S extends Style> = StyleObject<S>[]

// Options

export type StyleOptionsKeys = "propsKeys" | "styleKeys" | "themeKeys"

export interface StyleOptions {
  propsKeys: Keys
  styleKeys?: Keys | null
  themeKeys?: Keys
  transform?: ValueTransformFunction
  renderers?: AnyRenderFunction[]
  defaults?: ThemeValue
}

export interface ComposeOptions {
  renderers: AnyRenderFunction[]
  name: string
}

export interface OmitOptions {
  propsKeys?: Keys
  renderers?: AnyRenderFunction[]
}

export interface ComposedRenderOptions {
  propsKeys: Keys
  styleKeys: Keys
  themeKeys: Keys
  renderers: AnyRenderFunction[]
}

export type VariantOptions = Omit<StyleOptions, "styleKeys">

export type InterpolateOptions = ComposeOptions

// Transform Functions

export type OmitFunction<P extends ThemeProps> = (value: P) => Partial<P>

export type ValueTransformFunction = (value: any) => any

export interface StyleTransformFunction<P extends ThemeProps, S extends Style> {
  (style?: StyleObject<S>, theme?: Theme): StyleObject<S> | null
  renderer: ComposedRenderFunction<P, S>
  options: InterpolateOptions
}

// Render Functions

export type RenderFunctionType = "style" | "compose" | "variant"

export interface RenderFunction<P extends ThemeProps, S extends Style> {
  (props: P): StyleArray<S> | null
  options: StyleOptions
  type: RenderFunctionType
}

export interface ComposedRenderFunction<P extends ThemeProps, S extends Style>
  extends RenderFunction<P, S> {
  options: ComposedRenderOptions
}

export type AnyRenderFunction = RenderFunction<any, any>
