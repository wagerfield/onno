import * as U from "../src/utils"

test("isNil", () => {
  expect(U.isNil(undefined)).toBe(true)
  expect(U.isNil(null)).toBe(true)
  expect(U.isNil(0)).toBe(false)
})

test("addUnit", () => {
  const addFoo = U.addUnit("foo")
  expect(addFoo(1)).toBe("1foo")
  expect(addFoo("1")).toBe("1")
  expect(addFoo("5%")).toBe("5%")
  expect(addFoo(0)).toBe(0)
  expect(addFoo(-1)).toBe("-1foo")
})

test("addPx", () => {
  expect(U.addPx(1)).toBe("1px")
})

test("addPc", () => {
  expect(U.addPc(1)).toBe("1%")
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

test("hasPath", () => {
  const foo = { a: { b: [1, 2, 3] } }
  expect(U.hasPath(["a"])(foo)).toBe(true)
  expect(U.hasPath(["a", "b"])(foo)).toBe(true)
  expect(U.hasPath(["a", "b", "0"])(foo)).toBe(true)
  expect(U.hasPath(["a", "b", "1"])(foo)).toBe(true)
  expect(U.hasPath(["a", "b", "2"])(foo)).toBe(true)
  expect(U.hasPath(["a", "b", "3"])(foo)).toBe(false)
  expect(U.hasPath(["x"])(foo)).toBe(false)
  expect(U.hasPath([])(foo)).toBe(false)
})

test("path", () => {
  const foo = { a: { b: [1, 2, 3] } }
  expect(U.path([])(foo)).toBe(foo)
  expect(U.path(["a"])(foo)).toBe(foo.a)
  expect(U.path(["a", "b"])(foo)).toBe(foo.a.b)
  expect(U.path(["a", "b", "0"])(foo)).toBe(foo.a.b[0])
  expect(U.path(["a", "b", "1"])(foo)).toBe(foo.a.b[1])
  expect(U.path(["a", "b", "2"])(foo)).toBe(foo.a.b[2])
  expect(U.path(["a", "b", "3"])(foo)).toBeUndefined()
  expect(U.path(["a", "c"])(foo)).toBeUndefined()
  expect(U.path(["x"])(foo)).toBeUndefined()
})

test("pathOr", () => {
  const fallback = "N/A"
  const na = U.pathOr(fallback)

  expect(na([])({})).toBe(fallback)

  expect(na(["a"])({})).toBe(fallback)
  expect(na(["a"])({ a: 1 })).toBe(1)

  expect(na(["a", "b"])({ a: 1 })).toBe(fallback)
  expect(na(["a", "b"])({ a: { b: 2 } })).toBe(2)

  expect(na(["a", "1"])({ a: [1] })).toBe(fallback)
  expect(na(["a", "1"])({ a: [1, 2] })).toBe(2)

  expect(na(["a", 1])({ a: [1] })).toBe(fallback)
  expect(na(["a", 1])({ a: [1, 2] })).toBe(2)
})

test("getKey", () => {
  const obj = {
    foo: "FOO",
    bar: {
      a: "A",
      b: [11, 22, 33]
    }
  }

  expect(U.getKey(obj)).toBeUndefined()
  expect(U.getKey(obj, ["baz"])).toBeUndefined()
  expect(U.getKey(obj, ["foo"])).toBe("foo")
  expect(U.getKey(obj, ["bar"])).toBe("bar")
  expect(U.getKey(obj, ["foo", "bar"])).toBe("foo")
  expect(U.getKey(obj, ["bar", "foo"])).toBe("bar")
  expect(U.getKey(obj, ["bar.a", "foo"])).toBe("bar.a")
  expect(U.getKey(obj, ["bar.b", "foo"])).toBe("bar.b")
  expect(U.getKey(obj, ["bar.b.0", "foo"])).toBe("bar.b.0")
  expect(U.getKey(obj, ["bar.b.2", "foo"])).toBe("bar.b.2")
  expect(U.getKey(obj, ["bar.b.3", "foo"])).toBe("foo")
})

test("getValue", () => {
  const obj = {
    foo: "FOO",
    bar: {
      a: "A",
      b: [11, 22, 33]
    }
  }

  expect(U.getValue(obj)).toBeUndefined()
  expect(U.getValue(obj, ["baz"])).toBeUndefined()
  expect(U.getValue(obj, ["foo"])).toBe(obj.foo)
  expect(U.getValue(obj, ["bar"])).toBe(obj.bar)
  expect(U.getValue(obj, ["foo", "bar"])).toBe(obj.foo)
  expect(U.getValue(obj, ["bar", "foo"])).toBe(obj.bar)
  expect(U.getValue(obj, ["bar.a", "foo"])).toBe(obj.bar.a)
  expect(U.getValue(obj, ["bar.b", "foo"])).toBe(obj.bar.b)
  expect(U.getValue(obj, ["bar.b.0", "foo"])).toBe(obj.bar.b[0])
  expect(U.getValue(obj, ["bar.b.2", "foo"])).toBe(obj.bar.b[2])
  expect(U.getValue(obj, ["bar.b.3", "foo"])).toBe(obj.foo)
})
