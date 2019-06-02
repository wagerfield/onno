import * as C from "csstype"
import * as T from "./types"
import { compose, style } from "./style"

// Perspective

export type PerspectiveValue = C.PerspectiveProperty<T.Length>

export type PerspectiveProp = T.Prop<PerspectiveValue>

export interface PerspectiveProps extends T.ThemeProps {
  perspective?: PerspectiveProp
  ps?: PerspectiveProp
}

export interface PerspectiveStyle extends T.Style {
  perspective?: PerspectiveValue
}

export const perspective = style<PerspectiveProps, PerspectiveStyle>({
  propsKeys: ["perspective", "ps"]
})

// Perspective Origin

export type PerspectiveOriginValue = C.PerspectiveOriginProperty<T.Length>

export type PerspectiveOriginProp = T.Prop<PerspectiveOriginValue>

export interface PerspectiveOriginProps extends T.ThemeProps {
  perspectiveOrigin?: PerspectiveOriginProp
  pso?: PerspectiveOriginProp
}

export interface PerspectiveOriginStyle extends T.Style {
  perspectiveOrigin?: PerspectiveOriginValue
}

export const perspectiveOrigin = style<
  PerspectiveOriginProps,
  PerspectiveOriginStyle
>({
  propsKeys: ["perspectiveOrigin", "pso"]
})

// Transform

export type TransformValue = C.TransformProperty

export type TransformProp = T.Prop<TransformValue>

export interface TransformProps extends T.ThemeProps {
  transform?: TransformProp
  tf?: TransformProp
}

export interface TransformStyle extends T.Style {
  transform?: TransformValue
}

export const transform = style<TransformProps, TransformStyle>({
  propsKeys: ["transform", "tf"]
})

// Transform Origin

export type TransformOriginValue = C.TransformOriginProperty<T.Length>

export type TransformOriginProp = T.Prop<TransformOriginValue>

export interface TransformOriginProps extends T.ThemeProps {
  transformOrigin?: TransformOriginProp
  tfo?: TransformOriginProp
}

export interface TransformOriginStyle extends T.Style {
  transformOrigin?: TransformOriginValue
}

export const transformOrigin = style<
  TransformOriginProps,
  TransformOriginStyle
>({
  propsKeys: ["transformOrigin", "tfo"]
})

// Transform Set

export type TransformSetProps = PerspectiveProps &
  PerspectiveOriginProps &
  TransformProps &
  TransformOriginProps

export type TransformSetStyle = PerspectiveStyle &
  PerspectiveOriginStyle &
  TransformStyle &
  TransformOriginStyle

export const transformSet = compose<TransformSetProps, TransformSetStyle>({
  name: "transform",
  renderers: [perspective, perspectiveOrigin, transform, transformOrigin]
})
