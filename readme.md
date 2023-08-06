# [![onno](https://raw.github.com/wagerfield/onno/main/assets/onno.svg)][onno]

Tiny ([400B][bundlephobia-onno]) utility for composing class variants using `clsx`

## Features

- Framework agnostic
- Single *tiny* dependency on `clsx` ([330B][bundlephobia-clsx])
- Written in [TypeScript][typescript] with type safe [definitions](#typescript)
- Rigorously tested with 100% code coverage
- Perfect companion to [Tailwind CSS][tailwindcss]

## Usage

```js
const button = onno({
  variants: {
    intent: {
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-200 text-black",
    },
    size: {
      sm: "h-8 px-1",
      md: "h-10 px-2",
      lg: "h-12 px-3",
    },
  },
})

// "bg-blue-600 text-white h-10 px-2"
const classes = button({
  intent: "primary",
  size: "md",
})
```

### Variants

Todo.

### Defaults

Todo.

### Baseline Classes

Todo.

### Compound Classes

Todo.

### Additional Classes

Todo.

## TypeScript

`onno` is written in TypeScript and provides a fully typed interface.

To extract an interface to be used as component props:

```ts
import { onno, type OnnoProps } from "onno"

export type ButtonProps = OnnoProps<typeof button>

export const button = onno({
  variants: {
    intent: { ... },
    size: { ... },
  },
})
```

Note that `ButtonProps` includes `className` alongside the variant options:

```ts
type ButtonClassNameType = ButtonProps["className"] // `ClassValue` from `clsx`
```

By default *all* variants are *optional*.

To require one or more variants, pass a union of variant keys as the second argument to the `OnnoProps` type:

```ts
import { onno, type OnnoProps } from "onno"

export type ButtonProps = OnnoProps<typeof button, "intent" | "size">

export const button = onno({
  variants: {
    disabled: "...",
    intent: { ... },
    size: { ... },
  },
})
```

## License

[MIT][license] © [Matthew Wagerfield][wagerfield]

[onno]: https://onnojs.com
[wagerfield]: https://github.com/wagerfield
[license]: https://github.com/wagerfield/onno/blob/main/license
[bundlephobia-clsx]: https://bundlephobia.com/package/clsx@2.0.0
[bundlephobia-onno]: https://bundlephobia.com/package/onno@2.0.0
[typescript]: https://www.typescriptlang.org
[tailwindcss]: https://tailwindcss.com
