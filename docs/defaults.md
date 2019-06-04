# Defaults<!-- omit in toc -->

A number of onno's [render functions](render-functions.md) are configured with [default lookups](api.md#defaults). These default lookups are used to resolve values in the absence of overrides in your theme.

- [Color](#color)
- [Space](#space)
- [Layout](#layout)
- [Text](#text)
  - [fontFamily](#fontfamily)
  - [fontSize](#fontsize)
  - [fontWeight](#fontweight)
  - [lineHeight](#lineheight)

## Color

[Color render functions](render-functions.md#color) like `backgroundColor` and `borderColor` use the following default lookup object:

```js
const COLORS = {
  gray: ["#EEE", "#AAA", "#666"],
  text: "#222",
  link: "#00F"
}
```

This is a _very_ bare bones palette to get you started. To define your own palette, add a `colors` lookup to your theme.

Render functions that use the default `COLORS` are:

- background
- backgroundColor
- borderColor
- color

## Space

[Space render functions](render-functions.md#space) like `margin` and `padding` use the `PX_SCALE` by default:

```js
const PX_SCALE = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512]
```

The `PX_SCALE` is derived by raising 2 to the power of the array index:

```js
const PX_SCALE = [
  0, // 2 ^ 0 = 1 (this is the only exception to the rule)
  2, // 2 ^ 1 = 2
  4, // 2 ^ 2 = 4
  8, // 2 ^ 3 = 8
  16, // 2 ^ 4 = 16
  32, // 2 ^ 5 = 32
  64, // 2 ^ 6 = 64
  128, // 2 ^ 7 = 128
  256, // 2 ^ 8 = 256
  512 // 2 ^ 9 = 512
]
```

This makes it intuitive to work with once you're familiar with the powers of 2 table.

Render functions that use `PX_SCALE` are:

- borderRadius
- gridGap
- gridRowGap
- gridColumnGap
- marginTop
- marginRight
- marginBottom
- marginLeft
- marginX
- marginY
- margin
- paddingTop
- paddingRight
- paddingBottom
- paddingLeft
- paddingX
- paddingY
- padding

## Layout

[Layout render functions](render-functions.md#layout) like `width` and `left` use the `PC_SCALE` by default.

The `PC_SCALE` is a clone of `PX_SCALE` with the second value of `2` replaced with `100%`.

```js
const PC_SCALE = [0, "100%", 4, 8, 16, 32, 64, 128, 256, 512]
```

The reason `PC_SCALE` replaces the second value of `2` with `100%` is so that layout render functions that use the `addPcOrPx` transform function can pass `1` as a prop value and have it convert to `100%` rather than `2px`. When working with layout related properties like `width` or `left` this is generally the desired behaviour.

Render functions that use `PC_SCALE` are:

- top
- right
- bottom
- left
- size
- width
- minWidth
- maxWidth
- height
- minHeight
- maxHeight

## Text

[Text render functions](render-functions.md#text) like `fontFamily` and `lineHeight` have their own unique default lookups.

### fontFamily

```js
const FONT_FAMILIES = {
  main: "system-ui, sans-serif",
  mono: "Monaco, monospace"
}
```

### fontSize

```js
const FONT_SIZES = [12, 14, 16, 20, 24, 32, 40, 48, 56, 64]
```

### fontWeight

```js
const FONT_WEIGHTS = {
  normal: 400,
  bold: 700
}
```

### lineHeight

```js
const LINE_HEIGHTS = {
  normal: 1.5,
  narrow: 1.25,
  single: 1
}
```
