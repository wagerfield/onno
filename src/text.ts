import * as C from "csstype"
import * as T from "./types"
import * as S from "./style"
import * as U from "./utils"
import * as P from "./color"

// Font Family

export type FontFamilyValue = C.FontFamilyProperty

export type FontFamilyProp = T.Prop<FontFamilyValue | number>

export interface FontFamilyProps extends T.ThemeProps {
  fontFamily?: FontFamilyProp
  ff?: FontFamilyProp
}

export interface FontFamilyStyle extends T.Style {
  fontFamily: FontFamilyValue
}

export const fontFamily = S.style<FontFamilyProps, FontFamilyStyle>({
  propsKeys: ["fontFamily", "ff"],
  themeKeys: ["fontFamilies"],
  fallback: {
    text: "system-ui, sans-serif",
    mono: "Monaco, monospace"
  }
})

// Font Size

export type FontSizeValue = C.FontSizeProperty<T.Length>

export type FontSizeProp = T.Prop<FontSizeValue>

export interface FontSizeProps extends T.ThemeProps {
  fontSize?: FontSizeProp
  fs?: FontSizeProp
}

export interface FontSizeStyle extends T.Style {
  fontSize: FontSizeValue
}

export const fontSize = S.style<FontSizeProps, FontSizeStyle>({
  propsKeys: ["fontSize", "fs"],
  themeKeys: ["fontSizes"],
  transform: U.addPx,
  fallback: [12, 14, 16, 20, 24, 32, 48, 64]
})

// Font Style

export type FontStyleValue = C.FontStyleProperty

export type FontStyleProp = T.Prop<FontStyleValue>

export interface FontStyleProps extends T.ThemeProps {
  fontStyle?: FontStyleProp
  fst?: FontStyleProp
}

export interface FontStyleStyle extends T.Style {
  fontStyle: FontStyleValue
}

export const fontStyle = S.style<FontStyleProps, FontStyleStyle>({
  propsKeys: ["fontStyle", "fst"]
})

// Font Weight

export type FontWeightValue = C.FontWeightProperty | string

export type FontWeightProp = T.Prop<FontWeightValue>

export interface FontWeightProps extends T.ThemeProps {
  fontWeight?: FontWeightProp
  fw?: FontWeightProp
}

export interface FontWeightStyle extends T.Style {
  fontWeight: FontWeightValue
}

export const fontWeight = S.style<FontWeightProps, FontWeightStyle>({
  propsKeys: ["fontWeight", "fw"],
  themeKeys: ["fontWeights"],
  fallback: {
    normal: 400,
    bold: 700
  }
})

// Line Height

export type LineHeightValue = C.LineHeightProperty<T.Length>

export type LineHeightProp = T.Prop<LineHeightValue>

export interface LineHeightProps extends T.ThemeProps {
  lineHeight?: LineHeightProp
  lh?: LineHeightProp
}

export interface LineHeightStyle extends T.Style {
  lineHeight: LineHeightValue
}

export const lineHeight = S.style<LineHeightProps, LineHeightStyle>({
  propsKeys: ["lineHeight", "lh"],
  themeKeys: ["lineHeights"],
  fallback: {
    normal: 1.5,
    narrow: 1.25,
    single: 1
  }
})

// Letter Spacing

export type LetterSpacingValue = C.LetterSpacingProperty<T.Length | string>

export type LetterSpacingProp = T.Prop<LetterSpacingValue>

export interface LetterSpacingProps extends T.ThemeProps {
  letterSpacing?: LetterSpacingProp
  ls?: LetterSpacingProp
}

export interface LetterSpacingStyle extends T.Style {
  letterSpacing: LetterSpacingValue
}

export const letterSpacing = S.style<LetterSpacingProps, LetterSpacingStyle>({
  propsKeys: ["letterSpacing", "ls"],
  themeKeys: ["letterSpacings"],
  transform: U.addPx
})

// Text Align

export type TextAlignValue = C.TextAlignProperty

export type TextAlignProp = T.Prop<TextAlignValue>

export interface TextAlignProps extends T.ThemeProps {
  textAlign?: TextAlignProp
  ta?: TextAlignProp
}

export interface TextAlignStyle extends T.Style {
  textAlign: TextAlignValue
}

export const textAlign = S.style<TextAlignProps, TextAlignStyle>({
  propsKeys: ["textAlign", "ta"]
})

// Text Set

export type TextSetProps = FontFamilyProps &
  FontSizeProps &
  FontStyleProps &
  FontWeightProps &
  LineHeightProps &
  LetterSpacingProps &
  TextAlignProps &
  P.ColorProps

export type TextSetStyle = FontFamilyStyle &
  FontSizeStyle &
  FontStyleStyle &
  FontWeightStyle &
  LineHeightStyle &
  LetterSpacingStyle &
  TextAlignStyle &
  P.ColorStyle

export const textSet = S.compose<TextSetProps, TextSetStyle>([
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  P.color
])
