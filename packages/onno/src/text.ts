import * as C from "csstype"
import * as T from "./types"
import { addPx } from "./utils"
import { compose, style } from "./style"
import { color, ColorProps, ColorStyle } from "./color"

// Font Family

export type FontFamilyValue = C.FontFamilyProperty

export type FontFamilyProp = T.Prop<FontFamilyValue | number>

export interface FontFamilyProps extends T.ThemeProps {
  fontFamily?: FontFamilyProp
  ff?: FontFamilyProp
}

export interface FontFamilyStyle extends T.Style {
  fontFamily?: FontFamilyValue
}

export const fontFamily = style<FontFamilyProps, FontFamilyStyle>({
  propsKeys: ["fontFamily", "ff"],
  themeKeys: ["fontFamilies"],
  defaults: {
    main: "system-ui, sans-serif",
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
  fontSize?: FontSizeValue
}

export const fontSize = style<FontSizeProps, FontSizeStyle>({
  propsKeys: ["fontSize", "fs"],
  themeKeys: ["fontSizes"],
  transform: addPx,
  defaults: [12, 14, 16, 20, 24, 32, 48, 64]
})

// Font Style

export type FontStyleValue = C.FontStyleProperty

export type FontStyleProp = T.Prop<FontStyleValue>

export interface FontStyleProps extends T.ThemeProps {
  fontStyle?: FontStyleProp
  fst?: FontStyleProp
}

export interface FontStyleStyle extends T.Style {
  fontStyle?: FontStyleValue
}

export const fontStyle = style<FontStyleProps, FontStyleStyle>({
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
  fontWeight?: FontWeightValue
}

export const fontWeight = style<FontWeightProps, FontWeightStyle>({
  propsKeys: ["fontWeight", "fw"],
  themeKeys: ["fontWeights"],
  defaults: {
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
  lineHeight?: LineHeightValue
}

export const lineHeight = style<LineHeightProps, LineHeightStyle>({
  propsKeys: ["lineHeight", "lh"],
  themeKeys: ["lineHeights"],
  defaults: {
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
  letterSpacing?: LetterSpacingValue
}

export const letterSpacing = style<LetterSpacingProps, LetterSpacingStyle>({
  propsKeys: ["letterSpacing", "ls"],
  themeKeys: ["letterSpacings"],
  transform: addPx
})

// Text Align

export type TextAlignValue = C.TextAlignProperty

export type TextAlignProp = T.Prop<TextAlignValue>

export interface TextAlignProps extends T.ThemeProps {
  textAlign?: TextAlignProp
  ta?: TextAlignProp
}

export interface TextAlignStyle extends T.Style {
  textAlign?: TextAlignValue
}

export const textAlign = style<TextAlignProps, TextAlignStyle>({
  propsKeys: ["textAlign", "ta"]
})

// Text Decoration

export type TextDecorationValue = C.TextDecorationProperty

export type TextDecorationProp = T.Prop<TextDecorationValue>

export interface TextDecorationProps extends T.ThemeProps {
  textDecoration?: TextDecorationProp
  td?: TextDecorationProp
}

export interface TextDecorationStyle extends T.Style {
  textDecoration?: TextDecorationValue
}

export const textDecoration = style<TextDecorationProps, TextDecorationStyle>({
  propsKeys: ["textDecoration", "td"]
})

// Text Transform

export type TextTransformValue = C.TextTransformProperty

export type TextTransformProp = T.Prop<TextTransformValue>

export interface TextTransformProps extends T.ThemeProps {
  textTransform?: TextTransformProp
  tt?: TextTransformProp
}

export interface TextTransformStyle extends T.Style {
  textTransform?: TextTransformValue
}

export const textTransform = style<TextTransformProps, TextTransformStyle>({
  propsKeys: ["textTransform", "tt"]
})

// Text Set

export type TextSetProps = FontFamilyProps &
  FontSizeProps &
  FontStyleProps &
  FontWeightProps &
  LineHeightProps &
  LetterSpacingProps &
  TextAlignProps &
  TextDecorationProps &
  TextTransformProps &
  ColorProps

export type TextSetStyle = FontFamilyStyle &
  FontSizeStyle &
  FontStyleStyle &
  FontWeightStyle &
  LineHeightStyle &
  LetterSpacingStyle &
  TextAlignStyle &
  TextDecorationStyle &
  TextTransformStyle &
  ColorStyle

export const textSet = compose<TextSetProps, TextSetStyle>([
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  textDecoration,
  textTransform,
  color
])
