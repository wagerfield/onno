import * as CSS from "csstype"
import { Length, Prop, Style, ThemeProps, Unit } from "./types"
import { compose, style } from "./style"
import { addPx } from "./utils"

// Font Family

export type FontFamilyValue = CSS.FontFamilyProperty

export type FontFamilyProp = Prop<FontFamilyValue | Unit>

export interface FontFamilyProps extends ThemeProps {
  fontFamily?: FontFamilyProp
  ff?: FontFamilyProp
}

export interface FontFamilyStyle extends Style {
  fontFamily: FontFamilyValue
}

export const fontFamily = style<FontFamilyProps, FontFamilyStyle>({
  propsKeys: ["fontFamily", "ff"],
  themeKeys: ["fontFamilies", "fonts"],
  fallback: {
    text: "system-ui, sans-serif",
    mono: "Monaco, monospace"
  }
})

// Font Size

export type FontSizeValue = CSS.FontSizeProperty<Length>

export type FontSizeProp = Prop<FontSizeValue>

export interface FontSizeProps extends ThemeProps {
  fontSize?: FontSizeProp
  fs?: FontSizeProp
}

export interface FontSizeStyle extends Style {
  fontSize: FontSizeValue
}

export const fontSize = style<FontSizeProps, FontSizeStyle>({
  propsKeys: ["fontSize", "fs"],
  themeKeys: ["fontSizes"],
  transform: addPx,
  fallback: [12, 14, 16, 20, 24, 32, 48, 64]
})

// Font Style

export type FontStyleValue = CSS.FontStyleProperty

export type FontStyleProp = Prop<FontStyleValue>

export interface FontStyleProps extends ThemeProps {
  fontStyle?: FontStyleProp
  ft?: FontStyleProp
}

export interface FontStyleStyle extends Style {
  fontStyle: FontStyleValue
}

export const fontStyle = style<FontStyleProps, FontStyleStyle>({
  propsKeys: ["fontStyle", "ft"]
})

// Font Weight

export type FontWeightValue = CSS.FontWeightProperty

export type FontWeightProp = Prop<FontWeightValue>

export interface FontWeightProps extends ThemeProps {
  fontWeight?: FontWeightProp
  fw?: FontWeightProp
}

export interface FontWeightStyle extends Style {
  fontWeight: FontWeightValue
}

export const fontWeight = style<FontWeightProps, FontWeightStyle>({
  propsKeys: ["fontWeight", "fw"],
  themeKeys: ["fontWeights"],
  fallback: {
    normal: 400,
    bold: 700
  }
})

// Line Height

export type LineHeightValue = CSS.LineHeightProperty<Length>

export type LineHeightProp = Prop<LineHeightValue>

export interface LineHeightProps extends ThemeProps {
  lineHeight?: LineHeightProp
  lh?: LineHeightProp
}

export interface LineHeightStyle extends Style {
  lineHeight: LineHeightValue
}

export const lineHeight = style<LineHeightProps, LineHeightStyle>({
  propsKeys: ["lineHeight", "lh"],
  themeKeys: ["lineHeights"],
  fallback: {
    normal: 1.5,
    narrow: 1.25,
    single: 1
  }
})

// Letter Spacing

export type LetterSpacingValue = CSS.LetterSpacingProperty<Length>

export type LetterSpacingProp = Prop<LetterSpacingValue>

export interface LetterSpacingProps extends ThemeProps {
  letterSpacing?: LetterSpacingProp
  ls?: LetterSpacingProp
}

export interface LetterSpacingStyle extends Style {
  letterSpacing: LetterSpacingValue
}

export const letterSpacing = style<LetterSpacingProps, LetterSpacingStyle>({
  propsKeys: ["letterSpacing", "ls"],
  themeKeys: ["letterSpacings"],
  transform: addPx
})

// Text Align

export type TextAlignValue = CSS.TextAlignProperty

export type TextAlignProp = Prop<TextAlignValue>

export interface TextAlignProps extends ThemeProps {
  textAlign?: TextAlignProp
  ta?: TextAlignProp
}

export interface TextAlignStyle extends Style {
  textAlign: TextAlignValue
}

export const textAlign = style<TextAlignProps, TextAlignStyle>({
  propsKeys: ["textAlign", "ta"]
})

// Text

export type TextProps = FontFamilyProps &
  FontSizeProps &
  FontStyleProps &
  FontWeightProps &
  LineHeightProps &
  LetterSpacingProps &
  TextAlignProps

export type TextStyle = FontFamilyStyle &
  FontSizeStyle &
  FontStyleStyle &
  FontWeightStyle &
  LineHeightStyle &
  LetterSpacingStyle &
  TextAlignStyle

export const text = compose<TextProps, TextStyle>([
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign
])
