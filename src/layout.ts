import { StyleProp, ThemeProps } from "./types"
import { extend, style } from "./style"
import { addPcOrPx } from "./utils"

const layout = extend({
  transform: addPcOrPx,
  fallback: [0, 4, 8, 16, 32, 64, 128, 256, 512]
})

// Display

export interface DisplayProps extends ThemeProps {
  display?: StyleProp
  d?: StyleProp
}

export const display = style<DisplayProps>({
  propsKeys: ["display", "d"]
})

// Width

export interface WidthProps extends ThemeProps {
  width?: StyleProp
  w?: StyleProp
}

export const width = layout<WidthProps>({
  propsKeys: ["width", "w"],
  themeKeys: ["widths"]
})

export interface MinWidthProps extends ThemeProps {
  minWidth?: StyleProp
  minw?: StyleProp
}

export const minWidth = layout<MinWidthProps>({
  propsKeys: ["minWidth", "minw"],
  themeKeys: ["minWidths"]
})

export interface MaxWidthProps extends ThemeProps {
  maxWidth?: StyleProp
  maxw?: StyleProp
}

export const maxWidth = layout<MaxWidthProps>({
  propsKeys: ["maxWidth", "maxw"],
  themeKeys: ["maxWidths"]
})

// Height

export interface HeightProps extends ThemeProps {
  height?: StyleProp
  h?: StyleProp
}

export const height = layout<HeightProps>({
  propsKeys: ["height", "h"],
  themeKeys: ["heights"]
})

export interface MinHeightProps extends ThemeProps {
  minHeight?: StyleProp
  minh?: StyleProp
}

export const minHeight = layout<MinHeightProps>({
  propsKeys: ["minHeight", "minh"],
  themeKeys: ["minHeights"]
})

export interface MaxHeightProps extends ThemeProps {
  maxHeight?: StyleProp
  maxh?: StyleProp
}

export const maxHeight = layout<MaxHeightProps>({
  propsKeys: ["maxHeight", "maxh"],
  themeKeys: ["maxHeights"]
})

// Size

export interface SizeProps extends ThemeProps {
  size?: StyleProp
  s?: StyleProp
}

export const size = layout<SizeProps>({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"],
  themeKeys: ["sizes"]
})

// Alignment

export interface VerticalAlignProps extends ThemeProps {
  verticalAlign?: StyleProp
  va?: StyleProp
}

export const verticalAlign = style<VerticalAlignProps>({
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
