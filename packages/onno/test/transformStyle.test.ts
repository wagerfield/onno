import * as O from "../src"

const toUpper = O.when(O.isString)((s) => s.toUpperCase())
const reverse = O.when(O.isString)((s) => s.split("").reverse().join("")) // prettier-ignore

const fooRenderer = O.style({
  propsKeys: ["foo"],
  styleKeys: ["a", "b"],
  transform: toUpper
})

const barRenderer = O.style({
  propsKeys: ["bar"],
  styleKeys: ["c", "d"],
  transform: reverse
})

const transform = O.transformStyle([fooRenderer, barRenderer])

test("returns null for undefined keys", () => {
  expect(
    transform({
      foo: "foo",
      bar: "bar",
      baz: "baz",
      obj: {
        foo: "foo",
        bar: "bar",
        baz: "baz",
        obj: {
          foo: "foo",
          bar: "bar",
          baz: "baz"
        }
      }
    })
  ).toMatchSnapshot()
})
