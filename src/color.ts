import * as C from "csstype"
import * as T from "./types"
import * as K from "./const"
import * as S from "./style"

const ex = S.extend({
  themeKeys: ["colors"],
  fallback: K.COLORS
})

// Background

export type BackgroundValue = C.BackgroundProperty<T.Length>

export type BackgroundProp = T.Prop<BackgroundValue>

export interface BackgroundProps extends T.ThemeProps {
  background?: BackgroundProp
  bg?: BackgroundProp
}

export interface BackgroundStyle extends T.Style {
  background: BackgroundValue
}

export const background = ex<BackgroundProps, BackgroundStyle>({
  propsKeys: ["background", "bg"]
})

// Background Color

export type BackgroundColorValue = C.BackgroundColorProperty

export type BackgroundColorProp = T.Prop<BackgroundColorValue | number>

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

export type BorderColorProp = T.Prop<BorderColorValue | number>

export interface BorderColorProps extends T.ThemeProps {
  borderColor?: BorderColorProp
  bdc?: BorderColorProp
}

export interface BorderColorStyle extends T.Style {
  borderColor: BorderColorValue
}

export const borderColor = ex<BorderColorProps, BorderColorStyle>({
  propsKeys: ["borderColor", "bdc"]
})

// Color

export type ColorValue = C.ColorProperty

export type ColorProp = T.Prop<ColorValue | number>

export interface ColorProps extends T.ThemeProps {
  color?: ColorProp
  tc?: ColorProp
}

export interface ColorStyle extends T.Style {
  color: ColorValue
}

export const color = ex<ColorProps, ColorStyle>({
  propsKeys: ["color", "tc"]
})

// Color Set

export type ColorSetProps = BackgroundProps &
  BackgroundColorProps &
  BorderColorProps &
  ColorProps

export type ColorSetStyle = BackgroundStyle &
  BackgroundColorStyle &
  BorderColorStyle &
  ColorStyle

export const colorSet = S.compose<ColorSetProps, ColorSetStyle>([
  background,
  backgroundColor,
  borderColor,
  color
])
