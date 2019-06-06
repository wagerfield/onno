# [![onno](https://raw.githubusercontent.com/wagerfield/onno/master/assets/onno.svg)][onno]

[![Code Coverage](https://img.shields.io/codecov/c/github/wagerfield/onno.svg?color=4C8&style=flat-square)][codecov]
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/onno.svg?color=4C8&style=flat-square&label=size)][bundlephobia]
[![Build Status](https://img.shields.io/circleci/build/github/wagerfield/onno.svg?color=4C8&style=flat-square)][circleci]
[![License](https://img.shields.io/github/license/wagerfield/onno.svg?color=4C8&style=flat-square)][license]

Responsive style props for building themed design systems.

    yarn add onno

## Features

- Framework agnostic
- Zero dependencies
- First class support for themes and design tokens
- Works with any CSS in JS library that supports object styles like [Styled Components][styled-components] and [Emotion][emotion]
- Written in [TypeScript][typescript] with comprehensive type definitions and interfaces
- Rigorously tested with [100% code coverage][codecov]

## Usage

```jsx
import styled from "styled-components"
import { colorSet, spaceSet } from "onno"

const Box = styled.div(colorSet, spaceSet)

// [{ padding: "16px" }]
<Box p={4} />

// [{ margin: "-32px" }]
<Box m={-5} />

// [{ marginLeft: "8px", marginRight: "8px" }, { paddingBottom: "4px" }]
<Box mx={3} pb={2} />

// [{ backgroundColor: "coral" }, { color: "ivory" }]
<Box backgroundColor="coral" color="ivory" />

// [{ background: "url(onno.png) center" }]
<Box bg="url(onno.png) center" />
```

## Documentation

- [Features](https://github.com/wagerfield/onno/blob/master/docs/features.md)
- [Render Functions](https://github.com/wagerfield/onno/blob/master/docs/render-functions.md)
- [API](https://github.com/wagerfield/onno/blob/master/docs/api.md)
- [Utils](https://github.com/wagerfield/onno/blob/master/docs/utils.md)

## Credits

Onno is an iteration of [Styled System][styled-system] written in [TypeScript][typescript] from the ground up. The core ideas are indebted to the brilliant work of [Brent Jackson][jxnblk] and the [numerous contributors][styled-system-contributors] to this library. [Facepaint][emotion-facepaint] also deserves credit for the original idea behind responsive style values.

Onno started life as a rewrite of Styled System in TypeScript following a [discussion on GitHub][styled-system-comment]. However, during the course of this rewrite, a number of new ideas, features and refinements to Styled System's API were introduced that eventually warranted another library.

The additional features introduced by onno are [presented in detail here](https://github.com/wagerfield/onno/blob/master/docs/features.md#features).

## Author

[Matthew Wagerfield][github]

## License

[MIT][license]

[onno]: https://onnojs.com
[github]: https://github.com/wagerfield
[license]: https://github.com/wagerfield/onno/blob/master/license
[bundlephobia]: https://bundlephobia.com/result?p=onno
[circleci]: https://circleci.com/gh/wagerfield/onno
[codecov]: https://codecov.io/gh/wagerfield/onno
[emotion]: https://emotion.sh
[emotion-facepaint]: https://github.com/emotion-js/facepaint
[styled-components]: https://styled-components.com
[styled-system]: https://styled-system.com
[styled-system-contributors]: https://github.com/styled-system/styled-system/graphs/contributors
[styled-system-comment]: https://github.com/styled-system/styled-system/issues/463#issuecomment-487167817
[typescript]: https://www.typescriptlang.org
[jxnblk]: https://jxnblk.com
