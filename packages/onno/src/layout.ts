import * as C from "csstype"
import * as T from "./types"
import { PC_SCALE } from "./constants"
import { addPcOrPx } from "./utils"
import { compose } from "./compose"
import { extend, style } from "./style"
import { display, DisplayProps, DisplayStyle } from "./display"

const SK = "sizes"

const ex = extend({
  themeKeys: [SK],
  transform: addPcOrPx,
  defaults: PC_SCALE
})

// Vertical Align

export type VerticalAlignValue = C.VerticalAlignProperty<T.Length>

export type VerticalAlignProp = T.Prop<VerticalAlignValue>

export interface VerticalAlignProps extends T.ThemeProps {
  verticalAlign?: VerticalAlignProp
  va?: VerticalAlignProp
}

export interface VerticalAlignStyle extends T.Style {
  verticalAlign?: VerticalAlignValue
}

export const verticalAlign = style<VerticalAlignProps, VerticalAlignStyle>({
  propsKeys: ["verticalAlign", "va"]
})

// Position

export type PositionValue = C.PositionProperty

export type PositionProp = T.Prop<PositionValue>

export interface PositionProps extends T.ThemeProps {
  position?: PositionProp
  pos?: PositionProp
}

export interface PositionStyle extends T.Style {
  position?: PositionValue
}

export const position = style<PositionProps, PositionStyle>({
  propsKeys: ["position", "pos"]
})

// Z Index

export type ZIndexValue = C.ZIndexProperty

export type ZIndexProp = T.Prop<ZIndexValue>

export interface ZIndexProps extends T.ThemeProps {
  zIndex?: ZIndexProp
  zi?: ZIndexProp
}

export interface ZIndexStyle extends T.Style {
  zIndex?: ZIndexValue
}

export const zIndex = style<ZIndexProps, ZIndexStyle>({
  propsKeys: ["zIndex", "zi"],
  themeKeys: ["zIndices"]
})

// Edge Types

export type EdgeValue = C.Globals | "auto" | string | number

export type EdgeProp = T.Prop<EdgeValue>

// Top

export interface TopProps extends T.ThemeProps {
  top?: EdgeProp
  t?: EdgeProp
}

export interface TopStyle extends T.Style {
  top?: EdgeValue
}

export const top = ex<TopProps, TopStyle>({
  propsKeys: ["top", "t"]
})

// Right

export interface RightProps extends T.ThemeProps {
  right?: EdgeProp
  r?: EdgeProp
}

export interface RightStyle extends T.Style {
  right?: EdgeValue
}

export const right = ex<RightProps, RightStyle>({
  propsKeys: ["right", "r"]
})

// Bottom

export interface BottomProps extends T.ThemeProps {
  bottom?: EdgeProp
  b?: EdgeProp
}

export interface BottomStyle extends T.Style {
  bottom?: EdgeValue
}

export const bottom = ex<BottomProps, BottomStyle>({
  propsKeys: ["bottom", "b"]
})

// Left

export interface LeftProps extends T.ThemeProps {
  left?: EdgeProp
  l?: EdgeProp
}

export interface LeftStyle extends T.Style {
  left?: EdgeValue
}

export const left = ex<LeftProps, LeftStyle>({
  propsKeys: ["left", "l"]
})

// Width

export type WidthValue = C.WidthProperty<T.Length>

export type WidthProp = T.Prop<WidthValue>

export interface WidthProps extends T.ThemeProps {
  width?: WidthProp
  w?: WidthProp
}

export interface WidthStyle extends T.Style {
  width?: WidthValue
}

export const width = ex<WidthProps, WidthStyle>({
  propsKeys: ["width", "w"],
  themeKeys: ["widths", SK]
})

// Min Width

export type MinWidthValue = C.MinWidthProperty<T.Length>

export type MinWidthProp = T.Prop<MinWidthValue>

export interface MinWidthProps extends T.ThemeProps {
  minWidth?: MinWidthProp
  minw?: MinWidthProp
}

export interface MinWidthStyle extends T.Style {
  minWidth?: MinWidthValue
}

