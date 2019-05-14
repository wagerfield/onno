import * as T from "./types"
import { style } from "./style"

export type VariantProp = T.Prop<number | string>

// Button

export interface ButtonVariantProps extends T.ThemeProps {
  buttonStyle?: VariantProp
  bst?: VariantProp
}

export const buttonStyle = style<ButtonVariantProps>({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  styleKeys: null
})

// Color

export interface ColorVariantProps extends T.ThemeProps {
  colorStyle?: VariantProp
  cst?: VariantProp
}

export const colorStyle = style<ColorVariantProps>({
  propsKeys: ["colorStyle", "cst"],
  themeKeys: ["colorStyles"],
  styleKeys: null
})

// Text

export interface TextVariantProps extends T.ThemeProps {
  textStyle?: VariantProp
  tst?: VariantProp
}

export const textStyle = style<TextVariantProps>({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"],
  styleKeys: null
})
