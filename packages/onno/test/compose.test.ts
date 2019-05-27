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

test("deduplicates style functions", () => {
  const styleFunc1 = O.style<any, any>({ propsKeys: ["a", "b"] })
  const styleFunc2 = O.style<any, any>({ propsKeys: ["c", "d"] })
  const styleFunc3 = O.style<any, any>({ propsKeys: ["e", "f"] })

  const styleSet1 = O.compose([styleFunc1, styleFunc2, styleFunc1])
  const styleSet2 = O.compose([styleFunc2, styleFunc3, styleFunc1])
  const styleSet3 = O.compose([styleFunc3, styleSet1, styleSet2])

  const testProps = U.snapshot(styleSet3)

  testProps({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })
})
