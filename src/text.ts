import { StyleProp, ThemeProps } from "./types"
import { style } from "./style"
import { addPx } from "./utils"

export interface FontFamilyProps extends ThemeProps {
  fontFamily?: StyleProp
  ff?: StyleProp
}

export const fontFamily = style<FontFamilyProps>({
  propsKeys: ["fontFamily", "ff"],
  styleKeys: ["fontFamily"],
  themeKeys: ["fontFamilies", "fonts"],
  fallback: {
    text: "system-ui, sans-serif",
    mono: "Monaco, monospace"
  }
})

export interface FontSizeProps extends ThemeProps {
  fontSize?: StyleProp
  fs?: StyleProp
}

export const fontSize = style({
  propsKeys: ["fontSize", "fs"],
  styleKeys: ["fontSize"],
  themeKeys: ["fontSizes"],
  transform: addPx,
  fallback: [12, 14, 16, 20, 24, 32, 48, 64]
})

export interface FontWeightProps extends ThemeProps {
  fontWeight?: StyleProp
  fw?: StyleProp
}

export const fontWeight = style({
  propsKeys: ["fontWeight", "fw"],
  styleKeys: ["fontWeight"],
  themeKeys: ["fontWeights"],
  fallback: {
    normal: 400,
    bold: 700
  }
})

export interface FontStyleProps extends ThemeProps {
  fontStyle?: StyleProp
  fs?: StyleProp
}

export const fontStyle = style({
  propsKeys: ["fontStyle", "ft"],
  styleKeys: ["fontStyle"]
})

export interface LineHeightProps extends ThemeProps {
  lineHeight?: StyleProp
  lh?: StyleProp
}

export const lineHeight = style({
  propsKeys: ["lineHeight", "lh"],
  styleKeys: ["lineHeight"],
  themeKeys: ["lineHeights"],
  fallback: {
    normal: 1.5,
    narrow: 1.25,
    single: 1
  }
})

export interface LetterSpacingProps extends ThemeProps {
  letterSpacing?: StyleProp
  ls?: StyleProp
}

export const letterSpacing = style({
  propsKeys: ["letterSpacing", "ls"],
  styleKeys: ["letterSpacings"],
  transform: addPx
})

export interface TextAlignProps extends ThemeProps {
  textAlign?: StyleProp
  ta?: StyleProp
}

export const textAlign = style({
  propsKeys: ["textAlign", "ta"],
  styleKeys: ["textAlign"]
})

export type TextProps = FontFamilyProps &
  FontSizeProps &
  FontWeightProps &
  FontStyleProps &
  LineHeightProps &
  LetterSpacingProps &
  TextAlignProps
