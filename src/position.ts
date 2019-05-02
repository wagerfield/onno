import * as C from "csstype"
import * as T from "./types"
import * as S from "./style"

// Position

export type PositionValue = C.PositionProperty

export type PositionProp = T.Prop<PositionValue>

export interface PositionProps extends T.ThemeProps {
  position?: PositionProp
  pos?: PositionProp
}

export interface PositionStyle extends T.Style {
  position: PositionValue
}

export const position = S.style<PositionProps, PositionStyle>({
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
  zIndex: ZIndexValue
}

export const zIndex = S.style<ZIndexProps, ZIndexStyle>({
  propsKeys: ["zIndex", "zi"],
  themeKeys: ["zIndices"]
})

// Top

export type TopValue = C.TopProperty<T.Length>

export type TopProp = T.Prop<TopValue>

export interface TopProps extends T.ThemeProps {
  top?: TopProp
  t?: TopProp
}

export interface TopStyle extends T.Style {
  top: TopValue
}

export const top = S.style<TopProps, TopStyle>({
  propsKeys: ["top", "t"]
})

// Right

export type RightValue = C.RightProperty<T.Length>

export type RightProp = T.Prop<RightValue>

export interface RightProps extends T.ThemeProps {
  right?: RightProp
  r?: RightProp
}

export interface RightStyle extends T.Style {
  right: RightValue
}

export const right = S.style<RightProps, RightStyle>({
  propsKeys: ["right", "r"]
})

// Bottom

export type BottomValue = C.BottomProperty<T.Length>

export type BottomProp = T.Prop<BottomValue>

export interface BottomProps extends T.ThemeProps {
  bottom?: BottomProp
  b?: BottomProp
}

export interface BottomStyle extends T.Style {
  bottom: BottomValue
}

export const bottom = S.style<BottomProps, BottomStyle>({
  propsKeys: ["bottom", "b"]
})

// Left

export type LeftValue = C.LeftProperty<T.Length>

export type LeftProp = T.Prop<LeftValue>

export interface LeftProps extends T.ThemeProps {
  left?: LeftProp
  l?: LeftProp
}

export interface LeftStyle extends T.Style {
  left: LeftValue
}

export const left = S.style<LeftProps, LeftStyle>({
  propsKeys: ["left", "l"]
})

// Edge

export type EdgeProps = TopProps & RightProps & BottomProps & LeftProps

export type EdgeStyle = TopStyle & RightStyle & BottomStyle & LeftStyle

export const edge = S.compose<EdgeProps, EdgeStyle>([top, right, bottom, left])
