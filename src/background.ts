import * as C from "csstype"
import * as T from "./types"
import * as P from "./color"
import * as S from "./style"

const ex = S.style

// Background Image

export type BackgroundImageValue = C.BackgroundImageProperty

export type BackgroundImageProp = T.Prop<BackgroundImageValue>

export interface BackgroundImageProps extends T.ThemeProps {
  backgroundImage?: BackgroundImageProp
  bgi?: BackgroundImageProp
}

export interface BackgroundImageStyle extends T.Style {
  backgroundImage: BackgroundImageValue
}

export const backgroundImage = ex<BackgroundImageProps, BackgroundImageStyle>({
  propsKeys: ["backgroundImage", "bgi"]
})

// Background Position

export type BackgroundPositionValue = C.BackgroundPositionProperty<T.Length>

export type BackgroundPositionProp = T.Prop<BackgroundPositionValue>

export interface BackgroundPositionProps extends T.ThemeProps {
  backgroundPosition?: BackgroundPositionProp
  bgp?: BackgroundPositionProp
}

export interface BackgroundPositionStyle extends T.Style {
  backgroundPosition: BackgroundPositionValue
}

export const backgroundPosition = ex<
  BackgroundPositionProps,
  BackgroundPositionStyle
>({
  propsKeys: ["backgroundPosition", "bgp"]
})

// Background Repeat

export type BackgroundRepeatValue = C.BackgroundRepeatProperty

export type BackgroundRepeatProp = T.Prop<BackgroundRepeatValue>

export interface BackgroundRepeatProps extends T.ThemeProps {
  backgroundRepeat?: BackgroundRepeatProp
  bgr?: BackgroundRepeatProp
}

export interface BackgroundRepeatStyle extends T.Style {
  backgroundRepeat: BackgroundRepeatValue
}

export const backgroundRepeat = ex<
  BackgroundRepeatProps,
  BackgroundRepeatStyle
>({
  propsKeys: ["backgroundRepeat", "bgr"]
})

// Background Size

export type BackgroundSizeValue = C.BackgroundSizeProperty<T.Length>

export type BackgroundSizeProp = T.Prop<BackgroundSizeValue>

export interface BackgroundSizeProps extends T.ThemeProps {
  backgroundSize?: BackgroundSizeProp
  bgs?: BackgroundSizeProp
}

export interface BackgroundSizeStyle extends T.Style {
  backgroundSize: BackgroundSizeValue
}

export const backgroundSize = ex<BackgroundSizeProps, BackgroundSizeStyle>({
  propsKeys: ["backgroundSize", "bgs"]
})

// Background

export type BackgroundProps = P.BackgroundColorProps &
  BackgroundImageProps &
  BackgroundPositionProps &
  BackgroundRepeatProps &
  BackgroundSizeProps

export type BackgroundStyle = P.BackgroundColorStyle &
  BackgroundImageStyle &
  BackgroundPositionStyle &
  BackgroundRepeatStyle &
  BackgroundSizeStyle

export const background = S.compose<BackgroundProps, BackgroundStyle>([
  P.backgroundColor,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize
])
