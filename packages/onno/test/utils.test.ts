import * as O from "../src"
import * as U from "./test-utils"

test("isNil", () => {
  expect(O.isNil(undefined)).toBe(true)
  expect(O.isNil(null)).toBe(true)
  expect(O.isNil(0)).toBe(false)
})

test("isUndefined", () => {
  expect(O.isUndefined(undefined)).toBe(true)
  expect(O.isUndefined(null)).toBe(false)
  expect(O.isUndefined(0)).toBe(false)
})

test("isUnitless", () => {
  expect(O.isUnitless(1)).toBe(true)
  expect(O.isUnitless(-1)).toBe(true)
  expect(O.isUnitless(0)).toBe(false)
  expect(O.isUnitless(null)).toBe(false)
  expect(O.isUnitless("foo")).toBe(false)
})

test("isFraction", () => {
  expect(O.isFraction(0.1)).toBe(true)
  expect(O.isFraction(3 / 4)).toBe(true)
  expect(O.isFraction(0)).toBe(false)
  expect(O.isFraction(1)).toBe(false)
  expect(O.isFraction(null)).toBe(false)
  expect(O.isFraction("foo")).toBe(false)
})

test("when", () => {
  const add1 = (n: number) => n + 1
  const whenFraction = O.when(O.isFraction)
  const whenUnitless = O.when(O.isUnitless)

  expect(whenFraction(add1)(0)).toBe(0)
  expect(whenFraction(add1)(1)).toBe(1)
  expect(whenFraction(add1)(0.2)).toBe(1.2)
  expect(whenFraction(add1)(3 / 4)).toBe(1.75)
  expect(whenFraction(add1)("2px")).toBe("2px")

  expect(whenUnitless(add1)(0)).toBe(0)
  expect(whenUnitless(add1)(1)).toBe(2)
  expect(whenUnitless(add1)(0.2)).toBe(1.2)
  expect(whenUnitless(add1)(3 / 4)).toBe(1.75)
  expect(whenUnitless(add1)("2px")).toBe("2px")
})

test("addPx", () => {
  expect(O.addPx(0)).toBe(0)
  expect(O.addPx(1)).toBe("1px")
  expect(O.addPx("2em")).toBe("2em")
})

test("addPc", () => {
  expect(O.addPc(0)).toBe(0)
  expect(O.addPc(1)).toBe(1)
  expect(O.addPc(0.15)).toBe("15%")
  expect(O.addPc(3 / 4)).toBe("75%")
  expect(O.addPc("2em")).toBe("2em")
})

test("addPcOrPx", () => {
  expect(O.addPcOrPx(0)).toBe(0)

  expect(O.addPcOrPx(0.1)).toBe("10%")
  expect(O.addPcOrPx(0.5)).toBe("50%")
  expect(O.addPcOrPx(3 / 4)).toBe("75%")

  expect(O.addPcOrPx(1)).toBe("1px")
  expect(O.addPcOrPx(2)).toBe("2px")

  expect(O.addPcOrPx(-1)).toBe("-1px")
  expect(O.addPcOrPx(-2)).toBe("-2px")

  expect(O.addPcOrPx("1em")).toBe("1em")
  expect(O.addPcOrPx("2vw")).toBe("2vw")
})

test("mq", () => {
  expect(O.mq(320)).toMatchSnapshot()
  expect(O.mq("20rem")).toMatchSnapshot()
})

test("toPath", () => {
  expect(O.toPath(0)).toEqual([0])
  expect(O.toPath(1)).toEqual([1])
  expect(O.toPath("a")).toEqual(["a"])
  expect(O.toPath("a.b")).toEqual(["a", "b"])
  expect(O.toPath("a.1")).toEqual(["a", "1"])
})

