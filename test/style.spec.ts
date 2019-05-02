import * as T from "../src/types"
import * as S from "../src/style"
import * as U from "../src/utils"

describe("createStyle", () => {
  test("returns null for undefined keys", () => {
    expect(S.createStyle()).toBeNull()
  })

  test("returns null for undefined value", () => {
    expect(S.createStyle(["foo"])).toBeNull()
  })

  test("returns style object", () => {
    expect(S.createStyle(["x", "y", "z"], "foo")).toMatchSnapshot()
  })
})

describe("style", () => {
  const style = (options?: Partial<T.StyleOptions>) =>
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
    expect(s({ a: "foo" })).toMatchSnapshot("a: foo")
  })

  test("styleKeys default to first propsKeys", () => {
    const s = S.style({ propsKeys: ["a", "b"] })
    expect(s({ a: "foo" })).toMatchSnapshot()
    expect(s({ b: "bar" })).toMatchSnapshot()
  })

  test("supports prop aliases", () => {
    const s = style()
    expect(s({ a: 1, b: 2, c: 3, d: 4 })).toMatchSnapshot("a:1, b:2, c:3, d:4")
    expect(s({ b: 2, c: 3, d: 4 })).toMatchSnapshot("b:2, c:3, d:4")
    expect(s({ c: 3, d: 4 })).toMatchSnapshot("c:3, d:4")
    expect(s({ d: 4 })).toMatchSnapshot("d:4")
  })

  test("supports nested props", () => {
    const p = { a: { b: { c: 3 } } }
    const s = style({ propsKeys: ["a.b.c"] })
    expect(s(p)).toMatchSnapshot(JSON.stringify(p))
  })

  test("supports transform functions", () => {
    const none = style()
    const addPx = style({ transform: U.addPx })
    const addPc = style({ transform: U.addPc })

    const testProps = (props: T.Props) => {
      expect(none(props)).toMatchSnapshot(`none: ${JSON.stringify(props)}`)
      expect(addPx(props)).toMatchSnapshot(`addPx: ${JSON.stringify(props)}`)
      expect(addPc(props)).toMatchSnapshot(`addPc: ${JSON.stringify(props)}`)
    }

    testProps({ a: "2em" })
    testProps({ a: 100 })
    testProps({ a: 0.5 })
    testProps({ a: 0 })
  })

  test("supports fallbacks", () => {
    const none = style()
    const fall = style({ fallback: [0, 4, 8] })

    const testProps = (props: T.Props) => {
      expect(none(props)).toMatchSnapshot(`none: ${JSON.stringify(props)}`)
      expect(fall(props)).toMatchSnapshot(`fall: ${JSON.stringify(props)}`)
    }

    testProps({ a: 1 })
    testProps({ a: 2 })
  })

  test("supports nested fallbacks", () => {
    const s = style({
      fallback: {
        k: {
          l: {
            m: 0,
            n: "foo",
            o: [11, 22, 33]
          }
        }
      }
    })

    const testProps = (props: T.Props) => {
      expect(s(props)).toMatchSnapshot(JSON.stringify(props))
    }

    testProps({ a: "j.k" })
    testProps({ a: "k.l.z" })
    testProps({ a: "k.l.m" })
    testProps({ a: "k.l.n" })
    testProps({ a: "k.l.o.1" })
  })
})
