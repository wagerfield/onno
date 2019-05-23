# API <!-- omit in toc -->

At the core of onno is the `style` function. The `style` function takes an `options` object and returns a `render` function. The `render` function can then be called with some `props` to produce an array of style objects.

Functions that take `props` and return an array of style objects are supported by the majority of CSS in JS libraries including [styled-components][styled-components] and [emotion][emotion]. For example:

```js
import styled from "styled-components"

const styles = (props) => [{
  background: props.background
}, {
  color: props.color
}]

// Tagged template literal
const Box1 = styled.div`
  ${styles}
`

// Object styles
const Box2 = styled.div(styles)

// [{ background: "#F00" }, { color: "white" }]
<Box1 background="#F00" color="white">One</Box1>

// [{ background: "#00F" }, { color: "black" }]
<Box2 background="#00F" color="black">Two</Box2>
```

In the example above `Box1` uses the `styles` function in a tagged template literal and `Box2` passes it directly as an argument. Both [styled-components][styled-components] and [emotion][emotion] support each approach so you can decide which style to adopt.

## Table of Contents <!-- omit in toc -->

- [`style`](#style)
  - [`options`](#options)
  - [`propsKeys`](#propskeys)
  - [`styleKeys`](#stylekeys)
  - [`themeKeys`](#themekeys)
  - [`transform`](#transform)
  - [`defaults`](#defaults)
- [`variant`](#variant)
- [`compose`](#compose)
- [`extend`](#extend)

## `style`

The `style` function can be used in a variety of ways to produce powerful `render` functions.

It expects an `options` object as the first and _only_ argument with the following key values:

### `options`

| Key                       | Type            | Required | Description                           |
| :------------------------ | :-------------- | :------- | :------------------------------------ |
| [`propsKeys`](#propskeys) | `String[]`      | `true`   | Props keys to map values from.        |
| [`styleKeys`](#styleKeys) | `String[]`      | `false`  | Style keys assign values to.          |
| [`themeKeys`](#themeKeys) | `String[]`      | `false`  | Theme keys to lookup values from.     |
| [`transform`](#transform) | `Function`      | `false`  | Function to transform values through. |
| [`defaults`](#defaults)   | `Array\|Object` | `false`  | Default lookup values.                |

### `propsKeys`

An array of `props` keys to map values from. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const width = style({
  propsKeys: ["width", "w"]
})

const Box = styled.div(width)

// [{ width: "100px" }]
<Box width="100px" />

// [{ width: "50%" }]
<Box w="50%" />

// [{ width: "200px" }]
<Box w="25%" width="200px" />
```

In the example above, the `width` render function is passed to the `styled` div. Any `props` on the `Box` component that match the provided `propsKeys` will be mapped to the rendered style objects.

Since "width" _and_ "w" are passed as `propsKeys` both can be used as `props` to render the provided value to the style objects. This interface allows you to create multiple aliases for the same key value mapping.

The order of keys in `propsKeys` defines the order of precedence. In the last example where both "w" and "width" are set on `Box` the "width" prop value takes precedence over "w" since it appears first in the `propsKeys` array.

### `styleKeys`

An array of `style` keys to assign values to. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const size = style({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"]
})

const Box = styled.div(size)

// [{ width: "100px", height: "100px" }]
<Box size="100px" />

// [{ width: "50%", height: "50%" }]
<Box s="50%" />

// [{ width: "200px", height: "200px" }]
<Box s="25%" size="200px" />
```

When `styleKeys` is left undefined, the first value in the `propsKeys` array is used by default. In the `propsKeys` [example above](#propskeys) `styleKeys` therefore defaults to `["width"]`.

In cases where you want to map a `prop` key like `display` or `fontSize` to the same CSS property, you can omit `styleKeys` to achieve this default behaviour.

However, in cases like the `size` render function above where you want to map some `propsKeys` like `["size", "s"]` to different `styleKeys` like `["width", "height"]`, this interface allows you to do so.

Finally, in special cases where you do not want resolved values to be mapped to `styleKeys` you can pass `null`. This functionality is used to create [variant functions](#variant).

### `themeKeys`

An array of `theme` keys to lookup values from. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const maxWidth = style({
  propsKeys: ["maxWidth", "maxw"],
  themeKeys: ["maxWidths", "sizes"]
})

const Box = styled.div(maxWidth)

const theme = {
  maxWidths: ["128px", "256px"],
  sizes: [0, "16px", "32px"]
}

// [{ maxWidth: "256px" }]
<Box theme={theme} maxWidth={1} />

// [{ maxWidth: "32px" }]
<Box theme={theme} maxw={2} />

// [{ maxWidth: 3 }]
<Box theme={theme} maxw={3} />
```

In the example above the `maxWidth` render function has two `themeKeys`. Typically you will only have one theme key, but this demonstrates that multiple theme keys can be used to lookup and resolve a value. Much like `propsKeys` the order of the theme keys defines the order of precedence in which they are resolved.

Since both `maxWidths` and `sizes` are specified as arrays of values within the `theme` their values are resolved by passing integers to index the arrays.

The first `Box` passes an index of `1` which resolves to "256px" from the `maxWidths` theme array. The second `Box` passes an index of `2` which falls outside of the `maxWidths` array, so the resolver moves onto the next theme key (`sizes`) where it is able to resolve the value of "32px" at this location. The third `Box` passes an index of `3` which falls outside the `sizes` theme array and therefore the raw value of `3` is rendered.

Both `props` and `themeKeys` support dot syntax string values to allow you to nest parts of your `theme` or `defaults`. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const fontSize = style({
  propsKeys: ["fontSize", "fs"],
  themeKeys: ["typography.fontSizes"]
})

const color = style({
  propsKeys: ["color", "tc"],
  themeKeys: ["colors"]
})

const Text = styled.div(fontSize, color)

const theme = {
  typography: {
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

// [{ fontSize: "24px" }, { color: "black" }]
<Text theme={theme} fontSize={1} color="light.text" />

// [{ fontSize: "32px" }, { color: "white" }]
<Text theme={theme} fs={2} tc="dark.text" />
```

In the example above, the `fontSizes` theme lookup is nested inside a `typography` object. Specifying `themeKeys` to `["typography.fontSizes"]` results in `props` values being resolved at this location.

The `colors` theme object also has lookups nested within it. However, since `themeKeys` is specified as `["colors"]` the values must be resolved via dot syntax in the `props` values instead.

### `transform`

Function to transform resolved values through. For example:

```jsx
import styled from "styled-components"
import { addPx, style } from "onno"

const margin = style({
  propsKeys: ["margin", "m"],
  transform: addPx
})

const Box = styled.div(margin)

// [{ margin: "16px" }]
<Box margin={16} />

// [{ margin: "2em" }]
<Box m="2em" />
```

In the example above, the `margin` render function uses onno's `addPx` transform function to add "px" to _unitless values_. A unitless value is a `number` which is not zero.

Since the second `Box` passes a value with "em" units, the `addPx` transform function ignores this value.

In addition to `addPx`, onno also provides an `addPc` transform function for converting decimal values between -1 and 1 to percentages eg. "0.1" becomes "10%" and "-0.5" becomes "-50%". There is also a `addPcOrPx` transform function which will first attempt to convert decimal values between -1 and 1 to percent and then convert unitless values to "px".

You can also write your own `transform` functions. Transform functions simply take a value and return a value. For example:

```js
const addEm = (x) => (typeof x === "number" && x !== 0 ? x + "em" : x)
```

Alternatively you can use onno's `when` and `isUnitless` [util functions](utils.md) to the same effect:

```js
import { when, isUnitless } from "onno"

const addEm = when(isUnitless)((x) => x + "em")
```

### `defaults`

Default lookup array or object to resolve values from. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const color = style({
  propsKeys: ["color", "tc"],
  defaults: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F"
  }
})

const lineHeight = style({
  propsKeys: ["lineHeight", "lh"],
  defaults: [0, 1, 1.5, 2]
})

const Text = styled.div(color, lineHeight)

// [{ color: "#222" }, { lineHeight: 1.5 }]
<Text color="text" lineHeight={2} />

// [{ color: "#666" }, { lineHeight: 2 }]
<Text tc="gray.2" lh={3} />

// [{ color: "gray.3" }, { lineHeight: 4 }]
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

const Box = styled.div(width)

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

The first `Box` does not have a `theme` so the value is resolved from the `defaults` array. The second `Box` resolves the value from the theme `widths` array. The third `Box` also finds the `widths` array on the `theme` but the value of "2" falls outside of the array bounds, so the raw value is rendered.

## `variant`

The `variant` function maps a prop value to a _style object_ in a `theme` or `defaults` lookup. It shares the same function signature as the `style` function by taking an `options` object and returning a `render` function.

The key difference between the `variant` and `style` functions is that `styleKeys` cannot be passed as an option to the `variant` function. Internally the `variant` function calls the `style` function with the provided `options` while overriding `styleKeys` to `null`.

This functionality is useful for providing a place in your `theme` for grouping styles. Common use cases for this would be components and styles that are used in combination with one another like background and foreground colors. For example:

```jsx
import styled from "styled-components"
import { style } from "onno"

const buttonStyle = style({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  styleKeys: null
})

const Button = styled.button(buttonStyle)

const theme = {
  buttonStyles: {
    primary: {
      background: "blue"
      color: "white"
    },
    secondary: {
      background: "gray"
      color: "black"
    }
  }
}

// [{ background: "blue", color: "white" }]
<Button buttonStyle="primary" theme={theme} />

// [{ background: "gray", color: "black" }]
<Button bst="secondary" theme={theme} />
```

Onno ships with some common [variant functions](render-functions.md#variant) to get you started.

## `compose`

The `compose` function takes an array of `render` functions and returns a _composed_ `render` function.

When the _composed_ `render` function is called with some `props` it iterates over the array of `render` functions that were passed to it and calls them each in turn with the provided `props`.

The arrays of style objects returned from each `render` function are then merged and returned.

This interface allows you to compose multiple render functions into a single render function for greater portability.

```jsx
import styled from "styled-components"
import { compose, style } from "onno"

const fontFamily = style({
  propsKeys: ["fontFamily", "ff"]
})

const fontWeight = style({
  propsKeys: ["fontWeight", "fw"]
})

const fontSize = style({
  propsKeys: ["fontSize", "fs"]
})

const fontSet = compose([
  fontFamily,
  fontWeight,
  fontSize
])

const Text = styled.div(fontSet)

// [{ fontFamily: "Roboto" }, { fontWeight: "bold" }, { fontSize: "16px" }]
<Text fontFamily="Roboto" fontWeight="bold" fontSize="16px" />

// [{ fontFamily: "Lobster" }, { fontWeight: "300" }, { fontSize: "24px" }]
<Text ff="Lobster" fw="300" fs="24px" />
```

The example above composes the `fontFamily`, `fontWeight` and `fontSize` render functions into a single `fontSet` render function. It is recommended that you follow the naming convention of appending `Set` to your _composed_ functions to help distinguish them from _standard_ render functions.

Render functions can be passed to `compose` as an array _or_ list of arguments:

```js
import { compose, display, padding } from "onno"

// Array of render functions
const set1 = compose([display, padding])

// List of render functions
const set2 = compose(
  display,
  padding
)
```

It is worth noting that _composed_ render functions can be recomposed into other render functions ad infinitum.

Onno ships with an extensive suite of _standard_ and _composed_ `render` functions which can be [found here](render-functions.md).

## `extend`

The `extend` function allows you to share [`options`](#options) between `render` functions. It takes some partially applied style `options` and returns a function which expects the remaining options.

Calling the returned function with the remaining `options` will return a `render` function derived from the first style options merged with the second.

```jsx
import styled from "styled-components"
import { addPx, extend } from "onno"

const space = extend({
  themeKeys: ["spaces"],
  transform: addPx,
  defaults: [0, 2, 4, 8, 16, 32, 64]
})

const margin = space({
  propsKeys: ["margin", "m"]
})

const padding = space({
  propsKeys: ["padding", "p"],
  transform: null
})

const Box = styled.div(margin, padding)

// [{ margin: "4px" }, { padding: 16 }]
<Box margin={2} padding={4} />

// [{ margin: "64px" }, { padding: 10 }]
<Box m={6} p={10} />
```

In the example above, the `extend` function is called with some partial style `options` and the returned function is assigned to the `space` variable. Both the `margin` and `padding` render functions are the result of calling the `space` function with additional style `options` they wish to set or override.

Both the `margin` and `padding` render functions share the same `themeKeys` and `defaults`. When indexes are passed to these props, the values are resolved from `defaults` array. Since the `margin` render function inherits the `addPx` transform function, the resolved values have "px" appended to them. However, since the `padding` render function overrides the `transform` function to `null` the resolved values are not transformed.

[styled-components]: https://styled-components.com
[emotion]: https://emotion.sh/docs/object-styles#arrays
