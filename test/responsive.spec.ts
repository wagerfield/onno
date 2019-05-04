import * as H from "./test-utils"

const baselineFunc = H.style()
const testBaseline = H.snapshot(baselineFunc)

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

test("responsive prop arrays", () => {
  testBaseline({ a: [11, 22, 33] })
})

test("responsive prop objects", () => {
  testBaseline({
    a: {
      xs: "xs",
      md: "md",
      xl: "xl",
      na: "na" // Does not exist
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

test("theme breakpoint objects", () => {
  const theme = {
    breakpoints: {
      a0: 0,
      a1: 100,
      a2: 200
    }
  }
  testBaseline({ theme, a: { a0: 0, a1: 1, a2: 2, a3: 3 } })
  testBaseline({ theme, a: [1, 2, 3, 4] }) // Should return null
})

test("theme breakpoint aliases", () => {
  const theme = {
    breakpoints: [
      { alias: "a0", value: 0 },
      { alias: "a1", value: 100 },
      { alias: "a2", value: 200 }
    ]
  }
  testBaseline({ theme, a: { a0: 0, a1: 1, a2: 2, a3: 3 } })
  testBaseline({ theme, a: [0, 1, 2, 3] })
})
