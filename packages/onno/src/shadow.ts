import * as C from "csstype"
import * as T from "./types"
import { style } from "./style"

// Box Shadow

export type BoxShadowValue = C.BoxShadowProperty

export type BoxShadowProp = T.Prop<BoxShadowValue>

export interface BoxShadowProps extends T.ThemeProps {
  boxShadow?: BoxShadowProp
  bsh?: BoxShadowProp
}

export interface BoxShadowStyle extends T.Style {
  boxShadow?: BoxShadowValue
}

export const boxShadow = style<BoxShadowProps, BoxShadowStyle>({
  propsKeys: ["boxShadow", "bsh"],
  themeKeys: ["boxShadows", "shadows"]
})

// Text Shadow

export type TextShadowValue = C.TextShadowProperty

export type TextShadowProp = T.Prop<TextShadowValue>

export interface TextShadowProps extends T.ThemeProps {
  textShadow?: TextShadowProp
  tsh?: TextShadowProp
}

export interface TextShadowStyle extends T.Style {
  textShadow?: TextShadowValue
}

export const textShadow = style<TextShadowProps, TextShadowStyle>({
  propsKeys: ["textShadow", "tsh"],
  themeKeys: ["textShadows"]
})
