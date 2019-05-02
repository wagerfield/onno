import * as T from "../src/types"
import * as S from "../src/style"
import * as U from "../src/utils"
import * as H from "./helpers"

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
  test("returns style function", () => {
    const s = H.style()
    expect(s).toEqual(expect.any(Function))
    expect(s).toHaveLength(1)
  })

  test("returns null for unresolved keys", () => {
    const s = H.style()
    expect(s({ z: "foo" })).toBeNull()
  })

  test("returns style object array", () => {
    const s = H.style()
    expect(s({ a: "foo" })).toMatchSnapshot("a: foo")
  })

  test("styleKeys default to first propsKeys", () => {
    const s = S.style({ propsKeys: ["a", "b"] })
    expect(s({ a: "foo" })).toMatchSnapshot()
    expect(s({ b: "bar" })).toMatchSnapshot()
  })

  test("supports prop aliases", () => {
    const s = H.style()
    expect(s({ a: 1, b: 2, c: 3, d: 4 })).toMatchSnapshot("a:1, b:2, c:3, d:4")
    expect(s({ b: 2, c: 3, d: 4 })).toMatchSnapshot("b:2, c:3, d:4")
    expect(s({ c: 3, d: 4 })).toMatchSnapshot("c:3, d:4")
    expect(s({ d: 4 })).toMatchSnapshot("d:4")
  })

  test("supports nested props", () => {
    const p = { a: { b: { c: 3 } } }
    const s = H.style({ propsKeys: ["a.b.c"] })
    expect(s(p)).toMatchSnapshot(JSON.stringify(p))
  })

  test("supports transform functions", () => {
    const none = H.style()
    const addPx = H.style({ transform: U.addPx })
    const addPc = H.style({ transform: U.addPc })

    const testProps = (props: T.Props) => {
      const stringifiedProps = JSON.stringify(props)
      expect(none(props)).toMatchSnapshot(`none: ${stringifiedProps}`)
      expect(addPx(props)).toMatchSnapshot(`addPx: ${stringifiedProps}`)
      expect(addPc(props)).toMatchSnapshot(`addPc: ${stringifiedProps}`)
    }

    testProps({ a: "2em" })
    testProps({ a: 100 })
    testProps({ a: 0.5 })
    testProps({ a: 0 })
  })

  test("supports fallbacks", () => {
    const none = H.style()
    const fall = H.style({ fallback: [0, 4, 8] })

    const testProps = (props: T.Props) => {
      const stringifiedProps = JSON.stringify(props)
      expect(none(props)).toMatchSnapshot(`none: ${stringifiedProps}`)
      expect(fall(props)).toMatchSnapshot(`fall: ${stringifiedProps}`)
    }

    testProps({ a: 1 })
    testProps({ a: 2 })
  })

  test("supports nested fallbacks", () => {
    const s = H.style({
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
