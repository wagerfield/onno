import * as O from "../src"
import * as U from "./test-utils"

const baselineFunc = U.style()
const testBaseline = U.snapshot(baselineFunc)

test("returns style function", () => {
  expect(baselineFunc).toEqual(expect.any(Function))
  expect(baselineFunc).toHaveLength(1)
})

test("returns null for unresolved keys", () => {
  expect(baselineFunc({ z: "foo" } as any)).toBeNull()
})

test("returns style object array", () => {
  testBaseline({ a: "foo" })
  testBaseline({ a: "bar" })
})

test("styleKeys default to first propsKeys", () => {
  interface Props extends O.ThemeProps {
    a?: any
    b?: any
  }
  interface Style extends O.Style {
    a?: any
  }
  const styleFunc = O.style<Props, Style>({ propsKeys: ["a", "b"] })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: "foo" })
  testProps({ b: "bar" })
})

test("styleKeys can be nullified", () => {
  interface Props extends O.ThemeProps {
    a?: any
    b?: any
  }
  const styleFunc = O.style<Props>({
    propsKeys: ["a", "b"],
    styleKeys: null,
    defaults: {
      foo: {
        one: "foo"
      },
      bar: {
        two: "bar"
      }
    }
  })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: "foo" })
  testProps({ b: "bar" })
  testProps({ a: "baz" })
})

test("prop aliases", () => {
  testBaseline({ a: 1, b: 2, c: 3, d: 4 } as any)
  testBaseline({ b: 2, c: 3, d: 4 } as any)
  testBaseline({ c: 3, d: 4 } as any)
  testBaseline({ d: 4 } as any)
})

test("nested props", () => {
  interface Props extends O.ThemeProps {
    a?: {
      b?: {
        c?: number
      }
    }
  }
  interface Style extends O.Style {
    a?: any
  }
  const styleFunc = U.style<Props, Style>({ propsKeys: ["a.b.c"] })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: { b: { c: 3 } } })
  testProps({ a: { b: 2 } } as any)
})

test("transform functions", () => {
  const testAddPx = U.snapshot(U.style({ transform: O.addPx }))
  const testAddPc = U.snapshot(U.style({ transform: O.addPc }))

  const testProps = (props: U.TestProps) => {
    testBaseline(props, "baseline")
    testAddPx(props, "addPx")
    testAddPc(props, "addPc")
  }

  testProps({ a: "2em" })
  testProps({ a: 100 })
  testProps({ a: 0.5 })
  testProps({ a: 0 })
})

test("defaults", () => {
  const testDefaults = U.snapshot(U.style({ defaults: [0, 4, 8] }))

  const testProps = (props: U.TestProps) => {
    testBaseline(props, "baseline")
    testDefaults(props, "defaults")
  }

  testProps({ a: 1 })
  testProps({ a: 2 })
})

test("nested defaults", () => {
  const styleFunc = U.style({
    defaults: {
      k: {
        l: {
          m: 0,
          n: "foo",
          o: [11, 22, 33]
        }
      }
    }
  })
  const testProps = U.snapshot(styleFunc)

  testProps({ a: "j.k" })
  testProps({ a: "k.l.z" })
  testProps({ a: "k.l.m" })
  testProps({ a: "k.l.n" })
  testProps({ a: "k.l.o.1" })
})

test("aliased defaults", () => {
  const styleFunc = U.style({
    defaults: [
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
  const testProps = U.snapshot(styleFunc)

  testProps({ a: 0 })
  testProps({ b: 1 })

  testProps({ a: "foo" })
  testProps({ b: "bar" })
})

test("renderers", () => {
  const base = O.extend({
    transform: O.addPx,
    defaults: [0, 10, 20]
  })
  const renderX = base({
    propsKeys: ["x"],
    styleKeys: ["xxx"]
  })
  const renderY = base({
    propsKeys: ["y"],
    styleKeys: ["yyy"]
  })
  const styleFunc = U.style({ renderers: [renderX, renderY] })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: 0 })
  testProps({ b: 2 })
  testProps({ c: -4 })
})
