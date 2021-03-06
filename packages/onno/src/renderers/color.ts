import * as C from "csstype"
import * as T from "../types"
import { extend } from "../style"
import { compose } from "../compose"

const ex = extend({
  themeKeys: ["colors"],
  defaults: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F"
  }
})

// Background

export type BackgroundValue = C.BackgroundProperty<T.Length>

export type BackgroundProp = T.Prop<BackgroundValue>

export interface BackgroundProps extends T.ThemeProps {
  background?: BackgroundProp
  bg?: BackgroundProp
}

export interface BackgroundStyle extends T.Style {
  background?: BackgroundValue
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
  backgroundColor?: BackgroundColorValue
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
  borderColor?: BorderColorValue
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
  color?: ColorValue
}

export const color = ex<ColorProps, ColorStyle>({
  propsKeys: ["color", "tc"]
})

// Fill

export type FillValue = C.FillProperty

export type FillProp = T.Prop<FillValue>

export interface FillProps extends T.ThemeProps {
  fill?: FillProp
  fc?: FillProp
}

export interface FillStyle extends T.Style {
  fill?: FillValue
}

export const fill = ex<FillProps, FillStyle>({
  propsKeys: ["fill", "fc"]
})

// Outline Color

export type OutlineColorValue = C.OutlineColorProperty

export type OutlineColorProp = T.Prop<OutlineColorValue | number>

export interface OutlineColorProps extends T.ThemeProps {
  outlineColor?: OutlineColorProp
  olc?: OutlineColorProp
}

export interface OutlineColorStyle extends T.Style {
  outlineColor?: OutlineColorValue
}

export const outlineColor = ex<OutlineColorProps, OutlineColorStyle>({
  propsKeys: ["outlineColor", "olc"]
})

// Color Set

export type ColorSetProps = BackgroundProps &
  BackgroundColorProps &
  BorderColorProps &
  ColorProps &
  FillProps &
  OutlineColorProps

export type ColorSetStyle = BackgroundStyle &
  BackgroundColorStyle &
  BorderColorStyle &
  ColorStyle &
  FillStyle &
  OutlineColorStyle

export const colorSet = compose<ColorSetProps, ColorSetStyle>({
  name: "color",
  renderers: [
    background,
    backgroundColor,
    borderColor,
    color,
    fill,
    outlineColor
  ]
})
