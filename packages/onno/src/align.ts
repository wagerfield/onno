import * as C from "csstype"
import * as T from "./types"
import { style } from "./style"

// Align Content

export type AlignContentValue = C.AlignContentProperty

export type AlignContentProp = T.Prop<AlignContentValue>

export interface AlignContentProps extends T.ThemeProps {
  alignContent?: AlignContentProp
  alc?: AlignContentProp
}

export interface AlignContentStyle extends T.Style {
  alignContent?: AlignContentValue
}

export const alignContent = style<AlignContentProps, AlignContentStyle>({
  propsKeys: ["alignContent", "alc"]
})

// Align Items

export type AlignItemsValue = C.AlignItemsProperty

export type AlignItemsProp = T.Prop<AlignItemsValue>

export interface AlignItemsProps extends T.ThemeProps {
  alignItems?: AlignItemsProp
  ali?: AlignItemsProp
}

export interface AlignItemsStyle extends T.Style {
  alignItems?: AlignItemsValue
}

export const alignItems = style<AlignItemsProps, AlignItemsStyle>({
  propsKeys: ["alignItems", "ali"]
})

// Align Self

export type AlignSelfValue = C.AlignSelfProperty

export type AlignSelfProp = T.Prop<AlignSelfValue>

export interface AlignSelfProps extends T.ThemeProps {
  alignSelf?: AlignSelfProp
  als?: AlignSelfProp
}

export interface AlignSelfStyle extends T.Style {
  alignSelf?: AlignSelfValue
}

export const alignSelf = style<AlignSelfProps, AlignSelfStyle>({
  propsKeys: ["alignSelf", "als"]
})

// Justify Content

export type JustifyContentValue = C.JustifyContentProperty

export type JustifyContentProp = T.Prop<JustifyContentValue>

export interface JustifyContentProps extends T.ThemeProps {
  justifyContent?: JustifyContentProp
  jfc?: JustifyContentProp
}

export interface JustifyContentStyle extends T.Style {
  justifyContent?: JustifyContentValue
}

export const justifyContent = style<JustifyContentProps, JustifyContentStyle>({
  propsKeys: ["justifyContent", "jfc"]
})

// Justify Items

export type JustifyItemsValue = C.JustifyItemsProperty

export type JustifyItemsProp = T.Prop<JustifyItemsValue>

export interface JustifyItemsProps extends T.ThemeProps {
  justifyItems?: JustifyItemsProp
  jfi?: JustifyItemsProp
}

export interface JustifyItemsStyle extends T.Style {
  justifyItems?: JustifyItemsValue
}

export const justifyItems = style<JustifyItemsProps, JustifyItemsStyle>({
  propsKeys: ["justifyItems", "jfi"]
})

// Justify Self

export type JustifySelfValue = C.JustifySelfProperty

export type JustifySelfProp = T.Prop<JustifySelfValue>

export interface JustifySelfProps extends T.ThemeProps {
  justifySelf?: JustifySelfProp
  jfs?: JustifySelfProp
}

export interface JustifySelfStyle extends T.Style {
  justifySelf?: JustifySelfValue
}

export const justifySelf = style<JustifySelfProps, JustifySelfStyle>({
  propsKeys: ["justifySelf", "jfs"]
})

// Place Content

export type PlaceContentValue = C.PlaceContentProperty

export type PlaceContentProp = T.Prop<PlaceContentValue>

export interface PlaceContentProps extends T.ThemeProps {
  placeContent?: PlaceContentProp
  plc?: PlaceContentProp
}

export interface PlaceContentStyle extends T.Style {
  placeContent?: PlaceContentValue
}

export const placeContent = style<PlaceContentProps, PlaceContentStyle>({
  propsKeys: ["placeContent", "plc"]
})

// Place Items

export type PlaceItemsValue = C.PlaceItemsProperty

export type PlaceItemsProp = T.Prop<PlaceItemsValue>

export interface PlaceItemsProps extends T.ThemeProps {
  placeItems?: PlaceItemsProp
  pli?: PlaceItemsProp
}

export interface PlaceItemsStyle extends T.Style {
  placeItems?: PlaceItemsValue
}

export const placeItems = style<PlaceItemsProps, PlaceItemsStyle>({
  propsKeys: ["placeItems", "pli"]
})

// Place Self

export type PlaceSelfValue = C.PlaceSelfProperty

export type PlaceSelfProp = T.Prop<PlaceSelfValue>

export interface PlaceSelfProps extends T.ThemeProps {
  placeSelf?: PlaceSelfProp
  pls?: PlaceSelfProp
}

export interface PlaceSelfStyle extends T.Style {
  placeSelf?: PlaceSelfValue
}

export const placeSelf = style<PlaceSelfProps, PlaceSelfStyle>({
  propsKeys: ["placeSelf", "pls"]
})

// Order

export type OrderValue = C.Globals | number

export type OrderProp = T.Prop<OrderValue>

export interface OrderProps extends T.ThemeProps {
  order?: OrderProp
  ord?: OrderProp
}

export interface OrderStyle extends T.Style {
  order?: OrderValue
}

export const order = style<OrderProps, OrderStyle>({
  propsKeys: ["order", "ord"]
})
