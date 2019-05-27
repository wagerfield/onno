import * as O from "../src"

test("returns null for undefined keys", () => {
  expect(O.renderStyle()).toBeNull()
})

test("returns null for undefined value", () => {
  expect(O.renderStyle(["foo"])).toBeNull()
})

test("returns null for empty key array", () => {
  expect(O.renderStyle([], "foo")).toBeNull()
})

test("returns style object", () => {
  expect(O.renderStyle(["x"], "x")).toMatchSnapshot()
  expect(O.renderStyle(["x", "y"], "xy")).toMatchSnapshot()
  expect(O.renderStyle(["x", "y", "z"], "xyz")).toMatchSnapshot()
})
