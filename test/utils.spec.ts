import * as _ from "../src/utils"

test("eq", () => {
  expect(_.eq(1)(1)).toBe(true)
  expect(_.eq(1)(2)).toBe(false)
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

test("isNumber", () => {
  expect(_.isNumber(0)).toBe(true)
  expect(_.isNumber(NaN)).toBe(false)
  expect(_.isNumber("0")).toBe(false)
})

test("isObject", () => {
  expect(_.isObject({})).toBe(true)
  expect(_.isObject(null)).toBe(false)
  expect(_.isObject(1234)).toBe(false)
})

test("isZero", () => {
  expect(_.isZero(0)).toBe(true)
  expect(_.isZero(1)).toBe(false)
  expect(_.isZero("1")).toBe(false)
})

test("isNotZero", () => {
  expect(_.isNotZero(1)).toBe(true)
  expect(_.isNotZero("1")).toBe(true)
  expect(_.isNotZero(0)).toBe(false)
})

test("isUnitless", () => {
  expect(_.isUnitless(1)).toBe(true)
  expect(_.isUnitless(0)).toBe(false)
  expect(_.isUnitless("1")).toBe(false)
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
