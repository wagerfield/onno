# ![onno](https://raw.githubusercontent.com/wagerfield/onno/master/assets/onno.png)

![Code Coverage](https://img.shields.io/codecov/c/github/wagerfield/onno.svg?color=4B6&style=flat-square)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/onno.svg?color=4B6&style=flat-square&label=size)
![Build Status](https://img.shields.io/circleci/build/github/wagerfield/onno.svg?color=4B6&style=flat-square)
![License](https://img.shields.io/github/license/wagerfield/onno.svg?color=4B6&style=flat-square)

Responsive style props for building themed design systems.

    yarn add onno

## Features

- Framework agnostic
- Zero dependencies
- First class support for theming
- Rigorously tested with 100% test coverage
- Written in TypeScript with comprehensive type definitions and interfaces
- Works with most CSS in JS libraries including [styled-components][styled-components] and [emotion][emotion]

## Principles

- Predictable
- Extensible
- Versatile

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

[MIT](https://github.com/wagerfield/onno/blob/master/license)

[github]: https://github.com/wagerfield
[styled-system]: https://styled-system.com
[styled-components]: https://styled-components.com
[emotion]: https://emotion.sh
