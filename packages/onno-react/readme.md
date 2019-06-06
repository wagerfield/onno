# [![onno-react](https://raw.githubusercontent.com/wagerfield/onno/master/assets/onno-react.svg)][onno]

[![Code Coverage](https://img.shields.io/codecov/c/github/wagerfield/onno.svg?color=4C8&style=flat-square)][codecov]
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/onno-react.svg?color=4C8&style=flat-square&label=size)][bundlephobia]
[![Build Status](https://img.shields.io/circleci/build/github/wagerfield/onno.svg?color=4C8&style=flat-square)][circleci]
[![License](https://img.shields.io/github/license/wagerfield/onno.svg?color=4C8&style=flat-square)][license]

Onno `propTypes` for [React][react-prop-types]

    yarn add onno-react

## Usage

You can use `onno-react` in place of `onno` since it re-exports the API:

```jsx
import styled from "styled-components"
import { display, padding } from "onno-react"

const Box = styled.div(display, padding)

// [{ display: "flex" }, { padding: "10px" }]
<Box display="flex" padding="10px" />

// [{ display: "grid" }, { padding: "20em" }]
<Box d="grid" p="20em" />
```

To add `propTypes` for onno's render functions to your components:

```jsx
import styled from "styled-components"
import { display, padding, propTypes } from "onno-react"

const Box = styled.div(display, padding)

Box.propTypes = propTypes(display, padding)

// Warning: Failed prop type: Invalid prop "display" supplied to "Box".
// Warning: Failed prop type: Invalid prop "padding" supplied to "Box".
<Box display={true} padding={[false]} />

// Warning: Failed prop type: Invalid prop "d" supplied to "Box".
// Warning: Failed prop type: Invalid prop "p" supplied to "Box".
<Box d={true} p={[false]} />
```

Render functions can be passed to `propTypes` as an array _or_ list of arguments:

```js
import { display, padding, propTypes } from "onno-react"

// Array of render functions
const propTypes2 = propTypes([display, padding])

// List of render functions
const propTypes1 = propTypes(display, padding)
```

Following DRY principles, wrap your render functions in an array _or_ use onno's `compose` method:

```jsx
import styled from "styled-components"
import { display, padding, compose, propTypes } from "onno-react"

const styles = [display, padding]
const boxSet = compose({
  name: "box",
  renderers: styles
})

// Spread the styles array
const Box1 = styled.div(...styles)
Box1.propTypes = propTypes(styles)

// Pass the composed renderer
const Box2 = styled.div(boxSet)
Box2.propTypes = propTypes(boxSet)
```

To add other `propTypes` alongside the render function props:

```jsx
import styled from "styled-components"
import { display, padding, propTypes } from "onno-react"
import { number, string } from "prop-types"

const styles = [display, padding]

const Box = styled.div(...styles)

Box.propTypes = {
  ...propTypes(styles),
  foo: string.isRequired,
  bar: number.isRequired
}
```

## Sanitizing Props

To sanitize `props` before applying them to a component, you can use onno's [`omit`][onno-omit] function:

```js
import { omit, display, padding } from "onno-react"

const omitPropsKeys = omit({
  propsKeys: ["foo", "bar"]
})

const omitRenderers = omit({
  renderers: [display, padding]
})

const omitComposite = omit({
  propsKeys: ["foo", "bar"],
  renderers: [display, padding]
})

const props = {
  foo: "foo",
  bar: "bar",
  baz: "baz",
  display: "block",
  d: "inline-block",
  padding: 4,
  p: 8
}

// {
//   baz: "baz",
//   display: "block",
//   d: "inline-block",
//   padding: 4,
//   p: 8
// }
omitPropsKeys(props)

// {
//   foo: "foo",
//   bar: "bar",
//   baz: "baz"
// }
omitRenderers(props)

// {
//   baz: "baz"
// }
omitComposite(props)
```

## Author

[Matthew Wagerfield][github]

## License

[MIT][license]

[onno]: https://onnojs.com
[onno-omit]: https://github.com/wagerfield/onno/blob/master/docs/utils.md#omit
[github]: https://github.com/wagerfield
[license]: https://github.com/wagerfield/onno/blob/master/license
[bundlephobia]: https://bundlephobia.com/result?p=onno-react
[circleci]: https://circleci.com/gh/wagerfield/onno
[codecov]: https://codecov.io/gh/wagerfield/onno
[react-prop-types]: https://reactjs.org/docs/typechecking-with-proptypes
