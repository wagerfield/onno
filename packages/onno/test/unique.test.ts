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
    styleFunc5,
    styleFunc3,
    styleFunc4,
    styleFunc1
  ])
})

test("composed renderers are omitted", () => {
  const compFunc1 = O.compose({
    name: "comp1",
    renderers: [styleFunc1, styleFunc2]
  })
  const compFunc2 = O.compose({
    name: "comp2",
    renderers: [styleFunc3, styleFunc4, styleFunc5]
  })
  const compFunc3 = O.compose({
    name: "comp3",
    renderers: [compFunc1, compFunc2]
  })
  expect(O.unique([styleFunc2, styleFunc4, compFunc3])).toEqual([
    styleFunc2,
    styleFunc4,
    styleFunc1,
    styleFunc3,
    styleFunc5
  ])
})
