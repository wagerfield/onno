import * as _ from "../src/utils"

test("gt", () => {
  expect(_.gt(1)(2)).toBe(true)
  expect(_.gt(1)(1)).toBe(false)
  expect(_.gt(2)(1)).toBe(false)
})

test("lt", () => {
  expect(_.lt(2)(1)).toBe(true)
  expect(_.lt(1)(1)).toBe(false)
  expect(_.lt(1)(2)).toBe(false)
})

test("eq", () => {
  expect(_.eq(1)(1)).toBe(true)
  expect(_.eq(1)(2)).toBe(false)
})

test("has", () => {
  const foo = { foo: "foo", bar: "bar" }
  expect(_.has("foo")(foo)).toBe(true)
  expect(_.has("bar")(foo)).toBe(true)
  expect(_.has("toString")(foo)).toBe(false)
  expect(_.has("hasOwnProperty")(foo)).toBe(false)
})

test("not", () => {
  const isTrue = _.eq(true)
  const isNotTrue = _.not(isTrue)
  expect(isTrue(true)).toBe(true)
  expect(isNotTrue(false)).toBe(true)
})

test("both", () => {
  const isFoo = _.eq("foo")
  const isBar = _.eq("bar")
  const isNotBar = _.not(isBar)
  expect(_.both(isFoo, isBar)("foo")).toBe(false)
  expect(_.both(isFoo, isNotBar)("foo")).toBe(true)
})

test("either", () => {
  const isFoo = _.eq("foo")
  const isBar = _.eq("bar")
  const isFooBar = _.either(isFoo, isBar)
  expect(isFooBar("foo")).toBe(true)
  expect(isFooBar("bar")).toBe(true)
  expect(isFooBar("baz")).toBe(false)
})

test("isType", () => {
  expect(_.isType("string")("foo")).toBe(true)
  expect(_.isType("number")(123)).toBe(true)
  expect(_.isType("object")({})).toBe(true)
})

test("isNil", () => {
  expect(_.isNil(undefined)).toBe(true)
  expect(_.isNil(null)).toBe(true)
  expect(_.isNil(0)).toBe(false)
})

test("isNotNil", () => {
  expect(_.isNotNil(undefined)).toBe(false)
  expect(_.isNotNil(null)).toBe(false)
  expect(_.isNotNil(0)).toBe(true)
})

test("isNotNaN", () => {
  expect(_.isNotNaN(0)).toBe(true)
  expect(_.isNotNaN(null)).toBe(true)
  expect(_.isNotNaN(NaN)).toBe(false)
})

test("isFunction", () => {
  const foo = () => "foo"
  function bar() {
    return "bar"
  }
  expect(_.isFunction(foo)).toBe(true)
  expect(_.isFunction(bar)).toBe(true)
  expect(_.isFunction("1")).toBe(false)
  expect(_.isFunction(null)).toBe(false)
})

test("isObject", () => {
  expect(_.isObject({})).toBe(true)
  expect(_.isObject(null)).toBe(false)
  expect(_.isObject(1234)).toBe(false)
})

test("isNumber", () => {
  expect(_.isNumber(0)).toBe(true)
  expect(_.isNumber(NaN)).toBe(false)
  expect(_.isNumber("0")).toBe(false)
})

test("isString", () => {
  expect(_.isString("1")).toBe(true)
  expect(_.isString({})).toBe(false)
  expect(_.isString(1)).toBe(false)
})

test("isNegative", () => {
  expect(_.isNegative(-1)).toBe(true)
  expect(_.isNegative(0)).toBe(false)
  expect(_.isNegative(1)).toBe(false)
})

test("isPositive", () => {
  expect(_.isPositive(1)).toBe(true)
  expect(_.isPositive(0)).toBe(false)
  expect(_.isPositive(-1)).toBe(false)
})

test("isZero", () => {
  expect(_.isZero(0)).toBe(true)
  expect(_.isZero(1)).toBe(false)
  expect(_.isZero("1")).toBe(false)
})

test("isNotZero", () => {
  expect(_.isNotZero(1)).toBe(true)
  expect(_.isNotZero(-1)).toBe(true)
  expect(_.isNotZero("1")).toBe(true)
  expect(_.isNotZero(0)).toBe(false)
})

test("isAlias", () => {
  expect(_.isAlias({ alias: "foo", value: "bar" })).toBe(true)
  expect(_.isAlias({ alias: "foo", value: "bar", extra: "baz" })).toBe(true)
  expect(_.isAlias({ alias: "foo" })).toBe(false)
  expect(_.isAlias({ value: "foo" })).toBe(false)
})

test("isUnitless", () => {
  expect(_.isUnitless(1)).toBe(true)
  expect(_.isUnitless(0)).toBe(false)
  expect(_.isUnitless("1")).toBe(false)
})

test("isUnit", () => {
  expect(_.isUnit(0)).toBe(true)
  expect(_.isUnit(1)).toBe(true)
  expect(_.isUnit(-1)).toBe(true)
  expect(_.isUnit("a")).toBe(true)
  expect(_.isUnit({})).toBe(false)
  expect(_.isUnit(NaN)).toBe(false)
  expect(_.isUnit(null)).toBe(false)
})

test("addUnit", () => {
  const addFoo = _.addUnit("foo")
  expect(addFoo(1)).toBe("1foo")
  expect(addFoo("1")).toBe("1")
  expect(addFoo(0)).toBe(0)
})

test("addEm", () => {
  expect(_.addEm(1)).toBe("1em")
})

test("addPx", () => {
  expect(_.addPx(1)).toBe("1px")
})

test("addPct", () => {
  expect(_.addPct(1)).toBe("1%")
})

test("addRem", () => {
  expect(_.addRem(1)).toBe("1rem")
})

test("mediaQuery", () => {
  expect(_.mediaQuery(320)).toMatchSnapshot()
  expect(_.mediaQuery("20rem")).toMatchSnapshot()
})

test("toPath", () => {
  expect(_.toPath(0)).toEqual([0])
  expect(_.toPath(1)).toEqual([1])
  expect(_.toPath("a")).toEqual(["a"])
  expect(_.toPath("a.b")).toEqual(["a", "b"])
  expect(_.toPath("a.1")).toEqual(["a", "1"])
})

test("pathOr", () => {
  const fallback = "N/A"
  const na = _.pathOr(fallback)
  expect(na([])({})).toBe(fallback)
  expect(na(["a"])({})).toBe(fallback)
  expect(na(["a"])({ a: 1 })).toBe(1)
  expect(na(["a", "b"])({ a: 1 })).toBe(fallback)
  expect(na(["a", "b"])({ a: { b: 2 } })).toBe(2)
  expect(na(["a", 1])({ a: [1] })).toBe(fallback)
  expect(na(["a", 1])({ a: [1, 2] })).toBe(2)
  expect(na(["a", "1"])({ a: [1] })).toBe(fallback)
  expect(na(["a", "1"])({ a: [1, 2] })).toBe(2)
})
