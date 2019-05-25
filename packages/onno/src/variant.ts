import * as T from "./types"
import { variant } from "./style"

export type VariantProp = T.Prop<number | string>

// Button

export interface ButtonStyleProps extends T.ThemeProps {
  buttonStyle?: VariantProp
  bst?: VariantProp
}

export const buttonStyle = variant<ButtonStyleProps>({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"]
})

// Color

export interface ColorStyleProps extends T.ThemeProps {
  colorStyle?: VariantProp
  cst?: VariantProp
}

export const colorStyle = variant<ColorStyleProps>({
  propsKeys: ["colorStyle", "cst"],
  themeKeys: ["colorStyles"]
})

// Text

export interface TextStyleProps extends T.ThemeProps {
  textStyle?: VariantProp
  tst?: VariantProp
}

export const textStyle = variant<TextStyleProps>({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"]
})
