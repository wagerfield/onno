import * as S from "../src"
import * as U from "./test-utils"

test("display", () => {
  const testProps = U.snapshot(S.display)
  testProps({ display: "block" })
  testProps({ d: "inline" })
})

test("width", () => {
  const testProps = U.snapshot(S.width)
  testProps({ width: 1 })
  testProps({ w: 1 / 4 })
})

test("minWidth", () => {
  const testProps = U.snapshot(S.minWidth)
  testProps({ minWidth: "80vw" })
  testProps({ minw: 2 })
})

test("maxWidth", () => {
  const testProps = U.snapshot(S.maxWidth)
  testProps({ maxWidth: 4 })
  testProps({ maxw: -1 })
})

test("height", () => {
  const testProps = U.snapshot(S.height)
  testProps({ height: 0 })
  testProps({ h: "200%" })
})

test("minHeight", () => {
  const testProps = U.snapshot(S.minHeight)
  testProps({ minHeight: 8 })
  testProps({ minh: "40em" })
})

test("maxHeight", () => {
  const testProps = U.snapshot(S.maxHeight)
  testProps({ maxHeight: 10 })
  testProps({ maxh: 100 })
})

test("size", () => {
  const testProps = U.snapshot(S.size)
  testProps({ size: 6 })
  testProps({ s: 1 })
})

test("verticalAlign", () => {
  const testProps = U.snapshot(S.verticalAlign)
  testProps({ verticalAlign: "baseline" })
  testProps({ va: "middle" })
})

test("layout", () => {
  const testProps = U.snapshot(S.layout)
  testProps({
    display: "flex",
    width: 150,
    minWidth: 1 / 2,
    maxWidth: 3 / 4,
    height: 2,
    minHeight: "100vh",
    maxHeight: "auto",
    size: 0.25,
    verticalAlign: "sub"
  })
  testProps({
    d: "grid",
    w: 0.4,
    minw: "20em",
    maxw: "40ch",
    h: 8,
    minh: "50%",
    maxh: "100",
    s: 1,
    va: "super"
  })
})
