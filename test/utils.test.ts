import * as S from "../src"
import * as U from "./test-utils"

test("isNil", () => {
  expect(S.isNil(undefined)).toBe(true)
  expect(S.isNil(null)).toBe(true)
  expect(S.isNil(0)).toBe(false)
})

test("isUnitless", () => {
  expect(S.isUnitless(1)).toBe(true)
  expect(S.isUnitless(-1)).toBe(true)
  expect(S.isUnitless(0)).toBe(false)
  expect(S.isUnitless(null)).toBe(false)
  expect(S.isUnitless("foo")).toBe(false)
})

test("isFraction", () => {
  expect(S.isFraction(0.1)).toBe(true)
  expect(S.isFraction(3 / 4)).toBe(true)
  expect(S.isFraction(0)).toBe(false)
  expect(S.isFraction(1)).toBe(false)
  expect(S.isFraction(null)).toBe(false)
  expect(S.isFraction("foo")).toBe(false)
})

test("when", () => {
  const add1 = (n: number) => n + 1
  const whenFraction = S.when(S.isFraction)
  const whenUnitless = S.when(S.isUnitless)

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
  expect(S.addPx(0)).toBe(0)
  expect(S.addPx(1)).toBe("1px")
  expect(S.addPx("2em")).toBe("2em")
})

test("addPc", () => {
  expect(S.addPc(0)).toBe(0)
  expect(S.addPc(1)).toBe(1)
  expect(S.addPc(0.15)).toBe("15%")
  expect(S.addPc(3 / 4)).toBe("75%")
  expect(S.addPc("2em")).toBe("2em")
})

test("addPcOrPx", () => {
  expect(S.addPcOrPx(0)).toBe(0)

  expect(S.addPcOrPx(0.1)).toBe("10%")
  expect(S.addPcOrPx(0.5)).toBe("50%")
  expect(S.addPcOrPx(3 / 4)).toBe("75%")

  expect(S.addPcOrPx(1)).toBe("1px")
  expect(S.addPcOrPx(2)).toBe("2px")

  expect(S.addPcOrPx(-1)).toBe("-1px")
  expect(S.addPcOrPx(-2)).toBe("-2px")

  expect(S.addPcOrPx("1em")).toBe("1em")
  expect(S.addPcOrPx("2vw")).toBe("2vw")
})

test("mq", () => {
  expect(S.mq(320)).toMatchSnapshot()
  expect(S.mq("20rem")).toMatchSnapshot()
})

test("toPath", () => {
  expect(S.toPath(0)).toEqual([0])
  expect(S.toPath(1)).toEqual([1])
  expect(S.toPath("a")).toEqual(["a"])
  expect(S.toPath("a.b")).toEqual(["a", "b"])
  expect(S.toPath("a.1")).toEqual(["a", "1"])
})

