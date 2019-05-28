import * as O from "../src"

const styleFunc1 = O.style<any, any>({ propsKeys: ["a", "b"] })
const styleFunc2 = O.style<any, any>({ propsKeys: ["c", "d"] })
const styleFunc3 = O.style<any, any>({ propsKeys: ["e", "f"] })
const styleFunc4 = O.style<any, any>({
  propsKeys: ["g", "h"],
  renderers: [
    styleFunc1,
    styleFunc1,
    styleFunc2,
    styleFunc2,
    styleFunc3,
    styleFunc3
  ]
})
const styleFunc5 = O.style<any, any>({
  propsKeys: ["g", "h"],
  renderers: [styleFunc3, styleFunc4]
})

test("deduplicates renderers", () => {
  expect(
    O.unique([
      styleFunc1,
      styleFunc1,
      styleFunc2,
      styleFunc2,
      styleFunc3,
      styleFunc3
    ])
  ).toEqual([styleFunc1, styleFunc2, styleFunc3])
})

test("flattens renderers", () => {
  expect(O.unique([styleFunc2, styleFunc5])).toEqual([
    styleFunc2,
    styleFunc3,
    styleFunc1
  ])
})
