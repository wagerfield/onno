import { StyleProp, ThemeProps } from "./types"
import { extend } from "./style"

const style = extend({
  themeKeys: ["palette", "colors"],
  fallback: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F",
    bg: "#FFF"
  }
})

export interface BackgroundColorProps extends ThemeProps {
  backgroundColor?: StyleProp
  bgc?: StyleProp
  bg?: StyleProp
}

export const backgroundColor = style<BackgroundColorProps>({
  propsKeys: ["backgroundColor", "bgc", "bg"],
  styleKeys: ["backgroundColor"]
})

export interface TextColorProps extends ThemeProps {
  color?: StyleProp
  tc?: StyleProp
}

export const textColor = style<TextColorProps>({
  propsKeys: ["color", "tc"],
  styleKeys: ["color"]
})

export type ColorProps = BackgroundColorProps & TextColorProps
