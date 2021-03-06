import * as O from "../src"

const props = {
  foo: "foo",
  bar: "bar",
  baz: "baz",
  margin: 1,
  m: 2,
  padding: 3,
  p: 4,
  theme: {
    spaces: [1, 2, 3]
  }
}

describe("omit", () => {
  test("omits propsKeys", () => {
    const omitKeys = O.omit({
      propsKeys: ["theme", "foo", "bar"]
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
      propsKeys: ["theme", "foo", "baz"],
      renderers: [O.margin, O.display]
    })
    expect(omitKeys(props)).toMatchSnapshot()
  })
})

describe("pick", () => {
  test("picks propsKeys", () => {
    const pickKeys = O.pick({
      propsKeys: ["foo", "bar"]
    })
    expect(pickKeys(props)).toMatchSnapshot()
  })

  test("picks renderers", () => {
    const pickKeys = O.pick({
      renderers: [O.spaceSet]
    })
    expect(pickKeys(props)).toMatchSnapshot()
  })

  test("picks propsKeys and renderers", () => {
    const pickKeys = O.pick({
      propsKeys: ["foo", "baz"],
      renderers: [O.margin, O.display]
    })
    expect(pickKeys(props)).toMatchSnapshot()
  })
})