test("get", () => {
  // Undefined
  expect(O.get()).toBeUndefined()
  expect(O.get("foo")).toBeUndefined()
  expect(O.get("zoo", U.OBJ)).toBeUndefined()
  expect(O.get("foo.a", U.OBJ)).toBeUndefined()

  // Strings
  expect(O.get("boo", U.OBJ)).toBeNull()
  expect(O.get("foo", U.OBJ)).toBe(U.OBJ.foo)
  expect(O.get("bar", U.OBJ)).toBe(U.OBJ.bar)
  expect(O.get("bar.a", U.OBJ)).toBe(U.OBJ.bar.a)
  expect(O.get("bar.b", U.OBJ)).toBe(U.OBJ.bar.b)
  expect(O.get("bar.c", U.OBJ)).toBe(U.OBJ.bar.c)
  expect(O.get("bar.d", U.OBJ)).toBe(U.OBJ.bar.d)
  expect(O.get("bar.d.1", U.OBJ)).toBe(U.OBJ.bar.d[1])

  // Arrays
  expect(O.get(["boo"], U.OBJ)).toBeNull()
  expect(O.get(["foo"], U.OBJ)).toBe(U.OBJ.foo)
  expect(O.get(["bar"], U.OBJ)).toBe(U.OBJ.bar)
  expect(O.get(["bar", "a"], U.OBJ)).toBe(U.OBJ.bar.a)
  expect(O.get(["bar", "b"], U.OBJ)).toBe(U.OBJ.bar.b)
  expect(O.get(["bar", "c"], U.OBJ)).toBe(U.OBJ.bar.c)
  expect(O.get(["bar", "d"], U.OBJ)).toBe(U.OBJ.bar.d)
  expect(O.get(["bar", "d", 1], U.OBJ)).toBe(U.OBJ.bar.d[1])
  expect(O.get(["bar", "d", "2"], U.OBJ)).toBe(U.OBJ.bar.d[2])

  // Aliases
  expect(O.get("baz.0", U.OBJ)).toBeUndefined()
  expect(O.get("baz.A0", U.OBJ)).toBeUndefined()
  expect(O.get("baz.1", U.OBJ)).toBe(U.OBJ.baz[1]) // { value: "V1" }
  expect(O.get("baz.A1", U.OBJ)).toBeUndefined()
  expect(O.get("baz.2", U.OBJ)).toBe("V2")
  expect(O.get("baz.A2", U.OBJ)).toBe("V2")
  expect(O.get("baz.3", U.OBJ)).toBe(0)
  expect(O.get("baz.A3", U.OBJ)).toBe(0)
  expect(O.get("baz.4", U.OBJ)).toBe("V4")
  expect(O.get("baz.A4", U.OBJ)).toBeUndefined()
  expect(O.get("baz.5", U.OBJ)).toBe(0)
  expect(O.get("baz.A5", U.OBJ)).toBeUndefined()
})

test("resolve", () => {
  // Null
  expect(O.resolve()).toBeUndefined()
  expect(O.resolve([])).toBeUndefined()
  expect(O.resolve([], U.OBJ)).toBeUndefined()
  expect(O.resolve(["zoo"], U.OBJ)).toBeUndefined()
  expect(O.resolve(["foo.a"], U.OBJ)).toBeUndefined()

  // Resolve
  expect(O.resolve(["boo"], U.OBJ)).toBeNull()
  expect(O.resolve(["foo"], U.OBJ)).toBe(U.OBJ.foo)
  expect(O.resolve(["bar"], U.OBJ)).toBe(U.OBJ.bar)
  expect(O.resolve(["bar.a"], U.OBJ)).toBe(U.OBJ.bar.a)
  expect(O.resolve(["bar.b"], U.OBJ)).toBe(U.OBJ.bar.b)
  expect(O.resolve(["bar.c"], U.OBJ)).toBe(U.OBJ.bar.c)
  expect(O.resolve(["bar.d"], U.OBJ)).toBe(U.OBJ.bar.d)
  expect(O.resolve(["bar.d.1"], U.OBJ)).toBe(U.OBJ.bar.d[1])

  // Priority
  expect(O.resolve(["foo", "bar"], U.OBJ)).toBe(U.OBJ.foo)
  expect(O.resolve(["bar", "foo"], U.OBJ)).toBe(U.OBJ.bar)

  // Fallback
  expect(O.resolve(["foo.a", "bar.a"], U.OBJ)).toBe(U.OBJ.bar.a)
  expect(O.resolve(["foo.a", "bar.e"], U.OBJ)).toBeUndefined()

  // Aliases
  expect(O.resolve(["baz.0"], U.OBJ)).toBeUndefined()
  expect(O.resolve(["baz.A0"], U.OBJ)).toBeUndefined()
  expect(O.resolve(["baz.1"], U.OBJ)).toBe(U.OBJ.baz[1]) // { value: "V1" }
  expect(O.resolve(["baz.A1"], U.OBJ)).toBeUndefined()
  expect(O.resolve(["baz.2"], U.OBJ)).toBe("V2")
  expect(O.resolve(["baz.A2"], U.OBJ)).toBe("V2")
  expect(O.resolve(["baz.3"], U.OBJ)).toBe(0)
  expect(O.resolve(["baz.A3"], U.OBJ)).toBe(0)
  expect(O.resolve(["baz.4"], U.OBJ)).toBe("V4")
  expect(O.resolve(["baz.A4"], U.OBJ)).toBeUndefined()
  expect(O.resolve(["baz.5"], U.OBJ)).toBe(0)
  expect(O.resolve(["baz.A5"], U.OBJ)).toBeUndefined()
})

test("uniq", () => {
  const a = { a: 1 }
  const b = { b: 2 }
  expect(O.uniq([1, 2, 2, 1])).toEqual([1, 2])
  expect(O.uniq([a, b, b, a])).toEqual([a, b])
})
