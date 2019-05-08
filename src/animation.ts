import * as C from "csstype"
import * as T from "./types"
import { style } from "./style"

// Animation

export type AnimationValue = C.AnimationProperty

export type AnimationProp = T.Prop<AnimationValue>

export interface AnimationProps extends T.ThemeProps {
  animation?: AnimationProp
}

export interface AnimationStyle extends T.Style {
  animation: AnimationValue
}

export const animation = style<AnimationProps, AnimationStyle>({
  propsKeys: ["animation"],
  themeKeys: ["animations"]
})

// Transition

export type TransitionValue = C.TransitionProperty

export type TransitionProp = T.Prop<TransitionValue>

export interface TransitionProps extends T.ThemeProps {
  transition?: TransitionProp
}

export interface TransitionStyle extends T.Style {
  transition: TransitionValue
}

export const transition = style<TransitionProps, TransitionStyle>({
  propsKeys: ["transition"],
  themeKeys: ["transitions"]
})
