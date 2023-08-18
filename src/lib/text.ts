import { CHARS } from "./chars"

type Tag = "path" | "polygon"

export interface Attrs {
  transform: string
  points?: string
  d?: string
}

export interface Char {
  attrs: Attrs
  char: string
  tag: Tag
  x: number
  w: number
  h: number
}

const NUM = /\d+/g
const MAP: Record<Tag, string> = {
  polygon: "points",
  path: "d",
}

export const mapChar = (char: string, size: number, x: number): Char | null => {
  const path = (CHARS as Record<string, string>)[char]

  if (!path) return null

  const tag = isNaN(+path[0]) ? "path" : "polygon"

  const scale = (v: string) => Math[+v < 4 ? "ceil" : "floor"](+v * size)

  return path.split(" ").reduce<Char>(
    (props, value, index, array) => {
      const match = value.match(NUM)
      if (tag === "path" && match) {
        props.w = Math.max(props.w, scale(match[0]))
        props.h = Math.max(props.h, scale(match[1]))
      } else if (tag === "polygon" && index % 2) {
        props.w = Math.max(props.w, scale(array[index - 1]))
        props.h = Math.max(props.h, scale(value))
      }
      return props
    },
    {
      x,
      w: 0,
      h: 0,
      tag,
      char,
      attrs: {
        transform: `translate(${x})`,
        [MAP[tag]]: path.replace(NUM, scale as any),
      },
    },
  )
}

export function mapText(text: string, size: number, x = 0): Char[] {
  return text.split("").reduce<Char[]>((chars, char) => {
    const data = mapChar(char, size, x)
    if (data) {
      chars.push(data)
      x += data.w + Math.ceil(size)
    }
    return chars
  }, [])
}
