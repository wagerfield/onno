# ![onno](assets/onno.png)

[![Code Coverage](https://img.shields.io/codecov/c/github/wagerfield/onno.svg?color=4C8&style=flat-square)][codecov]
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/onno.svg?color=4C8&style=flat-square&label=size)][bundlephobia]
[![Build Status](https://img.shields.io/circleci/build/github/wagerfield/onno.svg?color=4C8&style=flat-square)][circleci]
[![License](https://img.shields.io/github/license/wagerfield/onno.svg?color=4C8&style=flat-square)][license]

Responsive style props for building themed design systems.

    yarn add onno

## Features

- Framework agnostic
- Zero dependencies
- First class support for theming
- Rigorously tested with [100% test coverage][codecov]
- Written in TypeScript with comprehensive type definitions and interfaces
- Works with most CSS in JS libraries including [styled-components][styled-components] and [emotion][emotion]

## Usage

```jsx
import styled from "styled-components"
import { colorSet, spaceSet } from "onno"

const Box = styled.div(colorSet, spaceSet)

// { padding: "16px" }
<Box p={4} />

// { margin: "-32px" }
<Box m={-5} />

// { marginLeft: "8px", marginRight: "8px", paddingBottom: "4px" }
<Box mx={3} pb={2} />

// { backgroundColor: "red", color: "white" }
<Box bgc="red" tc="white" />

// { background: "url(onno.png) center" }
<Box bg="url(onno.png) center" />
```

## Author

[Matthew Wagerfield][github]

## License

[MIT][license]

[github]: https://github.com/wagerfield
[license]: https://github.com/wagerfield/onno/blob/master/license
[bundlephobia]: https://bundlephobia.com/result?p=onno
[circleci]: https://circleci.com/gh/wagerfield/onno
[codecov]: https://codecov.io/gh/wagerfield/onno
[styled-components]: https://styled-components.com
[styled-system]: https://styled-system.com
[emotion]: https://emotion.sh
