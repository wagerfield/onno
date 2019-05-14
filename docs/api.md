# API

At the core of `onno` is the `style` function.

The `style` function takes an `options` object and returns a `render` function.

The returned `render` function can then be called with some `props` to produce an array of style objects. Style object arrays are supported by the majority of CSS in JS libraries including [styled-components][styled-components] and [emotion][emotion].

The `style` function pipeline is illustrated below:

    style = (options) => (props) => styles

## `style`

The `style` function is _incredibly_ versatile and can be used in a variety of ways to produce powerful `render` functions.

It expects an `options` object as the first and _only_ argument with the following key values:

### `options`

| Key                       | Type            | Required | Description                          |
| :------------------------ | :-------------- | :------- | :----------------------------------- |
| [`propsKeys`](#propskeys) | `String[]`      | `true`   | Props keys to map values from        |
| [`styleKeys`](#styleKeys) | `String[]`      | `false`  | Style keys render values to          |
| [`themeKeys`](#themeKeys) | `String[]`      | `false`  | Theme keys to lookup values from     |
| [`transform`](#transform) | `Function`      | `false`  | Function to transform values through |
| [`defaults`](#defaults)   | `Array\|Object` | `false`  | Default lookup array or object       |

#### `propsKeys`

An array of `props` keys to map values from. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const width = style({
  propsKeys: ["width", "w"]
})

const Box = styled.div`
  ${width}
`

// [{ width: "100px" }]
<Box width="100px" />

// [{ width: "50%" }]
<Box w="50%" />

// [{ width: "200px" }]
<Box w="25%" width="200px" />
```

In the above example, the `width` render function is used in the styled `Box` component CSS template.

Any `props` on the `Box` component that match the provided `propsKeys` will be mapped to the rendered style object array.

Since `["width", "w"]` is passed as `propsKeys` both keys can be used as `props` to render the provided value to the returned style object array. This interface allows you to specify aliases for the same mapping.

**NOTE:** As is the case with _all_ options keys, the order of precedence is respected. In the last example where both "w" and "width" are provided, the "width" value takes precedence over the "w" value.

#### `styleKeys`

An array of `style` keys to map values to. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const size = style({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"]
})

const Box = styled.div`
  ${size}
`

// [{ width: "100px", height: "100px" }]
<Box size="100px" />

// [{ width: "50%", height: "50%" }]
<Box s="50%" />

// [{ width: "200px", height: "200px" }]
<Box s="25%" size="200px" />
```

When `styleKeys` are left undefined, the first value in the `propsKeys` array will be used. In the `propsKeys` [example above](#propskeys) the first "width" key is therefore used as the `styleKeys` default value.

In cases where you simply want to map a CSS property like `display` or `fontSize` to the same prop key, you can omit `styleKeys`.

However, in cases like the `size` render function above where you want to map some `propsKeys` like `["size", "s"]` to different `styleKeys` like `["width", "height"]`, this interface allows you to do so.

Finally, in special cases where you do not want values to be mapped to `styleKeys` you can pass `null`. This functionality is useful for creating `variant` functions.

A `variant` function allows you to map a value (typically a string key) to a style object in a `theme` or the `defaults` if provided. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const buttonStyle = style({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  styleKeys: null
})

const Button = styled.button`
  ${buttonStyle}
`

const theme = {
  buttonStyles: {
    primary: {
      background: "green"
      color: "white"
    },
    secondary: {
      background: "gray"
      color: "black"
    }
  }
}

// [{ background: "green", color: "white" }]
<Button buttonStyle="primary" theme={theme} />

// [{ background: "gray", color: "black" }]
<Button bst="secondary" theme={theme} />
```

#### `themeKeys`

An array of `theme` keys to lookup values from. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const maxWidth = style({
  propsKeys: ["maxWidth", "maxw"],
  themeKeys: ["maxWidths", "sizes"]
})

const Box = styled.div`
  ${maxWidth}
`

const theme = {
  maxWidths: ["128px", "256px"],
  sizes: [0, "16px", "32px", "64px"]
}

// [{ maxWidth: "256px" }]
<Box maxWidth={1} theme={theme} />

// [{ maxWidth: "32px" }]
<Box maxw={2} theme={theme} />

// [{ maxWidth: 4 }]
<Box maxw={4} theme={theme} />
```

In the example above the `maxWidth` render function has two `themeKeys`. Typically you will only have one key, but this demonstrates that multiple theme keys can be used to lookup and resolve a value.

Since both `maxWidths` and `sizes` are specified as arrays of values within the `theme` their values are resolved by passing integers which index the array.

The first `Box` passes an index of "1" which resolves to "256px" from the `maxWidths` theme array. The second `Box` passes an index of "2" which falls outside of the `maxWidths` array, so the resolver moves onto the next theme key (`sizes`) where it is able to resolve the value of "32px" at this location. The third `Box` passes an index of "4" which falls outside the `sizes` theme array and therefore the raw value of "4" is rendered.

**NOTE:** Both `props` and `themeKeys` support dot syntax strings to allow you to nest parts of your theme if so desired. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const fontFamily = style({
  propsKeys: ["fontFamily", "ff"],
  themeKeys: ["typography.fontFamilies"]
})

const fontSize = style({
  propsKeys: ["fontSize", "fs"],
  themeKeys: ["typography.fontSizes"]
})

const color = style({
  propsKeys: ["color", "tc"],
  themeKeys: ["colors"]
})

const Text = styled.div`
  ${fontFamily}
  ${fontSize}
  ${color}
`

const theme = {
  typography: {
    fontFamilies: {
      main: "sans-serif",
      mono: "monospace"
    },
    fontSizes: ["16px", "24px", "32px"]
  },
  colors: {
    light: {
      text: "black",
      bg: "white"
    },
    dark: {
      text: "white",
      bg: "black"
    }
  }
}

// [{ fontFamily: "sans-serif", fontSize: "24px", color: "black" }]
<Text fontFamily="main" fontSize={1} color="light.text" theme={theme} />

// [{ fontFamily: "monospace", fontSize: "32px", color: "white" }]
<Text ff="mono" fs={2} tc="dark.text" theme={theme} />
```

In the example above, the `fontFamilies` and `fontSizes` theme objects are nested inside a `typography` object. Specifying `themeKeys` to `["typography.fontSizes"]` for both the `fontFamily` and `fontSize` render functions causes `props` values to be resolved at this location within the `theme`.

The `colors` theme object also has values nested within it. However, since `themeKeys` is specified as `["colors"]` the values have to be accessed via dot syntax in the `props` values instead.

#### `transform`

Function to transform resolved values through. For example:

```jsx
import styled from "styled-components"
import { style, addPx } from "onno"

const margin = style({
  propsKeys: ["margin", "m"],
  transform: addPx
})

const Box = styled.div`
  ${margin}
`

// [{ margin: "16px" }]
<Box margin={16} />

// [{ margin: "2em" }]
<Box m="2em" />
```

In the example above the `margin` render function uses onno's `addPx` transform function to add "px" to unitless values. A unitless value is a `number` which is not zero.

Since the second `Box` passes a value with "em" units, the `addPx` transform function has no effect.

In addition to `addPx`, onno also provides an `addPc` transform function for converting decimal values between -1 and 1 to percentages eg. "0.1" becomes "10%" and "-0.5" becomes "-50%". There is also a `addPcOrPx` transform function which will first convert decimals between -1 and 1 to percent and then resolved to "px".

To write your own transform function, create a function that takes one value and returns another value. For example:

```js
import { when, isUnitless } from "onno"

export const addEm = (x) => (typeof x === "number" && x !== 0 ? x + "em" : x)

// Alternatively use onno's "when" and "isUnitless" utils
export const addRem = when(isUnitless)((x) => x + "rem")
```

#### `defaults`

Default lookup array or object to resolve values from. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const lineHeight = style({
  propsKeys: ["lineHeight", "lh"],
  defaults: [0, 1, 1.5, 2]
})

const color = style({
  propsKeys: ["color", "tc"],
  defaults: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F"
  }
})

const Text = styled.div`
  ${lineHeight}
  ${color}
`

// [{ color: "#222", lineHeight: 1.5 }]
<Text color="text" lineHeight={2} />

// [{ color: "#666", lineHeight: 2 }]
<Text tc="gray.2" lh={3} />

// [{ color: "gray.3", lineHeight: 4 }]
<Text tc="gray.3" lh={4} />
```

In the example above, the `color` and `lineHeight` props resolve to values in their respective `defaults` object and array. If values cannot be resolved from the `defaults` then the raw value is rendered in the style object.

When combined with `themeKeys` the `default` values will be ignored if a matching `theme` key is found. For example:

```jsx
import styled from "styled-components"
import { style, addPx } from "onno"

const width = style({
  propsKeys: ["width", "w"],
  themeKeys: ["widths"],
  transform: addPx,
  defaults: [16, 32, 64]
})

const Box = styled.div`
  ${width}
`

const theme = {
  widths: [10, 20]
}

// [{ width: "16px" }]
<Box width={0} />

// [{ width: "20px" }]
<Box w={1} theme={theme} />

// [{ width: "2px" }]
<Box w={2} theme={theme} />
```

The first `Box` does not have a `theme` so the value is resolved from the `defaults` array. The second `Box` resolves the value from the theme `widths` array. The third `Box` also finds the `widths` array on the `theme` but the value of "2" is outside of the array bounds, so the raw value is rendered.

## `compose`

## `extend`

[styled-components]: https://styled-components.com
[emotion]: https://emotion.sh
