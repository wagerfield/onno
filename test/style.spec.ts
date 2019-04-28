import { style } from "../src/style"
import { addPx } from "../src/utils"

describe("style", () => {
  const foo = style({
    propsKeys: ["a", "b", "c"],
    styleKeys: ["x", "y", "z"],
    themeKey: "foo",
    fallback: [0, 4, 8],
    transform: addPx
  })

  test("returns style function", () => {
    expect(foo).toEqual(expect.any(Function))
    expect(foo).toHaveLength(1)
  })

  test("returns style object", () => {
    expect(foo({ a: "foo" })).toMatchSnapshot()
  })

  test("uses transform function", () => {
    expect(foo({ a: "100%" })).toMatchSnapshot()
    expect(foo({ a: 100 })).toMatchSnapshot()
    expect(foo({ a: 0 })).toMatchSnapshot()
  })

  test("uses fallback lookup", () => {
    expect(foo({ a: 1 })).toMatchSnapshot()
  })

  test("uses prop aliases", () => {
    expect(foo({ a: 1, b: 2, c: 3, d: 4 })).toMatchSnapshot()
    expect(foo({ b: 2, c: 3, d: 4 })).toMatchSnapshot()
    expect(foo({ c: 3, d: 4 })).toMatchSnapshot()
    expect(foo({ d: 4 })).toMatchSnapshot()
  })
})
