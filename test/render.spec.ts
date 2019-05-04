import * as S from "../src"

test("returns null for undefined keys", () => {
  expect(S.render()).toBeNull()
})

test("returns null for undefined value", () => {
  expect(S.render(["foo"])).toBeNull()
})

test("returns null for empty key array", () => {
  expect(S.render([], "foo")).toBeNull()
})

test("returns style object", () => {
  expect(S.render(["x"], "x")).toMatchSnapshot()
  expect(S.render(["x", "y"], "xy")).toMatchSnapshot()
  expect(S.render(["x", "y", "z"], "xyz")).toMatchSnapshot()
})
