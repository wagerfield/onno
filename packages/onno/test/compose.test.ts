import * as O from "../src"
import * as U from "./test-utils"

test("returns style function", () => {
  const styleSet = O.compose()
  expect(styleSet).toEqual(expect.any(Function))
  expect(styleSet).toHaveLength(1)
})

test("returns null for empty arrays ", () => {
  const styleSet = O.compose([O.style({ propsKeys: ["a"] })])
  expect(styleSet({ b: 2 })).toBeNull()
})

test("returns style object array or null", () => {
  const styleSet = O.compose([
    O.style({ propsKeys: ["a", "b"] }),
    O.style({ propsKeys: ["c", "d"] })
  ])
  const testProps = U.snapshot(styleSet)

  testProps({})
  testProps({ a: 1 })
  testProps({ b: 2, d: 4 })
  testProps({ a: 1, b: 2, c: 3, d: 4 })
})

test("supports array of render functions", () => {
  const styleSet = O.compose([
    O.style({ propsKeys: ["a", "b"] }),
    O.style({ propsKeys: ["c", "d"] })
  ])
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1, c: 3 })
  testProps({ b: 2, d: 4 })
})

test("supports list of render functions", () => {
  const styleSet = O.compose(
    O.style({ propsKeys: ["a", "b"] }),
    O.style({ propsKeys: ["c", "d"] })
  )
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1, c: 3 })
  testProps({ b: 2, d: 4 })
})

test("respects order of style functions", () => {
  const styleSet = O.compose([
    O.style({ propsKeys: ["a", "b"], styleKeys: ["x"] }),
    O.style({ propsKeys: ["a", "c"], styleKeys: ["y"] })
  ])
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1 })
  testProps({ b: 2 })
  testProps({ c: 3 })
})

test("only calls a style function once", () => {
  interface TestProps extends O.ThemeProps {
    a: any
    b: any
  }

  interface TestStyle extends O.Style {
    a: any
  }

  const styleFunc = O.style<TestProps, TestStyle>({ propsKeys: ["a", "b"] })
  const styleSet = O.compose([styleFunc, styleFunc, styleFunc])
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1 })
  testProps({ b: 2 })
})
