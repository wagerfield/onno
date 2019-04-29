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
    const s1 = style()
    const s2 = style({ transform: U.addPx })
    const s3 = style({ transform: U.addEm })

    expect(s1({ a: "50%" })).toMatchSnapshot()
    expect(s2({ a: "50%" })).toMatchSnapshot()
    expect(s3({ a: "50%" })).toMatchSnapshot()

    expect(s1({ a: 100 })).toMatchSnapshot()
    expect(s2({ a: 100 })).toMatchSnapshot()
    expect(s3({ a: 100 })).toMatchSnapshot()

    expect(s1({ a: 0 })).toMatchSnapshot()
    expect(s2({ a: 0 })).toMatchSnapshot()
    expect(s3({ a: 0 })).toMatchSnapshot()
  })

  test("uses fallback lookup", () => {
    const s1 = style()
    const s2 = style({ fallback: [0, 4, 8] })

    expect(s1({ a: 1 })).toMatchSnapshot()
    expect(s2({ a: 1 })).toMatchSnapshot()

    expect(s1({ a: 2 })).toMatchSnapshot()
    expect(s2({ a: 2 })).toMatchSnapshot()
  })
})
