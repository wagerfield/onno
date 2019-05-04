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

// Edge

export type EdgeValue = C.Globals | "auto" | string | number

export type EdgeProp = T.Prop<EdgeValue>

// Top

export interface TopProps extends T.ThemeProps {
  top?: EdgeProp
  t?: EdgeProp
}

export interface TopStyle extends T.Style {
  top: EdgeValue
}

export const top = S.style<TopProps, TopStyle>({
  propsKeys: ["top", "t"]
})

// Right

export interface RightProps extends T.ThemeProps {
  right?: EdgeProp
  r?: EdgeProp
}

export interface RightStyle extends T.Style {
  right: EdgeValue
}

export const right = S.style<RightProps, RightStyle>({
  propsKeys: ["right", "r"]
})

// Bottom

export interface BottomProps extends T.ThemeProps {
  bottom?: EdgeProp
  b?: EdgeProp
}

export interface BottomStyle extends T.Style {
  bottom: EdgeValue
}

export const bottom = S.style<BottomProps, BottomStyle>({
  propsKeys: ["bottom", "b"]
})

// Left

export interface LeftProps extends T.ThemeProps {
  left?: EdgeProp
  l?: EdgeProp
}

export interface LeftStyle extends T.Style {
  left: EdgeValue
}

export const left = S.style<LeftProps, LeftStyle>({
  propsKeys: ["left", "l"]
})

// Edge

export type EdgeProps = TopProps & RightProps & BottomProps & LeftProps

export type EdgeStyle = TopStyle & RightStyle & BottomStyle & LeftStyle

export const edge = S.compose<EdgeProps, EdgeStyle>([top, right, bottom, left])

// Move

export type MoveProps = PositionProps & ZIndexProps & EdgeProps

export type MoveStyle = PositionStyle & ZIndexStyle & EdgeStyle

export const move = S.compose<MoveProps, MoveStyle>([position, zIndex, edge])
