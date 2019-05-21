# ![onno](https://github.com/wagerfield/onno/blob/master/assets/onno.png)

Responsive, themed style props for building design systems.

    yarn add onno

## Features

- Framework agnostic
- Zero dependencies
- First class support for theming
- Facilitates rapid UI development
- Rigorously tested with 100% test coverage
- Written in TypeScript with exceptional type definitions
- Works with most major CSS in JS libraries including [styled-components][styled-components] and [emotion][emotion]

## Principles

- Flexible
- Extensible
- Predictable
- Versatile
- Lightweight

## Usage

```jsx
import styled from "styled-components"
import { colorSet, spaceSet } from "onno"

const Box = styled.div`
  ${colorSet}
  ${spaceSet}
`

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
