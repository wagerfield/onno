import * as C from "csstype"
import * as T from "./types"
import * as S from "./style"

// Box Shadow

export type BoxShadowValue = C.BoxShadowProperty

export type BoxShadowProp = T.Prop<BoxShadowValue>

export interface BoxShadowProps extends T.ThemeProps {
  boxShadow?: BoxShadowProp
  bs?: BoxShadowProp
}

export interface BoxShadowStyle extends T.Style {
  boxShadow: BoxShadowValue
}

export const boxShadow = S.style<BoxShadowProps, BoxShadowStyle>({
  propsKeys: ["boxShadow", "bs"],
  themeKeys: ["boxShadows"]
})

// Text Shadow

export type TextShadowValue = C.TextShadowProperty

export type TextShadowProp = T.Prop<TextShadowValue>

export interface TextShadowProps extends T.ThemeProps {
  textShadow?: TextShadowProp
  ts?: TextShadowProp
}

export interface TextShadowStyle extends T.Style {
  textShadow: TextShadowValue
}

export const textShadow = S.style<TextShadowProps, TextShadowStyle>({
  propsKeys: ["textShadow", "ts"],
  themeKeys: ["textShadows"]
})
