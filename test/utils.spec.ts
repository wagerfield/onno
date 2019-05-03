import * as U from "../src/utils"

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

test.only("get", () => {
  const obj = {
    foo: "FOO",
    bar: {
      a: "A",
      b: 0,
      c: false,
      d: [11, 22, 33]
    },
    baz: [
      {
        alias: "A0" // No value
      },
      {
        value: "V1" // No alias
      },
      {
        alias: "A2",
        value: "V2"
      },
      "V3" // Normal value
    ]
  }

  // Null
  expect(U.get()).toBeNull()
  expect(U.get([])).toBeNull()
  expect(U.get([], obj)).toBeNull()
  expect(U.get(["zoo"], obj)).toBeNull()
  expect(U.get(["foo.a"], obj)).toBeNull()

  // Resolve
  expect(U.get(["foo"], obj)).toBe(obj.foo)
  expect(U.get(["bar"], obj)).toBe(obj.bar)
  expect(U.get(["bar.a"], obj)).toBe(obj.bar.a)
  expect(U.get(["bar.b"], obj)).toBe(obj.bar.b)
  expect(U.get(["bar.c"], obj)).toBe(obj.bar.c)
  expect(U.get(["bar.d"], obj)).toBe(obj.bar.d)
  expect(U.get(["bar.d.1"], obj)).toBe(obj.bar.d[1])

  // Priority
  expect(U.get(["foo", "bar"], obj)).toBe(obj.foo)
  expect(U.get(["bar", "foo"], obj)).toBe(obj.bar)

  // Fallback
  expect(U.get(["foo.a", "bar.a"], obj)).toBe(obj.bar.a)
  expect(U.get(["foo.a", "bar.e"], obj)).toBeNull()

  // Aliases
  expect(U.get(["baz.0"], obj)).toBeNull()
  expect(U.get(["baz.A0"], obj)).toBeNull()
  expect(U.get(["baz.1"], obj)).toBe(obj.baz[1]) // { value: "V1" }
  expect(U.get(["baz.A1"], obj)).toBeNull()
  expect(U.get(["baz.2"], obj)).toBe("V2")
  expect(U.get(["baz.A2"], obj)).toBe("V2")
  expect(U.get(["baz.3"], obj)).toBe("V3")
  expect(U.get(["baz.A3"], obj)).toBeNull()
})
