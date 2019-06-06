import { compose } from "../compose"
import {
  border,
  BorderProps,
  BorderStyle,
  borderRadius,
  BorderRadiusProps,
  BorderRadiusStyle
} from "./border"
import {
  outline,
  OutlineProps,
  OutlineStyle,
  outlineOffset,
  OutlineOffsetProps,
  OutlineOffsetStyle
} from "./outline"
import { transition, TransitionProps, TransitionStyle } from "./animation"
import { boxShadow, BoxShadowProps, BoxShadowStyle } from "./shadow"
import { colorSet, ColorSetProps, ColorSetStyle } from "./color"
import { spaceSet, SpaceSetProps, SpaceSetStyle } from "./space"
import { opacity, OpacityProps, OpacityStyle } from "./display"
import { sizeSet, SizeSetProps, SizeSetStyle } from "./layout"
import { textSet, TextSetProps, TextSetStyle } from "./text"

// Global Set

export type GlobalSetProps = BorderProps &
  BorderRadiusProps &
  BoxShadowProps &
  OpacityProps &
  OutlineProps &
  OutlineOffsetProps &
  SpaceSetProps &
  SizeSetProps &
  TextSetProps &
  ColorSetProps &
  TransitionProps

export type GlobalSetStyle = BorderStyle &
  BorderRadiusStyle &
  BoxShadowStyle &
  OpacityStyle &
  OutlineStyle &
  OutlineOffsetStyle &
  SpaceSetStyle &
  SizeSetStyle &
  TextSetStyle &
  ColorSetStyle &
  TransitionStyle

export const globalSet = compose<GlobalSetProps, GlobalSetStyle>({
  name: "global",
  renderers: [
    border,
    borderRadius,
    boxShadow,
    opacity,
    outline,
    outlineOffset,
    spaceSet,
    sizeSet,
    textSet,
    colorSet,
    transition
  ]
})
