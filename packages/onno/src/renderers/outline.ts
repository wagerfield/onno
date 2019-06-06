import * as C from "csstype"
import * as T from "../types"
import { addPx } from "../utils"
import { compose } from "../compose"
import { extend, style } from "../style"
import { outlineColor, OutlineColorProps, OutlineColorStyle } from "./color"

const ex = extend({
  transform: addPx
})

// Outline

export type OutlineValue = C.OutlineProperty<T.Length>

export type OutlineProp = T.Prop<OutlineValue>

export interface OutlineProps extends T.ThemeProps {
  outline?: OutlineProp
  ol?: OutlineProp
}

export interface OutlineStyle extends T.Style {
  outline?: OutlineValue
}

export const outline = ex<OutlineProps, OutlineStyle>({
  propsKeys: ["outline", "ol"],
  themeKeys: ["outlines", "borders"]
})

// Outline Offset

export type OutlineOffsetValue = C.OutlineOffsetProperty<T.Primitive>

export type OutlineOffsetProp = T.Prop<OutlineOffsetValue>

export interface OutlineOffsetProps extends T.ThemeProps {
  outlineOffset?: OutlineOffsetProp
  olo?: OutlineOffsetProp
}

export interface OutlineOffsetStyle extends T.Style {
  outlineOffset?: OutlineOffsetValue
}

export const outlineOffset = ex<OutlineOffsetProps, OutlineOffsetStyle>({
  propsKeys: ["outlineOffset", "olo"],
  themeKeys: ["outlineOffsets"]
})

// Outline Style

export type OutlineStyleValue = C.OutlineStyleProperty

export type OutlineStyleProp = T.Prop<OutlineStyleValue>

export interface OutlineStyleProps extends T.ThemeProps {
  outlineStyle?: OutlineStyleProp
  ols?: OutlineStyleProp
}

export interface OutlineStyleStyle extends T.Style {
  outlineStyle?: OutlineStyleValue
}

export const outlineStyle = style<OutlineStyleProps, OutlineStyleStyle>({
  propsKeys: ["outlineStyle", "ols"],
  themeKeys: ["outlineStyles", "borderStyles"]
})

// Outline Width

export type OutlineWidthValue = C.OutlineWidthProperty<T.Primitive>

export type OutlineWidthProp = T.Prop<OutlineWidthValue>

export interface OutlineWidthProps extends T.ThemeProps {
  outlineWidth?: OutlineWidthProp
  olw?: OutlineWidthProp
}

export interface OutlineWidthStyle extends T.Style {
  outlineWidth?: OutlineWidthValue
}

export const outlineWidth = ex<OutlineWidthProps, OutlineWidthStyle>({
  propsKeys: ["outlineWidth", "olw"],
  themeKeys: ["outlineWidths", "borderWidths"]
})

// Outline Set

export type OutlineSetProps = OutlineProps &
  OutlineColorProps &
  OutlineOffsetProps &
  OutlineStyleProps &
  OutlineWidthProps

export type OutlineSetStyle = OutlineStyle &
  OutlineColorStyle &
  OutlineOffsetStyle &
  OutlineStyleStyle &
  OutlineWidthStyle

export const outlineSet = compose<OutlineSetProps, OutlineSetStyle>({
  name: "outline",
  renderers: [outline, outlineColor, outlineOffset, outlineStyle, outlineWidth]
})
