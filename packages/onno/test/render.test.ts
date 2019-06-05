import * as O from "../src"

test("returns null for undefined keys", () => {
  expect(O.render()).toBeNull()
})

test("returns null for undefined value", () => {
  expect(O.render(["foo"])).toBeNull()
})

test("returns null for empty key array", () => {
  expect(O.render([], "foo")).toBeNull()
})

test("returns style object", () => {
  expect(O.render(["x"], "x")).toMatchSnapshot()
  expect(O.render(["x", "y"], "xy")).toMatchSnapshot()
  expect(O.render(["x", "y", "z"], "xyz")).toMatchSnapshot()
})
