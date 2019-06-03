import { compose } from "./compose"
import {
  border,
  BorderProps,
  BorderStyle,
  borderRadius,
  BorderRadiusProps,
  BorderRadiusStyle
} from "./border"
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
  ColorSetProps &
  OpacityProps &
  SpaceSetProps &
  SizeSetProps &
  TextSetProps &
  TransitionProps

export type GlobalSetStyle = BorderStyle &
  BorderRadiusStyle &
  BoxShadowStyle &
  ColorSetStyle &
  OpacityStyle &
  SpaceSetStyle &
  SizeSetStyle &
  TextSetStyle &
  TransitionStyle

export const globalSet = compose<GlobalSetProps, GlobalSetStyle>({
  name: "global",
  renderers: [
    border,
    borderRadius,
    boxShadow,
    colorSet,
    opacity,
    spaceSet,
    sizeSet,
    textSet,
    transition
  ]
})
