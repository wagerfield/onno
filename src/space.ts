import * as C from "csstype"
import * as T from "./types"
import * as K from "./const"
import * as S from "./style"
import * as U from "./utils"

const MT = "marginTop"
const MR = "marginRight"
const MB = "marginBottom"
const ML = "marginLeft"

const PT = "paddingTop"
const PR = "paddingRight"
const PB = "paddingBottom"
const PL = "paddingLeft"

const ex = S.extend({
  themeKeys: ["spaces"],
  transform: U.addPx,
  fallback: K.PX_SCALE
})

// Margin Types

export type MarginValue = C.MarginProperty<T.Length>

export type MarginProp = T.Prop<MarginValue>

// Margin Top

export interface MarginTopProps extends T.ThemeProps {
  [MT]?: MarginProp
  mt?: MarginProp
}

export interface MarginTopStyle extends T.Style {
  [MT]: MarginValue
}

export const marginTop = ex<MarginTopProps, MarginTopStyle>({
  propsKeys: [MT, "mt"]
})

// Margin Right

export interface MarginRightProps extends T.ThemeProps {
  [MR]?: MarginProp
  mr?: MarginProp
}

export interface MarginRightStyle extends T.Style {
  [MR]: MarginValue
}

export const marginRight = ex<MarginRightProps, MarginRightStyle>({
  propsKeys: [MR, "mr"]
})

// Margin Bottom

export interface MarginBottomProps extends T.ThemeProps {
  [MB]?: MarginProp
  mb?: MarginProp
}

export interface MarginBottomStyle extends T.Style {
  [MB]: MarginValue
}

export const marginBottom = ex<MarginBottomProps, MarginBottomStyle>({
  propsKeys: [MB, "mb"]
})

// Margin Left

export interface MarginLeftProps extends T.ThemeProps {
  [ML]?: MarginProp
  ml?: MarginProp
}

export interface MarginLeftStyle extends T.Style {
  [ML]: MarginValue
}

export const marginLeft = ex<MarginLeftProps, MarginLeftStyle>({
  propsKeys: [ML, "ml"]
})

// Margin X

export interface MarginXProps extends T.ThemeProps {
  marginX?: MarginProp
  mx?: MarginProp
}

export interface MarginXStyle extends T.Style {
  [ML]: MarginValue
  [MR]: MarginValue
}

export const marginX = ex<MarginXProps, MarginXStyle>({
  propsKeys: ["marginX", "mx"],
  styleKeys: [ML, MR]
})

// Margin Y

export interface MarginYProps extends T.ThemeProps {
  marginY?: MarginProp
  my?: MarginProp
}

export interface MarginYStyle extends T.Style {
  [MT]: MarginValue
  [MB]: MarginValue
}

export const marginY = ex<MarginYProps, MarginYStyle>({
  propsKeys: ["marginY", "my"],
  styleKeys: [MT, MB]
})

// Margin

export interface MarginProps extends T.ThemeProps {
  margin?: MarginProp
  m?: MarginProp
}

export interface MarginStyle extends T.Style {
  margin: MarginValue
}

export const margin = ex<MarginProps, MarginStyle>({
  propsKeys: ["margin", "m"]
})

// Padding Types

export type PaddingValue = C.PaddingProperty<T.Length>

export type PaddingProp = T.Prop<PaddingValue>

// Padding Top

export interface PaddingTopProps extends T.ThemeProps {
  [PT]?: PaddingProp
  pt?: PaddingProp
}

export interface PaddingTopStyle extends T.Style {
  [PT]: PaddingValue
}

export const paddingTop = ex<PaddingTopProps, PaddingTopStyle>({
  propsKeys: [PT, "pt"]
})

// Padding Right

export interface PaddingRightProps extends T.ThemeProps {
  [PR]?: PaddingProp
  pr?: PaddingProp
}

export interface PaddingRightStyle extends T.Style {
  [PR]: PaddingValue
}

export const paddingRight = ex<PaddingRightProps, PaddingRightStyle>({
  propsKeys: [PR, "pr"]
})

// Padding Bottom

export interface PaddingBottomProps extends T.ThemeProps {
  [PB]?: PaddingProp
  pb?: PaddingProp
}

export interface PaddingBottomStyle extends T.Style {
  [PB]: PaddingValue
}

export const paddingBottom = ex<PaddingBottomProps, PaddingBottomStyle>({
  propsKeys: [PB, "pb"]
})

// Padding Left

export interface PaddingLeftProps extends T.ThemeProps {
  [PL]?: PaddingProp
  pl?: PaddingProp
}

export interface PaddingLeftStyle extends T.Style {
  [PL]: PaddingValue
}

export const paddingLeft = ex<PaddingLeftProps, PaddingLeftStyle>({
  propsKeys: [PL, "pl"]
})

// Padding X

export interface PaddingXProps extends T.ThemeProps {
  paddingX?: PaddingProp
  px?: PaddingProp
}

export interface PaddingXStyle extends T.Style {
  [PL]: PaddingValue
  [PR]: PaddingValue
}

export const paddingX = ex<PaddingXProps, PaddingXStyle>({
  propsKeys: ["paddingX", "px"],
  styleKeys: [PL, PR]
})

// Padding Y

export interface PaddingYProps extends T.ThemeProps {
  paddingY?: PaddingProp
  py?: PaddingProp
}

export interface PaddingYStyle extends T.Style {
  [PT]: PaddingValue
  [PB]: PaddingValue
}

export const paddingY = ex<PaddingYProps, PaddingYStyle>({
  propsKeys: ["paddingY", "py"],
  styleKeys: [PT, PB]
})

// Padding

export interface PaddingProps extends T.ThemeProps {
  padding?: PaddingProp
  p?: PaddingProp
}

export interface PaddingStyle extends T.Style {
  padding: PaddingValue
}

export const padding = ex<PaddingProps, PaddingStyle>({
  propsKeys: ["padding", "p"]
})

// Margin Set

export type MarginSetProps = MarginProps &
  MarginXProps &
  MarginYProps &
  MarginTopProps &
  MarginRightProps &
  MarginBottomProps &
  MarginLeftProps

export type MarginSetStyle = MarginStyle &
  MarginXStyle &
  MarginYStyle &
  MarginTopStyle &
  MarginRightStyle &
  MarginBottomStyle &
  MarginLeftStyle

export const marginSet = S.compose<MarginSetProps, MarginSetStyle>([
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft
])

// Padding Set

export type PaddingSetProps = PaddingProps &
  PaddingXProps &
  PaddingYProps &
  PaddingTopProps &
  PaddingRightProps &
  PaddingBottomProps &
  PaddingLeftProps

export type PaddingSetStyle = PaddingStyle &
  PaddingXStyle &
  PaddingYStyle &
  PaddingTopStyle &
  PaddingRightStyle &
  PaddingBottomStyle &
  PaddingLeftStyle

export const paddingSet = S.compose<PaddingSetProps, PaddingSetStyle>([
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft
])

// Space Set

export type SpaceSetProps = MarginSetProps & PaddingSetProps

export type SpaceSetStyle = MarginSetStyle & PaddingSetStyle

export const spaceSet = S.compose<SpaceSetProps, SpaceSetStyle>([
  marginSet,
  paddingSet
])
