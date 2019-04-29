import * as U from "../src/utils"

test("eq", () => {
  expect(U.eq(1)(1)).toBe(true)
  expect(U.eq(1)(2)).toBe(false)
})

test("has", () => {
  const foo = { foo: "foo", bar: "bar" }
  expect(U.has("foo")(foo)).toBe(true)
  expect(U.has("bar")(foo)).toBe(true)
  expect(U.has("toString")(foo)).toBe(false)
  expect(U.has("hasOwnProperty")(foo)).toBe(false)
})

test("not", () => {
  const isTrue = U.eq(true)
  const isNotTrue = U.not(isTrue)
  expect(isTrue(true)).toBe(true)
  expect(isNotTrue(false)).toBe(true)
})

test("both", () => {
  const isFoo = U.eq("foo")
  const isBar = U.eq("bar")
  const isNotBar = U.not(isBar)
  expect(U.both(isFoo, isBar)("foo")).toBe(false)
  expect(U.both(isFoo, isNotBar)("foo")).toBe(true)
})

test("either", () => {
  const isFoo = U.eq("foo")
  const isBar = U.eq("bar")
  const isFooBar = U.either(isFoo, isBar)
  expect(isFooBar("foo")).toBe(true)
  expect(isFooBar("bar")).toBe(true)
  expect(isFooBar("baz")).toBe(false)
})

test("isType", () => {
  expect(U.isType("string")("foo")).toBe(true)
  expect(U.isType("number")(123)).toBe(true)
  expect(U.isType("object")({})).toBe(true)
})

test("isNil", () => {
  expect(U.isNil(undefined)).toBe(true)
  expect(U.isNil(null)).toBe(true)
  expect(U.isNil(0)).toBe(false)
})

test("isNotNil", () => {
  expect(U.isNotNil(undefined)).toBe(false)
  expect(U.isNotNil(null)).toBe(false)
  expect(U.isNotNil(0)).toBe(true)
})

test("isNotNaN", () => {
  expect(U.isNotNaN(0)).toBe(true)
  expect(U.isNotNaN(null)).toBe(true)
  expect(U.isNotNaN(NaN)).toBe(false)
})

test("isFunction", () => {
  const foo = () => "foo"
  function bar() {
    return "bar"
  }
  expect(U.isFunction(foo)).toBe(true)
  expect(U.isFunction(bar)).toBe(true)
  expect(U.isFunction("1")).toBe(false)
  expect(U.isFunction(null)).toBe(false)
})

test("isObject", () => {
  expect(U.isObject({})).toBe(true)
  expect(U.isObject(null)).toBe(false)
  expect(U.isObject(1234)).toBe(false)
})

test("isNumber", () => {
  expect(U.isNumber(0)).toBe(true)
  expect(U.isNumber(NaN)).toBe(false)
  expect(U.isNumber("0")).toBe(false)
})

test("isString", () => {
  expect(U.isString("1")).toBe(true)
  expect(U.isString({})).toBe(false)
  expect(U.isString(1)).toBe(false)
})

test("isZero", () => {
  expect(U.isZero(0)).toBe(true)
  expect(U.isZero(1)).toBe(false)
  expect(U.isZero("1")).toBe(false)
})

test("isNotZero", () => {
  expect(U.isNotZero(1)).toBe(true)
  expect(U.isNotZero(-1)).toBe(true)
  expect(U.isNotZero("1")).toBe(true)
  expect(U.isNotZero(0)).toBe(false)
})

test("isAlias", () => {
  expect(U.isAlias({ alias: "foo", value: "bar", extra: "baz" })).toBe(true)
  expect(U.isAlias({ alias: "foo", value: "bar" })).toBe(true)
  expect(U.isAlias({ alias: "foo" })).toBe(false)
  expect(U.isAlias({ value: "foo" })).toBe(false)
  expect(U.isAlias(null)).toBe(false)
  expect(U.isAlias(1)).toBe(false)
})

test("isUnitless", () => {
  expect(U.isUnitless(1)).toBe(true)
  expect(U.isUnitless(0)).toBe(false)
  expect(U.isUnitless("1")).toBe(false)
})

test("addUnit", () => {
  const addFoo = U.addUnit("foo")
  expect(addFoo(1)).toBe("1foo")
  expect(addFoo("1")).toBe("1")
  expect(addFoo(0)).toBe(0)
})

