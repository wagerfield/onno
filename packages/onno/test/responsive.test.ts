import * as O from "./test-utils"

const baselineFunc = O.style()
const testBaseline = O.snapshot(baselineFunc)

test("returns null for unresolved breakpoints", () => {
  expect(baselineFunc({ a: { foo: "foo" } })).toBeNull()
  expect(
    baselineFunc({
      a: [1, 2, 3],
      theme: {
        breakpoints: []
      }
    })
  ).toBeNull()
})

test("handles responsive prop arrays", () => {
  testBaseline({ a: [11, 22, 33] })
})

test("handles responsive prop objects", () => {
  testBaseline({
    a: {
      xs: "XS",
      md: "MD",
      xl: "XL",
      na: "NA" // Does not exist
    }
  })
})

test("style array is sorted in breakpoint order", () => {
  testBaseline({
    a: {
      lg: "LG",
      xs: "XS",
      md: "MD",
      na: "NA" // Does not exist
    }
  })
  testBaseline({
    a: [1, 2, 3],
    theme: {
      breakpoints: [200, 100]
    }
  })
})

test("theme breakpoint arrays", () => {
  testBaseline({
    a: [1, 2, 3, 4],
    theme: {
      breakpoints: [0, 100, 200]
    }
  })
})

test("theme breakpoint array aliases", () => {
  const theme = {
    breakpoints: [
      { alias: "a0", value: 0 },
      { alias: "a1", value: 100 },
      { alias: "a2", value: 200 }
    ]
  }
  testBaseline({ theme, a: [0, 1, 2, 3] })
  testBaseline({ theme, a: { a0: 0, a1: 1, a2: 2, a3: 3 } })
})
