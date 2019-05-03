import * as H from "./test-utils"

const fallback = ["F0", "F1", "F2"]
const themeKeys = ["t.u.v"]

const theme1 = {
  t: ["T0"],
  u: ["U0", "U1"]
}

const theme2 = {
  t: {
    u: {
      v: ["0V", "1V"]
    }
  }
}

const theme3 = {
  v: [{ alias: "foo", value: 11 }, { alias: "bar", value: 22 }]
}

test("supports theme", () => {
  const testProps = H.snapshot(H.style())
  testProps({ a: 0, theme: theme1 }, "0")
  testProps({ a: 1, theme: theme1 }, "1")
  testProps({ a: 2, theme: theme1 }, "2")
})

test("supports nested theme", () => {
  const testProps = H.snapshot(H.style({ themeKeys }))
  testProps({ a: 0, theme: theme2 }, "0")
  testProps({ a: 1, theme: theme2 }, "1")
  testProps({ a: 2, theme: theme2 }, "2")
})

test("supports theme and fallback", () => {
  const testProps = H.snapshot(H.style({ fallback }))
  testProps({ a: 0, theme: theme1 }, "0")
  testProps({ a: 1, theme: theme1 }, "1")
  testProps({ a: 2, theme: theme1 }, "2")
  testProps({ a: 3, theme: theme1 }, "3")
})

test("supports nested theme and fallback", () => {
  const testProps = H.snapshot(H.style({ fallback, themeKeys }))
  testProps({ a: 0, theme: theme2 }, "0")
  testProps({ a: 1, theme: theme2 }, "1")
  testProps({ a: 2, theme: theme2 }, "2")
  testProps({ a: 3, theme: theme2 }, "3")
})

test("supports theme array aliases", () => {
  const testProps = H.snapshot(H.style())
  testProps({ a: "foo", theme: theme3 }, "foo")
  testProps({ a: "bar", theme: theme3 }, "bar")
  testProps({ a: "baz", theme: theme3 }, "baz")
  testProps({ a: 0, theme: theme3 }, "0")
  testProps({ a: 1, theme: theme3 }, "1")
  testProps({ a: 2, theme: theme3 }, "2")
})
