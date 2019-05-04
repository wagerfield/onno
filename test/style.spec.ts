import * as T from "../src/types"
import * as S from "../src/style"
import * as U from "../src/utils"
import * as H from "./test-utils"

const baselineFunc = H.style()
const testBaseline = H.snapshot(baselineFunc)

test("returns style function", () => {
  expect(baselineFunc).toEqual(expect.any(Function))
  expect(baselineFunc).toHaveLength(1)
})

test("returns null for unresolved keys", () => {
  expect(baselineFunc({ z: "foo" })).toBeNull()
})

test("returns style object array", () => {
  testBaseline({ a: "foo" })
  testBaseline({ a: "bar" })
})

test("styleKeys default to first propsKeys", () => {
  const styleFunc = S.style({ propsKeys: ["a", "b"] })
  const testProps = H.snapshot(styleFunc)
  testProps({ a: "foo" })
  testProps({ b: "bar" })
})

test("prop aliases", () => {
  testBaseline({ a: 1, b: 2, c: 3, d: 4 })
  testBaseline({ b: 2, c: 3, d: 4 })
  testBaseline({ c: 3, d: 4 })
  testBaseline({ d: 4 })
})

test("nested props", () => {
  const styleFunc = H.style({ propsKeys: ["a.b.c"] })
  const testProps = H.snapshot(styleFunc)
  testProps({ a: { b: { c: 3 } } })
  testProps({ a: { b: 2 } })
})

test("transform functions", () => {
  const testAddPx = H.snapshot(H.style({ transform: U.addPx }))
  const testAddPc = H.snapshot(H.style({ transform: U.addPc }))

  const testProps = (props: T.Props) => {
    testBaseline(props, "baseline")
    testAddPx(props, "addPx")
    testAddPc(props, "addPc")
  }

  testProps({ a: "2em" })
  testProps({ a: 100 })
  testProps({ a: 0.5 })
  testProps({ a: 0 })
})

test("fallbacks", () => {
  const testFallback = H.snapshot(H.style({ fallback: [0, 4, 8] }))

  const testProps = (props: T.Props) => {
    testBaseline(props, "baseline")
    testFallback(props, "fallback")
  }

  testProps({ a: 1 })
  testProps({ a: 2 })
})

test("nested fallbacks", () => {
  const styleFunc = H.style({
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
  const testProps = H.snapshot(styleFunc)

  testProps({ a: "j.k" })
  testProps({ a: "k.l.z" })
  testProps({ a: "k.l.m" })
  testProps({ a: "k.l.n" })
  testProps({ a: "k.l.o.1" })
})

test("aliased fallbacks", () => {
  const styleFunc = H.style({
    fallback: [
      {
        alias: "foo",
        value: 11
      },
      {
        alias: "bar",
        value: 22
      }
    ]
  })
  const testProps = H.snapshot(styleFunc)

  testProps({ a: 0 })
  testProps({ b: 1 })

  testProps({ a: "foo" })
  testProps({ b: "bar" })
})
