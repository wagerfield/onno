import * as CSS from "csstype"
import { Length, Prop, Style, ThemeProps } from "./types"
import { compose, extend, style } from "./style"
import { addPcOrPx } from "./utils"

const base = extend({
  transform: addPcOrPx,
  fallback: [0, "100%", 4, 8, 16, 32, 64, 128, 256, 512]
})

// Display

export type DisplayValue = CSS.DisplayProperty

export type DisplayProp = Prop<DisplayValue>

export interface DisplayProps extends ThemeProps {
  display?: DisplayProp
  d?: DisplayProp
}

export interface DisplayStyle extends Style {
  display: DisplayValue
}

export const display = style<DisplayProps, DisplayStyle>({
  propsKeys: ["display", "d"]
})

// Width

export type WidthValue = CSS.WidthProperty<Length>

export type WidthProp = Prop<WidthValue>

export interface WidthProps extends ThemeProps {
  width?: WidthProp
  w?: WidthProp
}

export interface WidthStyle extends Style {
  width: WidthValue
}

export const width = base<WidthProps, WidthStyle>({
  propsKeys: ["width", "w"],
  themeKeys: ["widths"]
})

// Min Width

export type MinWidthValue = CSS.MinWidthProperty<Length>

export type MinWidthProp = Prop<MinWidthValue>

export interface MinWidthProps extends ThemeProps {
  minWidth?: MinWidthProp
  minw?: MinWidthProp
}

export interface MinWidthStyle extends Style {
  minWidth: MinWidthValue
}

export const minWidth = base<MinWidthProps, MinWidthStyle>({
  propsKeys: ["minWidth", "minw"],
  themeKeys: ["minWidths"]
})

// Max Width

export type MaxWidthValue = CSS.MaxWidthProperty<Length>

export type MaxWidthProp = Prop<MaxWidthValue>

export interface MaxWidthProps extends ThemeProps {
  maxWidth?: Prop
  maxw?: Prop
}

export interface MaxWidthStyle extends Style {
  maxWidth: MaxWidthValue
}

export const maxWidth = base<MaxWidthProps, MaxWidthStyle>({
  propsKeys: ["maxWidth", "maxw"],
  themeKeys: ["maxWidths"]
})

// Height

export type HeightValue = CSS.HeightProperty<Length>

export type HeightProp = Prop<HeightValue>

export interface HeightProps extends ThemeProps {
  height?: HeightProp
  h?: HeightProp
}

export interface HeightStyle extends Style {
  height: HeightValue
}

export const height = base<HeightProps, HeightStyle>({
  propsKeys: ["height", "h"],
  themeKeys: ["heights"]
})

// Min Height

export type MinHeightValue = CSS.MinHeightProperty<Length>

export type MinHeightProp = Prop<MinHeightValue>

export interface MinHeightProps extends ThemeProps {
  minHeight?: MinHeightProp
  minh?: MinHeightProp
}

export interface MinHeightStyle extends Style {
  minHeight: MinHeightValue
}

export const minHeight = base<MinHeightProps, MinHeightStyle>({
  propsKeys: ["minHeight", "minh"],
  themeKeys: ["minHeights"]
})

// Max Height

export type MaxHeightValue = CSS.MaxHeightProperty<Length>

export type MaxHeightProp = Prop<MaxHeightValue>

export interface MaxHeightProps extends ThemeProps {
  maxHeight?: MaxHeightProp
  maxh?: MaxHeightProp
}

export interface MaxHeightStyle extends Style {
  maxHeight: MaxHeightValue
}

export const maxHeight = base<MaxHeightProps, MaxHeightStyle>({
  propsKeys: ["maxHeight", "maxh"],
  themeKeys: ["maxHeights"]
})

// Size

export type SizeValue = WidthValue & HeightValue

export type SizeProp = WidthProp & HeightProp

export interface SizeProps extends ThemeProps {
  size?: SizeProp
  s?: SizeProp
}

export interface SizeStyle extends Style {
  width: SizeValue
  height: SizeValue
}

export const size = base<SizeProps, SizeStyle>({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"],
  themeKeys: ["sizes"]
})

// Vertical Align

export type VerticalAlignValue = CSS.VerticalAlignProperty<Length>

export type VerticalAlignProp = Prop<VerticalAlignValue>

export interface VerticalAlignProps extends ThemeProps {
  verticalAlign?: VerticalAlignProp
  va?: VerticalAlignProp
}

export interface VerticalAlignStyle extends Style {
  verticalAlign: VerticalAlignValue
}

export const verticalAlign = style<VerticalAlignProps, VerticalAlignStyle>({
  propsKeys: ["verticalAlign", "va"]
})

// Layout

export type LayoutProps = DisplayProps &
  WidthProps &
  MinWidthProps &
  MaxWidthProps &
  HeightProps &
  MinHeightProps &
  MaxHeightProps &
  SizeProps &
  VerticalAlignProps

export type LayoutStyle = DisplayStyle &
  WidthStyle &
  MinWidthStyle &
  MaxWidthStyle &
  HeightStyle &
  MinHeightStyle &
  MaxHeightStyle &
  SizeStyle &
  VerticalAlignStyle

export const layout = compose<LayoutProps, LayoutStyle>([
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
