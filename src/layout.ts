import * as C from "csstype"
import * as T from "./types"
import * as S from "./style"
import * as U from "./utils"

const SK = "sizes"

const ex = S.extend({
  transform: U.addPcOrPx,
  fallback: [0, "100%", 4, 8, 16, 32, 64, 128, 256, 512]
})

// Display

export type DisplayValue = C.DisplayProperty

export type DisplayProp = T.Prop<DisplayValue>

export interface DisplayProps extends T.ThemeProps {
  display?: DisplayProp
  d?: DisplayProp
}

export interface DisplayStyle extends T.Style {
  display: DisplayValue
}

export const display = S.style<DisplayProps, DisplayStyle>({
  propsKeys: ["display", "d"]
})

// Width

export type WidthValue = C.WidthProperty<T.Length>

export type WidthProp = T.Prop<WidthValue>

export interface WidthProps extends T.ThemeProps {
  width?: WidthProp
  w?: WidthProp
}

export interface WidthStyle extends T.Style {
  width: WidthValue
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
  minWidth: MinWidthValue
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
  maxWidth: MaxWidthValue
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
  height: HeightValue
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
  minHeight: MinHeightValue
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
  maxHeight: MaxHeightValue
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
  width: SizeValue
  height: SizeValue
}

export const size = ex<SizeProps, SizeStyle>({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"],
  themeKeys: [SK]
})

// Vertical Align

export type VerticalAlignValue = C.VerticalAlignProperty<T.Length>

export type VerticalAlignProp = T.Prop<VerticalAlignValue>

export interface VerticalAlignProps extends T.ThemeProps {
  verticalAlign?: VerticalAlignProp
  va?: VerticalAlignProp
}

export interface VerticalAlignStyle extends T.Style {
  verticalAlign: VerticalAlignValue
}

export const verticalAlign = S.style<VerticalAlignProps, VerticalAlignStyle>({
  propsKeys: ["verticalAlign", "va"]
})

// Layout

export type LayoutProps = DisplayProps &
  SizeProps &
  WidthProps &
  MinWidthProps &
  MaxWidthProps &
  HeightProps &
  MinHeightProps &
  MaxHeightProps &
  VerticalAlignProps

export type LayoutStyle = DisplayStyle &
  SizeStyle &
  WidthStyle &
  MinWidthStyle &
  MaxWidthStyle &
  HeightStyle &
  MinHeightStyle &
  MaxHeightStyle &
  VerticalAlignStyle

export const layout = S.compose<LayoutProps, LayoutStyle>([
  display,
  size,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  verticalAlign
])