test("get", () => {
  // Null
  expect(S.get()).toBeNull()
  expect(S.get("foo")).toBeNull()
  expect(S.get("zoo", U.OBJ)).toBeNull()
  expect(S.get("foo.a", U.OBJ)).toBeNull()

  // Strings
  expect(S.get("foo", U.OBJ)).toBe(U.OBJ.foo)
  expect(S.get("bar", U.OBJ)).toBe(U.OBJ.bar)
  expect(S.get("bar.a", U.OBJ)).toBe(U.OBJ.bar.a)
  expect(S.get("bar.b", U.OBJ)).toBe(U.OBJ.bar.b)
  expect(S.get("bar.c", U.OBJ)).toBe(U.OBJ.bar.c)
  expect(S.get("bar.d", U.OBJ)).toBe(U.OBJ.bar.d)
  expect(S.get("bar.d.1", U.OBJ)).toBe(U.OBJ.bar.d[1])

  // Arrays
  expect(S.get(["foo"], U.OBJ)).toBe(U.OBJ.foo)
  expect(S.get(["bar"], U.OBJ)).toBe(U.OBJ.bar)
  expect(S.get(["bar", "a"], U.OBJ)).toBe(U.OBJ.bar.a)
  expect(S.get(["bar", "b"], U.OBJ)).toBe(U.OBJ.bar.b)
  expect(S.get(["bar", "c"], U.OBJ)).toBe(U.OBJ.bar.c)
  expect(S.get(["bar", "d"], U.OBJ)).toBe(U.OBJ.bar.d)
  expect(S.get(["bar", "d", 1], U.OBJ)).toBe(U.OBJ.bar.d[1])
  expect(S.get(["bar", "d", "2"], U.OBJ)).toBe(U.OBJ.bar.d[2])

  // Aliases
  expect(S.get("baz.0", U.OBJ)).toBeNull()
  expect(S.get("baz.A0", U.OBJ)).toBeNull()
  expect(S.get("baz.1", U.OBJ)).toBe(U.OBJ.baz[1]) // { value: "V1" }
  expect(S.get("baz.A1", U.OBJ)).toBeNull()
  expect(S.get("baz.2", U.OBJ)).toBe("V2")
  expect(S.get("baz.A2", U.OBJ)).toBe("V2")
  expect(S.get("baz.3", U.OBJ)).toBe(0)
  expect(S.get("baz.A3", U.OBJ)).toBe(0)
  expect(S.get("baz.4", U.OBJ)).toBe("V4")
  expect(S.get("baz.A4", U.OBJ)).toBeNull()
  expect(S.get("baz.5", U.OBJ)).toBe(0)
  expect(S.get("baz.A5", U.OBJ)).toBeNull()
})

test("resolve", () => {
  // Null
  expect(S.resolve()).toBeNull()
  expect(S.resolve([])).toBeNull()
  expect(S.resolve([], U.OBJ)).toBeNull()
  expect(S.resolve(["zoo"], U.OBJ)).toBeNull()
  expect(S.resolve(["foo.a"], U.OBJ)).toBeNull()

  // Resolve
  expect(S.resolve(["foo"], U.OBJ)).toBe(U.OBJ.foo)
  expect(S.resolve(["bar"], U.OBJ)).toBe(U.OBJ.bar)
  expect(S.resolve(["bar.a"], U.OBJ)).toBe(U.OBJ.bar.a)
  expect(S.resolve(["bar.b"], U.OBJ)).toBe(U.OBJ.bar.b)
  expect(S.resolve(["bar.c"], U.OBJ)).toBe(U.OBJ.bar.c)
  expect(S.resolve(["bar.d"], U.OBJ)).toBe(U.OBJ.bar.d)
  expect(S.resolve(["bar.d.1"], U.OBJ)).toBe(U.OBJ.bar.d[1])

  // Priority
  expect(S.resolve(["foo", "bar"], U.OBJ)).toBe(U.OBJ.foo)
  expect(S.resolve(["bar", "foo"], U.OBJ)).toBe(U.OBJ.bar)

  // Fallback
  expect(S.resolve(["foo.a", "bar.a"], U.OBJ)).toBe(U.OBJ.bar.a)
  expect(S.resolve(["foo.a", "bar.e"], U.OBJ)).toBeNull()

  // Aliases
  expect(S.resolve(["baz.0"], U.OBJ)).toBeNull()
  expect(S.resolve(["baz.A0"], U.OBJ)).toBeNull()
  expect(S.resolve(["baz.1"], U.OBJ)).toBe(U.OBJ.baz[1]) // { value: "V1" }
  expect(S.resolve(["baz.A1"], U.OBJ)).toBeNull()
  expect(S.resolve(["baz.2"], U.OBJ)).toBe("V2")
  expect(S.resolve(["baz.A2"], U.OBJ)).toBe("V2")
  expect(S.resolve(["baz.3"], U.OBJ)).toBe(0)
  expect(S.resolve(["baz.A3"], U.OBJ)).toBe(0)
  expect(S.resolve(["baz.4"], U.OBJ)).toBe("V4")
  expect(S.resolve(["baz.A4"], U.OBJ)).toBeNull()
  expect(S.resolve(["baz.5"], U.OBJ)).toBe(0)
  expect(S.resolve(["baz.A5"], U.OBJ)).toBeNull()
})