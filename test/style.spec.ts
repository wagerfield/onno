import { StyleOptions } from "../lib/types"
import * as S from "../src/style"
import * as U from "../src/utils"

describe("getKey", () => {
  const props = { foo: "FOO", bar: "BAR" }

  test("returns undefined for undefined keys", () => {
    expect(S.getKey(props)).toBeUndefined()
  })

  test("returns undefined for unresolved keys", () => {
    expect(S.getKey(props, ["baz"])).toBeUndefined()
  })

  test("returns resolved keys", () => {
    expect(S.getKey(props, ["foo"])).toBe("foo")
    expect(S.getKey(props, ["bar"])).toBe("bar")
    expect(S.getKey(props, ["foo", "bar"])).toBe("foo")
    expect(S.getKey(props, ["bar", "foo"])).toBe("bar")
  })
})

describe("getValue", () => {
  const props = { foo: "FOO", bar: "BAR" }

  test("returns undefined for undefined keys", () => {
    expect(S.getValue(props)).toBeUndefined()
  })

  test("returns undefined for unresolved keys", () => {
    expect(S.getValue(props, ["baz"])).toBeUndefined()
  })

  test("returns resolved keys", () => {
    expect(S.getValue(props, ["foo"])).toBe("FOO")
    expect(S.getValue(props, ["bar"])).toBe("BAR")
    expect(S.getValue(props, ["foo", "bar"])).toBe("FOO")
    expect(S.getValue(props, ["bar", "foo"])).toBe("BAR")
  })
})

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
    const withoutFallback = style()
    const withFallback = style({ fallback: [0, 4, 8] })

    expect(withoutFallback({ a: 1 })).toMatchSnapshot("without fallback")
    expect(withoutFallback({ a: 2 })).toMatchSnapshot("without fallback")

    expect(withFallback({ a: 1 })).toMatchSnapshot("with fallback")
    expect(withFallback({ a: 2 })).toMatchSnapshot("with fallback")
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
})
