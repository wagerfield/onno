# API<!-- omit in toc -->

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

## Table of Contents<!-- omit in toc -->

- [`style`](#style)
  - [`options`](#options)
  - [`propsKeys`](#propskeys)
  - [`styleKeys`](#stylekeys)
  - [`themeKeys`](#themekeys)
  - [`transform`](#transform)
  - [`renderers`](#renderers)
  - [`defaults`](#defaults)
- [`variant`](#variant)
- [`compose`](#compose)
- [`interpolate`](#interpolate)
- [`extend`](#extend)

## `style`

The `style` function can be used in a variety of ways to produce powerful `render` functions.

It expects an `options` object as the first and _only_ argument with the following key values:

### `options`

| Key                       | Type                | Required | Description                                   |
| :------------------------ | :------------------ | :------- | :-------------------------------------------- |
| [`propsKeys`](#propskeys) | `String[]`          | `true`   | Props keys to map values from.                |
| [`styleKeys`](#styleKeys) | `String[]`          | `false`  | Style keys assign values to.                  |
| [`themeKeys`](#themeKeys) | `String[]`          | `false`  | Theme keys to lookup values from.             |
| [`transform`](#transform) | `TransformFunction` | `false`  | Function to transform values through.         |
| [`renderers`](#renderers) | `RenderFunction[]`  | `false`  | Render functions to transform styles through. |
| [`defaults`](#defaults)   | `Array\|Object`     | `false`  | Default lookup values.                        |

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

Both `props` and `themeKeys` support dot syntax string values to allow you to nest parts of your `theme` or `defaults`.

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

In addition to `addPx`, onno also provides [`addPc`](utils.md#addPc), [`addRem`](utils.md#addRem) and [`addPcOrPx`](utils.md#addPcOrPx) transform functions.

You can also write your own `transform` functions. Transform functions simply take a value and return a value:

```js
const addEm = (x) => (typeof x === "number" && x !== 0 ? x + "em" : x)
```

Alternatively you can use onno's [`when`](utils.md#when) and [`isUnitless`](utils.md#isUnitless) util functions to the same effect:

```js
import { when, isUnitless } from "onno"

const addEm = when(isUnitless)((x) => x + "em")
```

### `renderers`

An array of `render` functions to transform styles through. For example:

```jsx
import styled from "styled-components"
import { style, margin, padding } from "onno"

const space = style({
  propsKeys: ["space", "sp"],
  styleKeys: ["margin", "padding", "foo"],
  renderers: [margin, padding]
})

const Box = styled.div(space)

// [{ margin: "16px", padding: "16px", foo: 4 }]
<Box space={4} />

// [{ margin: "2em", padding: "2em", foo: "2em" }]
<Box sp="2em" />
```

In the example above, the `space` render function maps "space" and "sp" props to "margin", "padding" and "foo" style keys. In the absence of a [`transform`](#transform) function being passed as an option to the `space` render function, any values provided to "space" or "sp" props would be mapped directly like so:

```jsx
const space = style({
  propsKeys: ["space", "sp"],
  styleKeys: ["margin", "padding", "foo"]
})

// [{ margin: 4, padding: 4, foo: 4 }]
space({ space: 4 })

// [{ margin: "2em", padding: "2em", foo: "2em" }]
space({ sp: "2em" })
```

However, since onno's `margin` and `padding` functions have been passed as `renderers` to the `space` function, the style object that would normally be returned will be run through these `renderers` as if they were `props` and transformed accordingly.

This is a _powerful feature_ since it allows you to create [`variant`](#variant) functions that can lookup and transform values referenced elsewhere in a theme. Furthermore, you can use custom properties (like `size` which maps to `width` and `height`) and aliases (like `fs` for `fontSize`) within your theme variants. For example:

```jsx
import styled from "styled-components"
import { variant, colorSet, sizeSet, textSet } from "onno"

const buttonStyle = variant({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  renderers: [colorSet, sizeSet, textSet]
})

const theme = {
  colors: {
    gray: ["#444", "#888", "#CCC"],
    white: "#FAFAFA",
    black: "#202020",
    brand: {
      primary: "coral",
      secondary: "olive"
    }
  },
  fontSizes: {
    sm: 16,
    md: 20,
    lg: 32
  },
  sizes: {
    sm: 24,
    md: 32,
    lg: 48
  },
  buttonStyles: {
    normal: {
      width: 0.5,
      height: "md",
      fontSize: "sm",
      background: "gray.2",
      color: "black"
    },
    primary: {
      w: 1, // "width" prop alias
      h: "lg", // "height" prop alias
      fs: "md", // "fontSize" prop alias
      bg: "brand.primary", // "background" prop alias
      tc: "white" // "color" prop alias
    }
  }
}

const Box = styled.div(buttonStyle)

// [
//   { width: "50%" },
//   { height: "32px" },
//   { fontSize: "16px" },
//   { background: "#CCC" },
//   { color: "#202020" }
// ]
<Box theme={theme} buttonStyle="normal" />

// [
//   { width: "100%" },
//   { height: "48px" },
//   { fontSize: "20px" },
//   { background: "coral" },
//   { color: "#FAFAFA" }
// ]
<Box theme={theme} bst="primary" />
```

The order of `renderers` matters. Render functions will be applied from left to right. If you have two render functions that transform the same property like `color` then the second render function will overwrite the value set by the first.

This is especially important to understand when creating [`variant`](#variant) functions composed of other `variant` functions. You will typically want to list `variant` functions first followed by _standard_ or _composed_ `render` functions. Thinking in terms of specificity often helps with this. Ordering render functions in this way will allow you to override any properties set by the variant functions in a predictable way.

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
<Box theme={theme} w={1} />

// [{ width: "2px" }]
<Box theme={theme} w={2} />
```

The first `Box` does not have a `theme` so the value is resolved from the `defaults` array. The second `Box` resolves the value from the theme `widths` array. The third `Box` also finds the `widths` array on the `theme` but the value of "2" falls outside of the array bounds, so the raw value is transformed to pixels and rendered.

## `variant`

The `variant` function maps a prop value to a _style object_ in a `theme` or `defaults` lookup. It shares the same function signature as the [`style`](#style) function by taking an [`options`](#options) object and returning a `render` function.

The key difference between the `variant` and `style` functions is that `styleKeys` cannot be passed as an option to the `variant` function. Internally the `variant` function calls the `style` function with the provided `options` while overriding `styleKeys` to `null`.

This functionality is useful for providing a place in your `theme` for grouping styles. Common use cases for this would be styles that are commonly used in combination with one another like background and foreground colors, typographic compositions or button variant styles. For example:

```jsx
import styled from "styled-components"
import { variant } from "onno"

const buttonStyle = variant({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"]
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
<Button theme={theme} buttonStyle="primary" />

// [{ background: "gray", color: "black" }]
<Button theme={theme} bst="secondary" />
```

One of the major features of the `style` and `variant` functions is that you can pass an array of `renderers` in the options object. Each key value in the resolved style object will be run through the array of `render` functions to lookup and transform the values accordingly.

This powerful feature was introduced to further support DRY principles and theme serialization. In practice it allows you to declare your colors, sizes, fonts etc. in your theme and then reference them by alias or index within the variant style objects. For example:

```jsx
import styled from "styled-components"
import { variant, color, fontSize } from "onno"

const textStyle = variant({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"],
  renderers: [color, fontSize],
})

const Text = styled.button(textStyle)

const theme = {
  colors: {
    black: "#222",
    brand: "coral",
    success: "lime",
    error: "red",
    info: "blue"
  },
  fontSizes: [
    { alias: "sm", value: 12 },
    { alias: "md", value: 16 },
    { alias: "lg", value: 24 }
  ],
  textStyles: {
    main: {
      color: "black",
      fontSize: 1
    },
    brand: {
      color: "brand",
      fontSize: "lg",
      fontWeight: "bold"
    },
    error: {
      color: "error",
      fontSize: "md"
    },
    info: {
      color: "info",
      fontSize: 0
    }
  }
}

// [{ color: "#222", fontSize: "16px" }]
<Text theme={theme} textStyle="main" />

// [{ color: "coral", fontSize: "24px", fontWeight: "bold" }]
<Text theme={theme} textStyle="brand" />

// [{ color: "red", fontSize: "16px" }]
<Text theme={theme} tst="error" />

// [{ color: "blue", fontSize: "12px" }]
<Text theme={theme} tst="info" />
```

Since variant functions are `render` functions themselves, they can be passed to the `renderers` array of other variant (or style) functions. This powerful feature allows you to compose sophisticated render functions like the `buttonStyle` and `globalStyle` [variant functions](render-functions.md#variant) included with onno.

It is worth noting that rendered style objects are iterated over recursively to allow you to nest style objects within selectors like `:hover` or `> span`. Nested style objects will be transformed through the same `renderers` as the root style object. Read the [`globalStyle`](render-functions.md#globalstyle) docs to understand the potential of this powerful feature in more detail.

## `compose`

The `compose` function takes an `options` object and returns a _composed_ `render` function.

The `options` object must contain an array of `renderers` to compose and a `name` for the returned `render` function:

| Key                       | Type               | Required | Description                                   |
| :------------------------ | :----------------- | :------- | :-------------------------------------------- |
| `name`                    | `String`           | `true`   | Name of the composed render function.         |
| [`renderers`](#renderers) | `RenderFunction[]` | `true`   | Render functions to transform styles through. |

When the _composed_ `render` function is called with some `props` it iterates over the array of `renderers` and calls them each in turn with the provided `props`.

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

const fontSet = compose({
  name: "font",
  renderers: [
    fontFamily,
    fontWeight,
    fontSize
  ]
})

const Text = styled.div(fontSet)

// [{ fontFamily: "Roboto" }, { fontWeight: "bold" }, { fontSize: "16px" }]
<Text fontFamily="Roboto" fontWeight="bold" fontSize="16px" />

// [{ fontFamily: "Lobster" }, { fontWeight: 300 }, { fontSize: "24px" }]
<Text ff="Lobster" fw={300} fs="24px" />
```

The example above composes the `fontFamily`, `fontWeight` and `fontSize` render functions into a single `fontSet` render function. It is recommended that you follow the naming convention of appending `Set` to the variable names of your _composed_ functions to help distinguish them from _standard_ render functions.

The `name` option will automatically have "Set" appended to it when omitted. In the example above, the `name` option of "font" will get converted to "fontSet" so that `fontSet.name === "fontSet"`

It is worth noting that _composed_ render functions can be composed into other render functions ad infinitum.

Onno ships with an extensive suite of _standard_ and _composed_ `render` functions which can be [found here](render-functions.md).

## `interpolate`

The `interpolate` function takes an `options` object and returns a style `transform` function.

The `options` object must contain an array of `renderers` and a `name` for the returned `transform` function:

| Key                       | Type               | Required | Description                                   |
| :------------------------ | :----------------- | :------- | :-------------------------------------------- |
| `name`                    | `String`           | `true`   | Name of the transform function.               |
| [`renderers`](#renderers) | `RenderFunction[]` | `true`   | Render functions to transform styles through. |

When the `transform` function is called with a `style` object, it iterates over the array of `renderers` and calls them each in turn with the provided `style` object.

The arrays of style objects returned from each `render` function are then merged and returned.

When calling the `transform` function, you can also pass and an _optional_ `theme` object as the second argument to lookup and resolve values from:

```js
import { interpolate, colorSet, spaceSet } from "onno"

const transform = interpolate({
  name: "colorAndSpace",
  renderers: [colorSet, spaceSet]
})

// [{ color: "#00F", padding: "16px" }]
transform({ color: "link", padding: 4 })

// [{ background: "plum", marginLeft: "-4px", marginRight: "-4px" }]
transform({ bg: "plum", mx: -2 })

const theme = {
  colors: {
    brand: "coral",
    white: "ivory",
    black: "#202428"
  }
}

// [{ backgroundColor: "coral", color: "#202428" }]
transform({ backgroundColor: "brand", color: "black" }, theme)
```

Style objects can contain nested style objects which can contain nested style objects ad infinitum. Nested style objects will be iterated over recursively and transformed through the `renderers` passed to the `interpolate` function. This allows you to use CSS selectors as keys in your style objects:

```js
import { interpolate, spaceSet } from "onno"

const spaceTransform = interpolate({
  name: "space",
  renderers: [spaceSet]
})

// {
//   "padding": "16px",
//   "> span": {
//     "marginLeft": "-4px",
//     "marginRight": "-4px",
//     ":hover": {
//       "paddingTop": "32px",
//       "paddingBottom": "32px"
//     }
//   }
// }
spaceTransform({
  "padding": 4,
  "> span": {
    "marginX": -2,
    ":hover": {
      paddingY: 5
    }
  }
})
```

It is recommended that you follow the naming convention of appending `Transform` to the variable names of your _transform_ functions to help distinguish them from _standard_ and _composed_ `render` functions.

The `name` option will automatically have "Transform" appended to it when omitted:

```js
import { interpolate, colorSet, spaceSet } from "onno"

const colorTransform = interpolate({
  name: "color",
  renderers: [colorSet]
})

const spaceTransform = interpolate({
  name: "spaceTransform",
  renderers: [spaceSet]
})

console.log(colorTransform.name) // colorTransform
console.log(spaceTransform.name) // spaceTransform
```

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