test("addEm", () => {
  expect(U.addEm(1)).toBe("1em")
})

test("addPx", () => {
  expect(U.addPx(1)).toBe("1px")
})

test("addPct", () => {
  expect(U.addPct(1)).toBe("1%")
})

test("addRem", () => {
  expect(U.addRem(1)).toBe("1rem")
})

test("mediaQuery", () => {
  expect(U.mediaQuery(320)).toMatchSnapshot()
  expect(U.mediaQuery("20rem")).toMatchSnapshot()
})

test("reduce", () => {
  const add = U.reduce<number>((acc, val) => acc + val)
  expect(add(0)([1, 2, 3])).toBe(6)
  expect(add(2)([1, 2, 3])).toBe(8)
})

test("propEq", () => {
  const fooEq = U.propEq("foo")
  expect(fooEq("foo")({ foo: "foo" })).toBe(true)
  expect(fooEq("foo")({ foo: "bar" })).toBe(false)
})

test("aliasEq", () => {
  expect(U.aliasEq("foo")({ alias: "foo" })).toBe(true)
  expect(U.aliasEq("foo")({ alias: "bar" })).toBe(false)
})

test("indexEq", () => {
  expect(U.indexEq(0)(null, 0)).toBe(true)
  expect(U.indexEq(1)(null, 1)).toBe(true)
  expect(U.indexEq(1)(null, 2)).toBe(false)
  expect(U.indexEq("0")(null, 0)).toBe(true)
  expect(U.indexEq("1")(null, 1)).toBe(true)
  expect(U.indexEq("1")(null, 2)).toBe(false)
})

test("resolveAlias", () => {
  const list = [
    100,
    {
      alias: "one",
      value: 200
    },
    300,
    {
      alias: "two",
      value: 400
    },
    500,
    {
      alias: "one", // duplicate
      value: 600
    },
    700
  ]

  expect(U.resolveAlias(0, list)).toBe(100)
  expect(U.resolveAlias("0", list)).toBe(100)

  expect(U.resolveAlias(1, list)).toBe(200)
  expect(U.resolveAlias("1", list)).toBe(200)
  expect(U.resolveAlias("one", list)).toBe(200)

  expect(U.resolveAlias(2, list)).toBe(300)
  expect(U.resolveAlias("2", list)).toBe(300)

  expect(U.resolveAlias(3, list)).toBe(400)
  expect(U.resolveAlias("3", list)).toBe(400)
  expect(U.resolveAlias("two", list)).toBe(400)

  expect(U.resolveAlias("foo", list)).toBeUndefined()
})

test("toPath", () => {
  expect(U.toPath(0)).toEqual([0])
  expect(U.toPath(1)).toEqual([1])
  expect(U.toPath("a")).toEqual(["a"])
  expect(U.toPath("a.b")).toEqual(["a", "b"])
  expect(U.toPath("a.1")).toEqual(["a", "1"])
})

test("pathOr", () => {
  const fallback = "N/A"
  const lookup = {
    a: {
      b: [
        100,
        {
          alias: "c",
          value: 200
        },
        300,
        {
          alias: "c",
          value: 400
        }
      ]
    }
  }

  const na = U.pathOr(fallback)

  expect(na([])({})).toBe(fallback)

  expect(na(["a"])({})).toBe(fallback)
  expect(na(["a"])({ a: 1 })).toBe(1)

  expect(na(["a", "b"])({ a: 1 })).toBe(fallback)
  expect(na(["a", "b"])({ a: { b: 2 } })).toBe(2)

  expect(na(["a", 1])({ a: [1] })).toBe(fallback)
  expect(na(["a", 1])({ a: [1, 2] })).toBe(2)

  expect(na(["a", "1"])({ a: [1] })).toBe(fallback)
  expect(na(["a", "1"])({ a: [1, 2] })).toBe(2)

  expect(na(["a", "b", "c"])(lookup)).toBe(200)
  expect(na(["a", "b", "0"])(lookup)).toBe(100)
  expect(na(["a", "b", "1"])(lookup)).toBe(200)
  expect(na(["a", "b", "2"])(lookup)).toBe(300)
  expect(na(["a", "b", "3"])(lookup)).toBe(400)
  expect(na(["a", "b", "4"])(lookup)).toBe(fallback)
})
