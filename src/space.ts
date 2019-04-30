import { StyleProp, ThemeProps } from "./types"
import { extend } from "./style"
import { addPx } from "./utils"

const MT = "marginTop"
const MR = "marginRight"
const MB = "marginBottom"
const ML = "marginLeft"

const PT = "paddingTop"
const PR = "paddingRight"
const PB = "paddingBottom"
const PL = "paddingLeft"

const style = extend({
  transform: addPx,
  themeKeys: ["space", "spaces"],
  fallback: [0, 4, 8, 16, 32, 64, 128, 256, 512]
})

// Margin

export interface MarginTopProps extends ThemeProps {
  marginTop?: StyleProp
  mt?: StyleProp
}

export const marginTop = style<MarginTopProps>({
  propsKeys: [MT, "mt"],
  styleKeys: [MT]
})

export interface MarginRightProps extends ThemeProps {
  marginRight?: StyleProp
  mr?: StyleProp
}

export const marginRight = style<MarginRightProps>({
  propsKeys: [MR, "mr"],
  styleKeys: [MR]
})

export interface MarginBottomProps extends ThemeProps {
  marginBottom?: StyleProp
  mb?: StyleProp
}

export const marginBottom = style<MarginBottomProps>({
  propsKeys: [MB, "mb"],
  styleKeys: [MB]
})

export interface MarginLeftProps extends ThemeProps {
  marginLeft?: StyleProp
  ml?: StyleProp
}

export const marginLeft = style<MarginLeftProps>({
  propsKeys: [ML, "ml"],
  styleKeys: [ML]
})

export interface MarginXProps extends ThemeProps {
  marginX?: StyleProp
  mx?: StyleProp
}

export const marginX = style<MarginXProps>({
  propsKeys: ["marginX", "mx"],
  styleKeys: [ML, MR]
})

export interface MarginYProps extends ThemeProps {
  marginY?: StyleProp
  my?: StyleProp
}

export const marginY = style<MarginYProps>({
  propsKeys: ["marginY", "my"],
  styleKeys: [MT, MB]
})

export interface MarginProps extends ThemeProps {
  margin?: StyleProp
  m?: StyleProp
}

export const margin = style<MarginProps>({
  propsKeys: ["margin", "m"],
  styleKeys: [MT, MR, MB, ML]
})

// Padding

export interface PaddingTopProps extends ThemeProps {
  paddingTop?: StyleProp
  pt?: StyleProp
}

export const paddingTop = style<PaddingTopProps>({
  propsKeys: [PT, "pt"],
  styleKeys: [PT]
})

export interface PaddingRightProps extends ThemeProps {
  paddingRight?: StyleProp
  pr?: StyleProp
}

export const paddingRight = style<PaddingRightProps>({
  propsKeys: [PR, "pr"],
  styleKeys: [PR]
})

export interface PaddingBottomProps extends ThemeProps {
  paddingBottom?: StyleProp
  pb?: StyleProp
}

export const paddingBottom = style<PaddingBottomProps>({
  propsKeys: [PB, "pb"],
  styleKeys: [PB]
})

export interface PaddingLeftProps extends ThemeProps {
  paddingLeft?: StyleProp
  pl?: StyleProp
}

export const paddingLeft = style<PaddingLeftProps>({
  propsKeys: [PL, "pl"],
  styleKeys: [PL]
})

export interface PaddingXProps extends ThemeProps {
  paddingX?: StyleProp
  px?: StyleProp
}

export const paddingX = style<PaddingXProps>({
  propsKeys: ["paddingX", "px"],
  styleKeys: [PL, PR]
})

export interface PaddingYProps extends ThemeProps {
  paddingY?: StyleProp
  py?: StyleProp
}

export const paddingY = style<PaddingYProps>({
  propsKeys: ["paddingY", "py"],
  styleKeys: [PT, PB]
})

export interface PaddingProps extends ThemeProps {
  padding?: StyleProp
  p?: StyleProp
}

export const padding = style<PaddingProps>({
  propsKeys: ["padding", "p"],
  styleKeys: [PT, PR, PB, PL]
})

// Space

export type SpaceProps = MarginTopProps &
  MarginRightProps &
  MarginBottomProps &
  MarginLeftProps &
  MarginXProps &
  MarginYProps &
  MarginProps &
  PaddingTopProps &
  PaddingRightProps &
  PaddingBottomProps &
  PaddingLeftProps &
  PaddingXProps &
  PaddingYProps &
  PaddingProps
