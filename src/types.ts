export type Pred = (value: any) => boolean

export type Unit = number | string

export interface ThemeListObject {
  alias: string
  value: Unit
}

export type ThemeListValue = ThemeListObject | Unit

export type ThemeList = ThemeListValue[]

export type ThemeMapValue = ThemeMap | ThemeList | Unit

export interface ThemeMap {
  [key: string]: ThemeMapValue
  [key: number]: ThemeMapValue
}

export type ThemeValue = ThemeMap | ThemeList

export interface Theme {
  [key: string]: ThemeValue
  breakpoints: ThemeValue
  lineHeights: ThemeValue
  fontFamilies: ThemeValue
  fontWeights: ThemeValue
  fontSizes: ThemeValue
  borders: ThemeValue
  palette: ThemeValue
  shadows: ThemeValue
  sizes: ThemeValue
  space: ThemeValue
  radii: ThemeValue
  base: ThemeValue
}

export interface ThemeProps {
  [key: string]: any
  theme?: Theme
}

export type TransformFunction = (value: any) => any

export interface StyleOptions {
  prop: string
  alias?: string
  themeKey?: string
  cssProperty?: string
  transform?: TransformFunction
}

export interface StyleObject {
  [key: string]: StyleObject | Unit
}

export type StyleFunction<P extends ThemeProps> = (props: P) => StyleObject