export const minWidth = ex<MinWidthProps, MinWidthStyle>({
  propsKeys: ["minWidth", "minw"],
  themeKeys: ["minWidths", SK]
})

// Max Width

export type MaxWidthValue = C.MaxWidthProperty<T.Length>

export type MaxWidthProp = T.Prop<MaxWidthValue>

export interface MaxWidthProps extends T.ThemeProps {
  maxWidth?: MaxWidthProp
  maxw?: MaxWidthProp
}

export interface MaxWidthStyle extends T.Style {
  maxWidth?: MaxWidthValue
}

export const maxWidth = ex<MaxWidthProps, MaxWidthStyle>({
  propsKeys: ["maxWidth", "maxw"],
  themeKeys: ["maxWidths", SK]
})

// Height

export type HeightValue = C.HeightProperty<T.Length>

export type HeightProp = T.Prop<HeightValue>

export interface HeightProps extends T.ThemeProps {
  height?: HeightProp
  h?: HeightProp
}

export interface HeightStyle extends T.Style {
  height?: HeightValue
}

export const height = ex<HeightProps, HeightStyle>({
  propsKeys: ["height", "h"],
  themeKeys: ["heights", SK]
})

// Min Height

export type MinHeightValue = C.MinHeightProperty<T.Length>

export type MinHeightProp = T.Prop<MinHeightValue>

export interface MinHeightProps extends T.ThemeProps {
  minHeight?: MinHeightProp
  minh?: MinHeightProp
}

export interface MinHeightStyle extends T.Style {
  minHeight?: MinHeightValue
}

export const minHeight = ex<MinHeightProps, MinHeightStyle>({
  propsKeys: ["minHeight", "minh"],
  themeKeys: ["minHeights", SK]
})

// Max Height

export type MaxHeightValue = C.MaxHeightProperty<T.Length>

export type MaxHeightProp = T.Prop<MaxHeightValue>

export interface MaxHeightProps extends T.ThemeProps {
  maxHeight?: MaxHeightProp
  maxh?: MaxHeightProp
}

export interface MaxHeightStyle extends T.Style {
  maxHeight?: MaxHeightValue
}

export const maxHeight = ex<MaxHeightProps, MaxHeightStyle>({
  propsKeys: ["maxHeight", "maxh"],
  themeKeys: ["maxHeights", SK]
})

// Size

export type SizeValue = WidthValue & HeightValue

export type SizeProp = WidthProp & HeightProp

export interface SizeProps extends T.ThemeProps {
  size?: SizeProp
  s?: SizeProp
}

export interface SizeStyle extends T.Style {
  width?: SizeValue
  height?: SizeValue
}

export const size = ex<SizeProps, SizeStyle>({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"]
})

// Position Set

export type PositionSetProps = PositionProps &
  ZIndexProps &
  TopProps &
  RightProps &
  BottomProps &
  LeftProps

export type PositionSetStyle = PositionStyle &
  ZIndexStyle &
  TopStyle &
  RightStyle &
  BottomStyle &
  LeftStyle

export const positionSet = compose<PositionSetProps, PositionSetStyle>({
  name: "position",
  renderers: [position, zIndex, top, right, bottom, left]
})

// Size Set

export type SizeSetProps = SizeProps &
  WidthProps &
  MinWidthProps &
  MaxWidthProps &
  HeightProps &
  MinHeightProps &
  MaxHeightProps

export type SizeSetStyle = SizeStyle &
  WidthStyle &
  MinWidthStyle &
  MaxWidthStyle &
  HeightStyle &
  MinHeightStyle &
  MaxHeightStyle

export const sizeSet = compose<SizeSetProps, SizeSetStyle>({
  name: "size",
  renderers: [size, width, minWidth, maxWidth, height, minHeight, maxHeight]
})

// Layout Set

export type LayoutSetProps = DisplayProps &
  VerticalAlignProps &
  PositionSetProps &
  SizeSetProps

export type LayoutSetStyle = DisplayStyle &
  VerticalAlignStyle &
  PositionSetStyle &
  SizeSetStyle

export const layoutSet = compose<LayoutSetProps, LayoutSetStyle>({
  name: "layout",
  renderers: [display, verticalAlign, positionSet, sizeSet]
})
