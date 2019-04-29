import { StyleOptions } from "../lib/types"
import * as S from "../src/style"
import * as U from "../src/utils"

describe("resolveKey", () => {
  const props = { foo: "FOO", bar: "BAR" }

  test("returns null for undefined keys", () => {
    expect(S.resolveKey(props)).toBeNull()
  })

  test("returns null for unresolved keys", () => {
    expect(S.resolveKey(props, ["baz"])).toBeNull()
  })

  test("returns resolved keys", () => {
    expect(S.resolveKey(props, ["foo"])).toBe("foo")
    expect(S.resolveKey(props, ["bar"])).toBe("bar")
    expect(S.resolveKey(props, ["foo", "bar"])).toBe("foo")
    expect(S.resolveKey(props, ["bar", "foo"])).toBe("bar")
  })
})

describe("resolveValue", () => {
  const props = { foo: "FOO", bar: "BAR" }

  test("returns null for undefined keys", () => {
    expect(S.resolveValue(props)).toBeNull()
  })

  test("returns null for unresolved keys", () => {
    expect(S.resolveValue(props, ["baz"])).toBeNull()
  })

  test("returns resolved keys", () => {
    expect(S.resolveValue(props, ["foo"])).toBe("FOO")
    expect(S.resolveValue(props, ["bar"])).toBe("BAR")
    expect(S.resolveValue(props, ["foo", "bar"])).toBe("FOO")
    expect(S.resolveValue(props, ["bar", "foo"])).toBe("BAR")
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

  test("returns style object", () => {
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
    const plain = style()
    const addPx = style({ transform: U.addPx })
    const addEm = style({ transform: U.addEm })

    expect(plain({ a: "50%" })).toMatchSnapshot("plain")
    expect(addPx({ a: "50%" })).toMatchSnapshot("addPx")
    expect(addEm({ a: "50%" })).toMatchSnapshot("addEm")

    expect(plain({ a: 100 })).toMatchSnapshot("plain")
    expect(addPx({ a: 100 })).toMatchSnapshot("addPx")
    expect(addEm({ a: 100 })).toMatchSnapshot("addEm")

    expect(plain({ a: 0 })).toMatchSnapshot("plain")
    expect(addPx({ a: 0 })).toMatchSnapshot("addPx")
    expect(addEm({ a: 0 })).toMatchSnapshot("addEm")
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
              alias: "o",
              value: 100
            },
            200,
            {
              alias: "o",
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
    testValue("m.n.o")
  })
})
