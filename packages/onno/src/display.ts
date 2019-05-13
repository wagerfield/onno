import * as C from "csstype"
import * as T from "./types"
import { compose, style } from "./style"

// Display

export type DisplayValue = C.DisplayProperty

export type DisplayProp = T.Prop<DisplayValue>

export interface DisplayProps extends T.ThemeProps {
  display?: DisplayProp
  d?: DisplayProp
}

export interface DisplayStyle extends T.Style {
  display?: DisplayValue
}

export const display = style<DisplayProps, DisplayStyle>({
  propsKeys: ["display", "d"]
})

// Opacity

export type OpacityValue = number | string

export type OpacityProp = T.Prop<OpacityValue>

export interface OpacityProps extends T.ThemeProps {
  opacity?: OpacityProp
  o?: OpacityProp
}

export interface OpacityStyle extends T.Style {
  opacity?: OpacityValue
}

export const opacity = style<OpacityProps, OpacityStyle>({
  propsKeys: ["opacity", "o"],
  themeKeys: ["opacities"]
})

// Overflow

export type OverflowValue = C.OverflowProperty

export type OverflowProp = T.Prop<OverflowValue>

export interface OverflowProps extends T.ThemeProps {
  overflow?: OverflowProp
  of?: OverflowProp
}

export interface OverflowStyle extends T.Style {
  overflow?: OverflowValue
}

export const overflow = style<OverflowProps, OverflowStyle>({
  propsKeys: ["overflow", "of"]
})

// Overflow X

export type OverflowXValue = C.OverflowXProperty

export type OverflowXProp = T.Prop<OverflowXValue>

export interface OverflowXProps extends T.ThemeProps {
  overflowX?: OverflowXProp
  ofx?: OverflowXProp
}

export interface OverflowXStyle extends T.Style {
  overflowX?: OverflowXValue
}

export const overflowX = style<OverflowXProps, OverflowXStyle>({
  propsKeys: ["overflowX", "ofx"]
})

// Overflow Y

export type OverflowYValue = C.OverflowYProperty

export type OverflowYProp = T.Prop<OverflowYValue>

export interface OverflowYProps extends T.ThemeProps {
  overflowY?: OverflowYProp
  ofy?: OverflowYProp
}

export interface OverflowYStyle extends T.Style {
  overflowY?: OverflowYValue
}

export const overflowY = style<OverflowYProps, OverflowYStyle>({
  propsKeys: ["overflowY", "ofy"]
})

// Visibility

export type VisibilityValue = C.VisibilityProperty

export type VisibilityProp = T.Prop<VisibilityValue>

export interface VisibilityProps extends T.ThemeProps {
  visibility?: VisibilityProp
  vis?: VisibilityProp
}

export interface VisibilityStyle extends T.Style {
  visibility?: VisibilityValue
}

export const visibility = style<VisibilityProps, VisibilityStyle>({
  propsKeys: ["visibility", "vis"]
})

// Overflow Set

export type OverflowSetProps = OverflowProps & OverflowXProps & OverflowYProps

export type OverflowSetStyle = OverflowStyle & OverflowXStyle & OverflowYStyle

export const overflowSet = compose<OverflowSetProps, OverflowSetStyle>([
  overflow,
  overflowX,
  overflowY
])

// Display Set

export type DisplaySetProps = DisplayProps &
  OpacityProps &
  OverflowSetProps &
  VisibilityProps

export type DisplaySetStyle = DisplayStyle &
  OpacityStyle &
  OverflowSetStyle &
  VisibilityStyle

export const displaySet = compose<DisplaySetProps, DisplaySetStyle>([
  display,
  opacity,
  overflowSet,
  visibility
])
