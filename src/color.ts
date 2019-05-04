import * as C from "csstype"
import * as T from "./types"
import * as S from "./style"
import * as F from "./fallback"

const ex = S.extend({
  themeKeys: ["colors", "palette"],
  fallback: F.PALETTE
})

// Background Color

export type BackgroundColorValue = C.BackgroundColorProperty

export type BackgroundColorProp = T.Prop<BackgroundColorValue>

export interface BackgroundColorProps extends T.ThemeProps {
  backgroundColor?: BackgroundColorProp
  bgc?: BackgroundColorProp
}

export interface BackgroundColorStyle extends T.Style {
  backgroundColor: BackgroundColorValue
}

export const backgroundColor = ex<BackgroundColorProps, BackgroundColorStyle>({
  propsKeys: ["backgroundColor", "bgc"]
})

// Border Color

export type BorderColorValue = C.BorderColorProperty

export type BorderColorProp = T.Prop<BorderColorValue>

export interface BorderColorProps extends T.ThemeProps {
  borderColor?: BorderColorProp
  bc?: BorderColorProp
}

export interface BorderColorStyle extends T.Style {
  borderColor: BorderColorValue
}

export const borderColor = ex<BorderColorProps, BorderColorStyle>({
  propsKeys: ["borderColor", "bc"]
})

// Text Color

export type TextColorValue = C.ColorProperty

export type TextColorProp = T.Prop<TextColorValue>

export interface TextColorProps extends T.ThemeProps {
  color?: TextColorProp
  tc?: TextColorProp
}

export interface TextColorStyle extends T.Style {
  color: TextColorValue
}

export const textColor = ex<TextColorProps, TextColorStyle>({
  propsKeys: ["color", "tc"]
})

// Color

export type ColorProps = BackgroundColorProps &
  BorderColorProps &
  TextColorProps

export type ColorStyle = BackgroundColorStyle &
  BorderColorStyle &
  TextColorStyle

export const color = S.compose<ColorProps, ColorStyle>([
  backgroundColor,
  borderColor,
  textColor
])
