import * as U from "../src/utils"
import * as H from "./test-utils"

test("isNil", () => {
  expect(U.isNil(undefined)).toBe(true)
  expect(U.isNil(null)).toBe(true)
  expect(U.isNil(0)).toBe(false)
})

test("isUnitless", () => {
  expect(U.isUnitless(1)).toBe(true)
  expect(U.isUnitless(-1)).toBe(true)
  expect(U.isUnitless(0)).toBe(false)
  expect(U.isUnitless(null)).toBe(false)
  expect(U.isUnitless("foo")).toBe(false)
})

test("isFraction", () => {
  expect(U.isFraction(0.1)).toBe(true)
  expect(U.isFraction(3 / 4)).toBe(true)
  expect(U.isFraction(0)).toBe(false)
  expect(U.isFraction(1)).toBe(false)
  expect(U.isFraction(null)).toBe(false)
  expect(U.isFraction("foo")).toBe(false)
})

test("when", () => {
  const add1 = (n: number) => n + 1
  const whenFraction = U.when(U.isFraction)
  const whenUnitless = U.when(U.isUnitless)

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
  expect(U.addPx(0)).toBe(0)
  expect(U.addPx(1)).toBe("1px")
  expect(U.addPx("2em")).toBe("2em")
})

test("addPc", () => {
  expect(U.addPc(0)).toBe(0)
  expect(U.addPc(1)).toBe(1)
  expect(U.addPc(0.15)).toBe("15%")
  expect(U.addPc(3 / 4)).toBe("75%")
  expect(U.addPc("2em")).toBe("2em")
})

test("addPcOrPx", () => {
  expect(U.addPcOrPx(0)).toBe(0)

  expect(U.addPcOrPx(0.1)).toBe("10%")
  expect(U.addPcOrPx(0.5)).toBe("50%")
  expect(U.addPcOrPx(3 / 4)).toBe("75%")

  expect(U.addPcOrPx(1)).toBe("1px")
  expect(U.addPcOrPx(2)).toBe("2px")

  expect(U.addPcOrPx(-1)).toBe("-1px")
  expect(U.addPcOrPx(-2)).toBe("-2px")

  expect(U.addPcOrPx("1em")).toBe("1em")
  expect(U.addPcOrPx("2vw")).toBe("2vw")
})

test("mq", () => {
  expect(U.mq(320)).toMatchSnapshot()
  expect(U.mq("20rem")).toMatchSnapshot()
})

test("toPath", () => {
  expect(U.toPath(0)).toEqual([0])
  expect(U.toPath(1)).toEqual([1])
  expect(U.toPath("a")).toEqual(["a"])
  expect(U.toPath("a.b")).toEqual(["a", "b"])
  expect(U.toPath("a.1")).toEqual(["a", "1"])
})

test("get", () => {
  // Undefined
  expect(U.get()).toBeUndefined()
  expect(U.get("foo")).toBeUndefined()
  expect(U.get("zoo", H.fixture)).toBeUndefined()
  expect(U.get("foo.a", H.fixture)).toBeUndefined()

  // Resolve
  expect(U.get("foo", H.fixture)).toBe(H.fixture.foo)
  expect(U.get("bar", H.fixture)).toBe(H.fixture.bar)
  expect(U.get("bar.a", H.fixture)).toBe(H.fixture.bar.a)
  expect(U.get("bar.b", H.fixture)).toBe(H.fixture.bar.b)
  expect(U.get("bar.c", H.fixture)).toBe(H.fixture.bar.c)
  expect(U.get("bar.d", H.fixture)).toBe(H.fixture.bar.d)
  expect(U.get("bar.d.1", H.fixture)).toBe(H.fixture.bar.d[1])

  // Aliases
  expect(U.get("baz.0", H.fixture)).toBeUndefined()
  expect(U.get("baz.A0", H.fixture)).toBeUndefined()
  expect(U.get("baz.1", H.fixture)).toBe(H.fixture.baz[1]) // { value: "V1" }
  expect(U.get("baz.A1", H.fixture)).toBeUndefined()
  expect(U.get("baz.2", H.fixture)).toBe("V2")
  expect(U.get("baz.A2", H.fixture)).toBe("V2")
  expect(U.get("baz.3", H.fixture)).toBe(0)
  expect(U.get("baz.A3", H.fixture)).toBe(0)
  expect(U.get("baz.4", H.fixture)).toBe("V4")
  expect(U.get("baz.A4", H.fixture)).toBeUndefined()
  expect(U.get("baz.5", H.fixture)).toBe(0)
  expect(U.get("baz.A5", H.fixture)).toBeUndefined()
})

test("resolve", () => {
  // Null
  expect(U.resolve()).toBeNull()
  expect(U.resolve([])).toBeNull()
  expect(U.resolve([], H.fixture)).toBeNull()
  expect(U.resolve(["zoo"], H.fixture)).toBeNull()
  expect(U.resolve(["foo.a"], H.fixture)).toBeNull()

  // Resolve
  expect(U.resolve(["foo"], H.fixture)).toBe(H.fixture.foo)
  expect(U.resolve(["bar"], H.fixture)).toBe(H.fixture.bar)
  expect(U.resolve(["bar.a"], H.fixture)).toBe(H.fixture.bar.a)
  expect(U.resolve(["bar.b"], H.fixture)).toBe(H.fixture.bar.b)
  expect(U.resolve(["bar.c"], H.fixture)).toBe(H.fixture.bar.c)
  expect(U.resolve(["bar.d"], H.fixture)).toBe(H.fixture.bar.d)
  expect(U.resolve(["bar.d.1"], H.fixture)).toBe(H.fixture.bar.d[1])

  // Priority
  expect(U.resolve(["foo", "bar"], H.fixture)).toBe(H.fixture.foo)
  expect(U.resolve(["bar", "foo"], H.fixture)).toBe(H.fixture.bar)

  // Fallback
  expect(U.resolve(["foo.a", "bar.a"], H.fixture)).toBe(H.fixture.bar.a)
  expect(U.resolve(["foo.a", "bar.e"], H.fixture)).toBeNull()

  // Aliases
  expect(U.resolve(["baz.0"], H.fixture)).toBeNull()
  expect(U.resolve(["baz.A0"], H.fixture)).toBeNull()
  expect(U.resolve(["baz.1"], H.fixture)).toBe(H.fixture.baz[1]) // { value: "V1" }
  expect(U.resolve(["baz.A1"], H.fixture)).toBeNull()
  expect(U.resolve(["baz.2"], H.fixture)).toBe("V2")
  expect(U.resolve(["baz.A2"], H.fixture)).toBe("V2")
  expect(U.resolve(["baz.3"], H.fixture)).toBe(0)
  expect(U.resolve(["baz.A3"], H.fixture)).toBe(0)
  expect(U.resolve(["baz.4"], H.fixture)).toBe("V4")
  expect(U.resolve(["baz.A4"], H.fixture)).toBeNull()
  expect(U.resolve(["baz.5"], H.fixture)).toBe(0)
  expect(U.resolve(["baz.A5"], H.fixture)).toBeNull()
})
