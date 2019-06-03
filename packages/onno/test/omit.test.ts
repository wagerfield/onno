import * as O from "../src"

const props = {
  foo: "foo",
  bar: "bar",
  baz: "baz",
  margin: 1,
  m: 2,
  padding: 3,
  p: 4
}

test("omits propsKeys", () => {
  const omitKeys = O.omit({
    propsKeys: ["foo", "bar"]
  })
  expect(omitKeys(props)).toMatchSnapshot()
})

test("omits renderers", () => {
  const omitKeys = O.omit({
    renderers: [O.spaceSet]
  })
  expect(omitKeys(props)).toMatchSnapshot()
})

test("omits propsKeys and renderers", () => {
  const omitKeys = O.omit({
    propsKeys: ["foo", "baz"],
    renderers: [O.margin, O.display]
  })
  expect(omitKeys(props)).toMatchSnapshot()
})
