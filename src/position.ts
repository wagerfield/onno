import * as CSS from "csstype"
import { Length, Prop, Style, ThemeProps } from "./types"
import { compose, style } from "./style"

// Position

export type PositionValue = CSS.PositionProperty

export type PositionProp = Prop<PositionValue>

export interface PositionProps extends ThemeProps {
  position?: PositionProp
  pos?: PositionProp
}

export interface PositionStyle extends Style {
  position: PositionValue
}

export const position = style<PositionProps, PositionStyle>({
  propsKeys: ["position", "pos"]
})

// Z Index

export type ZIndexValue = CSS.ZIndexProperty

export type ZIndexProp = Prop<ZIndexValue>

export interface ZIndexProps extends ThemeProps {
  zIndex?: ZIndexProp
  zi?: ZIndexProp
}

export interface ZIndexStyle extends Style {
  zIndex: ZIndexValue
}

export const zIndex = style<ZIndexProps, ZIndexStyle>({
  propsKeys: ["zIndex", "zi"],
  themeKeys: ["zIndices"]
})

// Top

export type TopValue = CSS.TopProperty<Length>

export type TopProp = Prop<TopValue>

export interface TopProps extends ThemeProps {
  top?: TopProp
  t?: TopProp
}

export interface TopStyle extends Style {
  top: TopValue
}

export const top = style<TopProps, TopStyle>({
  propsKeys: ["top", "t"]
})

// Right

export type RightValue = CSS.RightProperty<Length>

export type RightProp = Prop<RightValue>

export interface RightProps extends ThemeProps {
  right?: RightProp
  r?: RightProp
}

export interface RightStyle extends Style {
  right: RightValue
}

export const right = style<RightProps, RightStyle>({
  propsKeys: ["right", "r"]
})

// Bottom

export type BottomValue = CSS.BottomProperty<Length>

export type BottomProp = Prop<BottomValue>

export interface BottomProps extends ThemeProps {
  bottom?: BottomProp
  b?: BottomProp
}

export interface BottomStyle extends Style {
  bottom: BottomValue
}

export const bottom = style<BottomProps, BottomStyle>({
  propsKeys: ["bottom", "b"]
})

// Left

export type LeftValue = CSS.LeftProperty<Length>

export type LeftProp = Prop<LeftValue>

export interface LeftProps extends ThemeProps {
  left?: LeftProp
  l?: LeftProp
}

export interface LeftStyle extends Style {
  left: LeftValue
}

export const left = style<LeftProps, LeftStyle>({
  propsKeys: ["left", "l"]
})

// Edge

export type EdgeProps = TopProps & RightProps & BottomProps & LeftProps

export type EdgeStyle = TopStyle & RightStyle & BottomStyle & LeftStyle

export const edge = compose<EdgeProps, EdgeStyle>([top, right, bottom, left])
