import * as T from "./types"
import { variant } from "./style"

export type VariantProp = T.Prop<number | string>

// Button

export interface ButtonVariantProps extends T.ThemeProps {
  buttonStyle?: VariantProp
  bst?: VariantProp
}

export const buttonStyle = variant<ButtonVariantProps>({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"]
})

// Color

export interface ColorVariantProps extends T.ThemeProps {
  colorStyle?: VariantProp
  cst?: VariantProp
}

export const colorStyle = variant<ColorVariantProps>({
  propsKeys: ["colorStyle", "cst"],
  themeKeys: ["colorStyles"]
})

// Text

export interface TextVariantProps extends T.ThemeProps {
  textStyle?: VariantProp
  tst?: VariantProp
}

export const textStyle = variant<TextVariantProps>({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"]
})
