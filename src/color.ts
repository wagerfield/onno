import * as CSS from "csstype"
import { Prop, Style, ThemeProps, Unit } from "./types"
import { extend, compose } from "./style"

const style = extend({
  themeKeys: ["colors", "palette"],
  fallback: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F",
    bg: "#FFF"
  }
})

// Background Color

export type BackgroundColorValue = CSS.BackgroundColorProperty

export type BackgroundColorProp = Prop<BackgroundColorValue | Unit>

export interface BackgroundColorProps extends ThemeProps {
  backgroundColor?: BackgroundColorProp
  bgc?: BackgroundColorProp
}

export interface BackgroundColorStyle extends Style {
  backgroundColor: BackgroundColorValue
}

export const backgroundColor = style<
  BackgroundColorProps,
  BackgroundColorStyle
>({
  propsKeys: ["backgroundColor", "bgc"]
})

// Border Color

export type BorderColorValue = CSS.BorderColorProperty

export type BorderColorProp = Prop<BorderColorValue | Unit>

export interface BorderColorProps extends ThemeProps {
  borderColor?: BorderColorProp
  bc?: BorderColorProp
}

export interface BorderColorStyle extends Style {
  borderColor: BorderColorValue
}

export const borderColor = style<BorderColorProps, BorderColorStyle>({
  propsKeys: ["borderColor", "bc"]
})

// Text Color

export type TextColorValue = CSS.ColorProperty

export type TextColorProp = Prop<TextColorValue | Unit>

export interface TextColorProps extends ThemeProps {
  color?: TextColorProp
  tc?: TextColorProp
}

export interface TextColorStyle extends Style {
  color: TextColorValue
}

export const textColor = style<TextColorProps, TextColorStyle>({
  propsKeys: ["color", "tc"]
})

// Color

export type ColorProps = BackgroundColorProps &
  BorderColorProps &
  TextColorProps

export type ColorStyle = BackgroundColorStyle &
  BorderColorStyle &
  TextColorStyle

export const color = compose<ColorProps, ColorStyle>([
  backgroundColor,
  borderColor,
  textColor
])
