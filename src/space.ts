import * as CSS from "csstype"
import { Length, Prop, Style, ThemeProps } from "./types"
import { compose, extend } from "./style"
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
  fallback: [0, 2, 4, 8, 16, 32, 64, 128, 256, 512]
})

// Margin Types

export type MarginValue = CSS.MarginProperty<Length>

export type MarginProp = Prop<MarginValue>

// Margin Top

export interface MarginTopProps extends ThemeProps {
  marginTop?: MarginProp
  mt?: MarginProp
}

export interface MarginTopStyle extends Style {
  marginTop: MarginValue
}

export const marginTop = style<MarginTopProps, MarginTopStyle>({
  propsKeys: [MT, "mt"]
})

// Margin Right

export interface MarginRightProps extends ThemeProps {
  marginRight?: MarginProp
  mr?: MarginProp
}

export interface MarginRightStyle extends Style {
  marginRight: MarginValue
}

export const marginRight = style<MarginRightProps, MarginRightStyle>({
  propsKeys: [MR, "mr"]
})

// Margin Bottom

export interface MarginBottomProps extends ThemeProps {
  marginBottom?: MarginProp
  mb?: MarginProp
}

export interface MarginBottomStyle extends Style {
  marginBottom: MarginValue
}

export const marginBottom = style<MarginBottomProps, MarginBottomStyle>({
  propsKeys: [MB, "mb"]
})

// Margin Left

export interface MarginLeftProps extends ThemeProps {
  marginLeft?: MarginProp
  ml?: MarginProp
}

export interface MarginLeftStyle extends Style {
  marginLeft: MarginValue
}

export const marginLeft = style<MarginLeftProps, MarginLeftStyle>({
  propsKeys: [ML, "ml"]
})

// Margin X

export interface MarginXProps extends ThemeProps {
  marginX?: MarginProp
  mx?: MarginProp
}

export interface MarginXStyle extends Style {
  marginLeft: MarginValue
  marginRight: MarginValue
}

export const marginX = style<MarginXProps, MarginXStyle>({
  propsKeys: ["marginX", "mx"],
  styleKeys: [ML, MR]
})

// Margin Y

export interface MarginYProps extends ThemeProps {
  marginY?: MarginProp
  my?: MarginProp
}

export interface MarginYStyle extends Style {
  marginTop: MarginValue
  marginBottom: MarginValue
}

export const marginY = style<MarginYProps, MarginYStyle>({
  propsKeys: ["marginY", "my"],
  styleKeys: [MT, MB]
})

// Margin

export interface MarginProps extends ThemeProps {
  margin?: MarginProp
  m?: MarginProp
}

export interface MarginStyle extends Style {
  marginTop: MarginValue
  marginRight: MarginValue
  marginBottom: MarginValue
  marginLeft: MarginValue
}

export const margin = style<MarginProps, MarginStyle>({
  propsKeys: ["margin", "m"],
  styleKeys: [MT, MR, MB, ML]
})

// Padding Types

export type PaddingValue = CSS.PaddingProperty<Length>

export type PaddingProp = Prop<PaddingValue>

// Padding Top

export interface PaddingTopProps extends ThemeProps {
  paddingTop?: PaddingProp
  pt?: PaddingProp
}

export interface PaddingTopStyle extends Style {
  paddingTop: PaddingValue
}

export const paddingTop = style<PaddingTopProps, PaddingTopStyle>({
  propsKeys: [PT, "pt"]
})

// Padding Right

export interface PaddingRightProps extends ThemeProps {
  paddingRight?: PaddingProp
  pr?: PaddingProp
}

export interface PaddingRightStyle extends Style {
  paddingRight: PaddingValue
}

export const paddingRight = style<PaddingRightProps, PaddingRightStyle>({
  propsKeys: [PR, "pr"]
})

// Padding Bottom

export interface PaddingBottomProps extends ThemeProps {
  paddingBottom?: PaddingProp
  pb?: PaddingProp
}

export interface PaddingBottomStyle extends Style {
  paddingBottom: PaddingValue
}

export const paddingBottom = style<PaddingBottomProps, PaddingBottomStyle>({
  propsKeys: [PB, "pb"]
})

// Padding Left

export interface PaddingLeftProps extends ThemeProps {
  paddingLeft?: PaddingProp
  pl?: PaddingProp
}

export interface PaddingLeftStyle extends Style {
  paddingLeft: PaddingValue
}

export const paddingLeft = style<PaddingLeftProps, PaddingLeftStyle>({
  propsKeys: [PL, "pl"]
})

// Padding X

export interface PaddingXProps extends ThemeProps {
  paddingX?: PaddingProp
  px?: PaddingProp
}

export interface PaddingXStyle extends Style {
  paddingLeft: PaddingValue
  paddingRight: PaddingValue
}

export const paddingX = style<PaddingXProps, PaddingXStyle>({
  propsKeys: ["paddingX", "px"],
  styleKeys: [PL, PR]
})

// Padding Y

export interface PaddingYProps extends ThemeProps {
  paddingY?: PaddingProp
  py?: PaddingProp
}

export interface PaddingYStyle extends Style {
  paddingTop: PaddingValue
  paddingBottom: PaddingValue
}

export const paddingY = style<PaddingYProps, PaddingYStyle>({
  propsKeys: ["paddingY", "py"],
  styleKeys: [PT, PB]
})

// Padding

export interface PaddingProps extends ThemeProps {
  padding?: PaddingProp
  p?: PaddingProp
}

export interface PaddingStyle extends Style {
  paddingTop: PaddingValue
  paddingRight: PaddingValue
  paddingBottom: PaddingValue
  paddingLeft: PaddingValue
}

export const padding = style<PaddingProps, PaddingStyle>({
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

export type SpaceStyle = MarginTopStyle &
  MarginRightStyle &
  MarginBottomStyle &
  MarginLeftStyle &
  MarginXStyle &
  MarginYStyle &
  MarginStyle &
  PaddingTopStyle &
  PaddingRightStyle &
  PaddingBottomStyle &
  PaddingLeftStyle &
  PaddingXStyle &
  PaddingYStyle &
  PaddingStyle

export const space = compose<SpaceProps, SpaceStyle>([
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft
])
