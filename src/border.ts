import * as C from "csstype"
import * as T from "./types"
import * as S from "./style"
import * as U from "./utils"
import * as P from "./color"
import * as F from "./fallback"

const ex = S.extend({
  themeKeys: ["borders"],
  transform: U.addPx
})

// Border

export type BorderValue = C.BorderProperty<T.Length>

export type BorderProp = T.Prop<BorderValue>

export interface BorderProps extends T.ThemeProps {
  border?: BorderProp
  bd?: BorderProp
}

export interface BorderStyle extends T.Style {
  border: BorderValue
}

export const border = ex<BorderProps, BorderStyle>({
  propsKeys: ["border", "bd"]
})

// Border Top

export interface BorderTopProps extends T.ThemeProps {
  borderTop?: BorderProp
  bdt?: BorderProp
}

export interface BorderTopStyle extends T.Style {
  borderTop: BorderValue
}

export const borderTop = ex<BorderTopProps, BorderTopStyle>({
  propsKeys: ["borderTop", "bdt"]
})

// Border Right

export interface BorderRightProps extends T.ThemeProps {
  borderRight?: BorderProp
  bdr?: BorderProp
}

export interface BorderRightStyle extends T.Style {
  borderRight: BorderValue
}

export const borderRight = ex<BorderRightProps, BorderRightStyle>({
  propsKeys: ["borderRight", "bdr"]
})

// Border Bottom

export interface BorderBottomProps extends T.ThemeProps {
  borderBottom?: BorderProp
  bdb?: BorderProp
}

export interface BorderBottomStyle extends T.Style {
  borderBottom: BorderValue
}

export const borderBottom = ex<BorderBottomProps, BorderBottomStyle>({
  propsKeys: ["borderBottom", "bdb"]
})

// Border Left

export interface BorderLeftProps extends T.ThemeProps {
  borderLeft?: BorderProp
  bdl?: BorderProp
}

export interface BorderLeftStyle extends T.Style {
  borderLeft: BorderValue
}

export const borderLeft = ex<BorderLeftProps, BorderLeftStyle>({
  propsKeys: ["borderLeft", "bdl"]
})

// Border Style

export type BorderStyleValue = C.BorderStyleProperty

export type BorderStyleProp = T.Prop<BorderStyleValue>

export interface BorderStyleProps extends T.ThemeProps {
  borderStyle?: BorderStyleProp
  bds?: BorderStyleProp
}

export interface BorderStyleStyle extends T.Style {
  borderStyle: BorderStyleValue
}

export const borderStyle = S.style<BorderStyleProps, BorderStyleStyle>({
  propsKeys: ["borderStyle", "bds"],
  themeKeys: ["borderStyles"]
})

// Border Width

export type BorderWidthValue = C.BorderWidthProperty<T.Length>

export type BorderWidthProp = T.Prop<BorderWidthValue>

export interface BorderWidthProps extends T.ThemeProps {
  borderWidth?: BorderWidthProp
  bdw?: BorderWidthProp
}

export interface BorderWidthStyle extends T.Style {
  borderWidth: BorderWidthValue
}

export const borderWidth = ex<BorderWidthProps, BorderWidthStyle>({
  propsKeys: ["borderWidth", "bdw"],
  themeKeys: ["borderWidths"]
})

// Border Radius

export type BorderRadiusValue = C.BorderRadiusProperty<T.Length>

export type BorderRadiusProp = T.Prop<BorderRadiusValue>

export interface BorderRadiusProps extends T.ThemeProps {
  borderRadius?: BorderRadiusProp
  rad?: BorderRadiusProp
}

export interface BorderRadiusStyle extends T.Style {
  borderRadius: BorderRadiusValue
}

export const borderRadius = ex<BorderRadiusProps, BorderRadiusStyle>({
  propsKeys: ["borderRadius", "rad"],
  themeKeys: ["borderRadii"],
  transform: U.addPcOrPx,
  fallback: F.PX_SCALE
})

// Border Set

export type BorderSetProps = BorderProps &
  BorderTopProps &
  BorderRightProps &
  BorderBottomProps &
  BorderLeftProps &
  P.BorderColorProps &
  BorderStyleProps &
  BorderWidthProps &
  BorderRadiusProps

export type BorderSetStyle = BorderStyle &
  BorderTopStyle &
  BorderRightStyle &
  BorderBottomStyle &
  BorderLeftStyle &
  P.BorderColorStyle &
  BorderStyleStyle &
  BorderWidthStyle &
  BorderRadiusStyle

export const borderSet = S.compose<BorderSetProps, BorderSetStyle>([
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  P.borderColor,
  borderStyle,
  borderWidth,
  borderRadius
])
