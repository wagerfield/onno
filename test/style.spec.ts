import { theme } from "../src/defaults"
import { style } from "../src/utils"

describe("style", () => {
  test("returns style function", () => {
    const foo = style({ prop: "foo" })
    expect(foo).toEqual(expect.any(Function))
    expect(foo.length).toBe(1)
  })

  test("returns style object", () => {
    const foo = style({ prop: "foo" })
    expect(foo({ foo: "bar" })).toEqual({ foo: "bar" })
  })

  test("uses alias when defined", () => {
    const foo = style({ prop: "foo", alias: "bar" })
    expect(foo({ foo: "foo" })).toEqual({ foo: "foo" })
    expect(foo({ foo: "foo", bar: "bar" })).toEqual({ foo: "bar" })
  })

  test("uses cssProperty when defined", () => {
    const foo = style({ prop: "foo", cssProperty: "bar" })
    expect(foo({ foo: "foo" })).toEqual({ bar: "foo" })
  })

  test("uses transform when defined", () => {
    const toUpper = (value: string) => value.toUpperCase()
    const foo = style({ prop: "foo", transform: toUpper })
    expect(foo({ foo: "foo" })).toEqual({ foo: "FOO" })
  })

  test("uses themeKey when defined", () => {
    const padding = style({ prop: "padding", themeKey: "space" })
    const styles = padding({ padding: 2, theme })
    expect(styles).toEqual({ padding: theme.space[2] })
  })
})
