import { compose } from "./style"
import { transition, TransitionProps, TransitionStyle } from "./animation"
import { borderSet, BorderSetProps, BorderSetStyle } from "./border"
import { boxShadow, BoxShadowProps, BoxShadowStyle } from "./shadow"
import { colorSet, ColorSetProps, ColorSetStyle } from "./color"
import { spaceSet, SpaceSetProps, SpaceSetStyle } from "./space"
import { sizeSet, SizeSetProps, SizeSetStyle } from "./layout"
import { textSet, TextSetProps, TextSetStyle } from "./text"

// Global Set

export type GlobalSetProps = BorderSetProps &
  BoxShadowProps &
  ColorSetProps &
  SpaceSetProps &
  SizeSetProps &
  TextSetProps &
  TransitionProps

export type GlobalSetStyle = BorderSetStyle &
  BoxShadowStyle &
  ColorSetStyle &
  SpaceSetStyle &
  SizeSetStyle &
  TextSetStyle &
  TransitionStyle

export const globalSet = compose<GlobalSetProps, GlobalSetStyle>([
  borderSet,
  boxShadow,
  colorSet,
  spaceSet,
  sizeSet,
  textSet,
  transition
])
