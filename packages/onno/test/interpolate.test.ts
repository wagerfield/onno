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

const renderers = [fooRenderer, barRenderer]

const fooBarTransform = O.interpolate({
  name: "test",
  renderers
})

test("adds Transform to function name", () => {
  const testTransform1 = O.interpolate({ name: "test1", renderers })
  const testTransform2 = O.interpolate({ name: "test2Transform", renderers })
  expect(testTransform1.name).toBe("test1Transform")
  expect(testTransform2.name).toBe("test2Transform")
})

test("returns null for invalid style object types", () => {
  expect(fooBarTransform()).toBeNull()
  expect(fooBarTransform(null as any)).toBeNull()
  expect(fooBarTransform(true as any)).toBeNull()
  expect(fooBarTransform([12] as any)).toBeNull()
})

test("recursively transforms style objects", () => {
  expect(
    fooBarTransform({
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
