import * as S from "../src"
import * as U from "./test-utils"

test("position", () => {
  const testProps = U.snapshot(S.position)
  testProps({ position: "relative" })
  testProps({ pos: "absolute" })
})

test("verticalAlign", () => {
  const testProps = U.snapshot(S.verticalAlign)
  testProps({ verticalAlign: "baseline" })
  testProps({ va: "middle" })
})

test("zIndex", () => {
  const testProps = U.snapshot(S.zIndex)
  testProps({ zi: 2 })
  testProps({
    zIndex: 2,
    theme: {
      zIndices: [10, 20, 30]
    }
  })
})

test("top", () => {
  const testProps = U.snapshot(S.top)
  testProps({ top: 1 / 2 })
  testProps({ t: 0 })
})

test("right", () => {
  const testProps = U.snapshot(S.right)
  testProps({ right: 8 })
  testProps({ r: "20rem" })
})

test("bottom", () => {
  const testProps = U.snapshot(S.bottom)
  testProps({ bottom: -100 })
  testProps({ b: "auto" })
})

test("left", () => {
  const testProps = U.snapshot(S.left)
  testProps({ left: 0.05 })
  testProps({ l: 4 })
})

test("width", () => {
  const theme = { widths: [10, 20, 30] }
  const testProps = U.snapshot(S.width)
  testProps({ width: 1 })
  testProps({ w: 1 / 4 })
  testProps({ w: 2, theme })
  testProps({ w: 3, theme })
})

test("minWidth", () => {
  const theme = { minWidths: [10, 20, 30] }
  const testProps = U.snapshot(S.minWidth)
  testProps({ minWidth: "80vw" })
  testProps({ minw: 2 })
  testProps({ minw: 2, theme })
  testProps({ minw: 3, theme })
})

test("maxWidth", () => {
  const theme = { maxWidths: [10, 20, 30] }
  const testProps = U.snapshot(S.maxWidth)
  testProps({ maxWidth: 4 })
  testProps({ maxw: -1 })
  testProps({ maxw: 2, theme })
  testProps({ maxw: 3, theme })
})

test("height", () => {
  const theme = { heights: [10, 20, 30] }
  const testProps = U.snapshot(S.height)
  testProps({ height: 0 })
  testProps({ h: "200%" })
  testProps({ h: 2, theme })
  testProps({ h: 3, theme })
})

test("minHeight", () => {
  const theme = { minHeights: [10, 20, 30] }
  const testProps = U.snapshot(S.minHeight)
  testProps({ minHeight: 8 })
  testProps({ minh: "40em" })
  testProps({ minh: 2, theme })
  testProps({ minh: 3, theme })
})

test("maxHeight", () => {
  const theme = { maxHeights: [10, 20, 30] }
  const testProps = U.snapshot(S.maxHeight)
  testProps({ maxHeight: 10 })
  testProps({ maxh: 100 })
  testProps({ maxh: 2, theme })
  testProps({ maxh: 3, theme })
})

test("size", () => {
  const theme = { sizes: [10, 20, 30] }
  const testProps = U.snapshot(S.size)
  testProps({ size: 6 })
  testProps({ s: 1 })
  testProps({ s: 2, theme })
  testProps({ s: 3, theme })
})

test("positionSet", () => {
  const testProps = U.snapshot(S.positionSet)
  testProps({
    position: "fixed",
    zIndex: 1,
    top: 0,
    right: 0.2,
    bottom: 1,
    left: "4rem"
  })
  testProps({
    pos: "absolute",
    zi: 2,
    t: 1,
    r: 2,
    b: 3,
    l: 4
  })
})

test("sizeSet", () => {
  const testProps = U.snapshot(S.sizeSet)
  testProps({
    size: 0.25,
    width: 150,
    minWidth: 1 / 2,
    maxWidth: 3 / 4,
    height: 2,
    minHeight: "100vh",
    maxHeight: "auto"
  })
  testProps({
    s: 1,
    w: 0.4,
    minw: "20em",
    maxw: "40ch",
    h: 8,
    minh: "50%",
    maxh: "100"
  })
})

test("layoutSet", () => {
  const testProps = U.snapshot(S.layoutSet)
  testProps({
    display: "flex",
    verticalAlign: "sub",
    position: "fixed",
    zIndex: 2,
    top: 0,
    right: 0.2,
    bottom: 60,
    left: "4rem",
    size: 0.25,
    width: 150,
    minWidth: 1 / 2,
    maxWidth: 3 / 4,
    height: 2,
    minHeight: "100vh",
    maxHeight: "auto"
  })
  testProps({
    d: "grid",
    va: "super",
    pos: "sticky",
    zi: 10,
    t: 1,
    r: 0.8,
    b: "auto",
    l: "5em",
    s: 1,
    w: 0.4,
    minw: "20em",
    maxw: "40ch",
    h: 8,
    minh: "50%",
    maxh: "100"
  })
})
