export type Unit = number | string

export type PathKey = number | string | void

export type Path = PathKey[]

export type Predicate = (value: any) => boolean

export type TypeGuard<T> = (x: any) => x is T

export interface Alias {
  alias: string
  value: Unit
}

export interface Theme {
  [key: string]: any
}

export interface ThemeProps {
  [key: string]: any
  theme?: Theme
}

export type TransformFunction = (value: any) => any

export interface StyleOptions {
  propsKeys: string[]
  styleKeys: string[]
  themeKey?: string
  fallback?: any
  transform?: TransformFunction
}

export interface StyleObject {
  [key: string]: StyleObject | Unit
}

export type StyleFunction = <P>(props: P) => null | StyleObject | StyleObject[]
