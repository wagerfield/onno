import { StyleOptions } from "../lib/types"
import * as S from "../src/style"
import * as U from "../src/utils"

describe("createStyle", () => {
  test("returns null for undefined value", () => {
    expect(S.createStyle()).toBeNull()
  })

  test("returns null for undefined keys", () => {
    expect(S.createStyle("foo")).toBeNull()
  })

  test("returns style object", () => {
    expect(S.createStyle("foo", ["x", "y", "z"])).toMatchSnapshot()
  })
})

describe("style", () => {
  const style = (options?: Partial<StyleOptions>) =>
    S.style({
      propsKeys: ["a", "b", "c"],
      styleKeys: ["x", "y", "z"],
      themeKeys: ["t", "u", "v"],
      ...options
    })

  test("returns style function", () => {
    const s = style()
    expect(s).toEqual(expect.any(Function))
    expect(s).toHaveLength(1)
  })

  test("returns null for unresolved keys", () => {
    const s = style()
    expect(s({ z: "foo" })).toBeNull()
  })

  test("returns style object array", () => {
    const s = style()
    expect(s({ a: "foo" })).toMatchSnapshot()
  })

  test("uses prop aliases", () => {
    const s = style()
    expect(s({ a: 1, b: 2, c: 3, d: 4 })).toMatchSnapshot()
    expect(s({ b: 2, c: 3, d: 4 })).toMatchSnapshot()
    expect(s({ c: 3, d: 4 })).toMatchSnapshot()
    expect(s({ d: 4 })).toMatchSnapshot()
  })

  test("uses transform function", () => {
    const none = style()
    const addPx = style({ transform: U.addPx })
    const addPc = style({ transform: U.addPc })

    expect(none({ a: "2em" })).toMatchSnapshot("none")
    expect(addPx({ a: "2em" })).toMatchSnapshot("addPx")
    expect(addPc({ a: "2em" })).toMatchSnapshot("addPc")

    expect(none({ a: 100 })).toMatchSnapshot("none")
    expect(addPx({ a: 100 })).toMatchSnapshot("addPx")
    expect(addPc({ a: 100 })).toMatchSnapshot("addPc")

    expect(none({ a: 0 })).toMatchSnapshot("none")
    expect(addPx({ a: 0 })).toMatchSnapshot("addPx")
    expect(addPc({ a: 0 })).toMatchSnapshot("addPc")
  })

  test("uses fallback lookup", () => {
    const none = style()
    const fall = style({ fallback: [0, 4, 8] })

    expect(none({ a: 1 })).toMatchSnapshot("[ ] fallback")
    expect(none({ a: 2 })).toMatchSnapshot("[ ] fallback")

    expect(fall({ a: 1 })).toMatchSnapshot("[x] fallback")
    expect(fall({ a: 2 })).toMatchSnapshot("[x] fallback")
  })

  test("resolves nested values", () => {
    const s = style({
      fallback: {
        m: {
          n: [
            {
              alias: "foo", // find this...
              value: 100
            },
            200,
            {
              alias: "foo", // ...before this
              value: 300
            }
          ]
        }
      }
    })

    const testValue = (a: string) => expect(s({ a })).toMatchSnapshot(a)

    testValue("a")
    testValue("m.a")
    testValue("m.n.0")
    testValue("m.n.1")
    testValue("m.n.2")
    testValue("m.n.3")
    testValue("m.n.foo")
  })

  test("uses theme prop", () => {
    const fallback = [11, 22, 33]
    const theme1 = {
      t: ["0T", "1T", "2T"],
      u: ["0U", "1U", "2U"]
    }
    const theme2 = {
      u: ["0U", "1U", "2U"],
      v: ["0V", "1V", "2V"]
    }
    const theme3 = {
      t: {
        u: {
          v: ["0V", "1V", "2V"]
        }
      }
    }

    const none = style()
    const fall = style({ fallback })
    const nest = style({ themeKeys: ["n.m.o", "t.u.v"] })

    // No theme
    expect(none({ a: 1 })).toMatchSnapshot("[ ] fallback [ ] theme")
    expect(fall({ a: 1 })).toMatchSnapshot("[x] fallback [ ] theme")
    expect(nest({ a: 1 })).toMatchSnapshot("[ ] fallback [ ] theme")

    // With theme1
    expect(none({ a: 1, theme: theme1 })).toMatchSnapshot(
      "[ ] fallback [x] theme1"
    )
    expect(fall({ a: 1, theme: theme1 })).toMatchSnapshot(
      "[x] fallback [x] theme1"
    )
    expect(nest({ a: 1, theme: theme1 })).toMatchSnapshot(
      "[ ] fallback [x] theme1"
    )

    // With theme2
    expect(none({ a: 1, theme: theme2 })).toMatchSnapshot(
      "[ ] fallback [x] theme2"
    )
    expect(fall({ a: 1, theme: theme2 })).toMatchSnapshot(
      "[x] fallback [x] theme2"
    )
    expect(nest({ a: 1, theme: theme2 })).toMatchSnapshot(
      "[ ] fallback [x] theme2"
    )

    // With theme3
    expect(none({ a: 1, theme: theme3 })).toMatchSnapshot(
      "[ ] fallback [x] theme3"
    )
    expect(fall({ a: 1, theme: theme3 })).toMatchSnapshot(
      "[x] fallback [x] theme3"
    )
    expect(nest({ a: 1, theme: theme3 })).toMatchSnapshot(
      "[ ] fallback [x] theme3"
    )
  })
})
