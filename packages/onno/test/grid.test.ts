import * as O from "../src"
import * as U from "./test-utils"

test("grid", () => {
  const testProps = U.snapshot(O.grid)
  testProps({ grid: "foo" })
  testProps({ g: "bar" })
})

test("gridTemplate", () => {
  const testProps = U.snapshot(O.gridTemplate)
  testProps({ gridTemplate: "foo" })
  testProps({ gt: "bar" })
})

test("gridTemplateRows", () => {
  const testProps = U.snapshot(O.gridTemplateRows)
  testProps({ gridTemplateRows: "foo" })
  testProps({ gtr: "bar" })
})

test("gridTemplateColumns", () => {
  const testProps = U.snapshot(O.gridTemplateColumns)
  testProps({ gridTemplateColumns: "foo" })
  testProps({ gtc: "bar" })
})

test("gridTemplateAreas", () => {
  const testProps = U.snapshot(O.gridTemplateAreas)
  testProps({ gridTemplateAreas: "foo" })
  testProps({ gta: "bar" })
})

test("gridGap", () => {
  const testProps = U.snapshot(O.gridGap)
  testProps({ gridGap: 4 })
  testProps({ gg: 10 })
})

test("gridRowGap", () => {
  const testProps = U.snapshot(O.gridRowGap)
  testProps({ gridRowGap: 8 })
  testProps({ grg: 0 })
})

test("gridColumnGap", () => {
  const testProps = U.snapshot(O.gridColumnGap)
  testProps({ gridColumnGap: "1fr" })
  testProps({ gcg: "auto" })
})

test("gridAutoRows", () => {
  const testProps = U.snapshot(O.gridAutoRows)
  testProps({ gridAutoRows: "foo" })
  testProps({ gar: "bar" })
})

test("gridAutoColumns", () => {
  const testProps = U.snapshot(O.gridAutoColumns)
  testProps({ gridAutoColumns: "foo" })
  testProps({ gac: "bar" })
})

test("gridAutoFlow", () => {
  const testProps = U.snapshot(O.gridAutoFlow)
  testProps({ gridAutoFlow: "foo" })
  testProps({ gaf: "bar" })
})

test("gridArea", () => {
  const testProps = U.snapshot(O.gridArea)
  testProps({ gridArea: "foo" })
  testProps({ ga: "bar" })
})

test("gridRow", () => {
  const testProps = U.snapshot(O.gridRow)
  testProps({ gridRow: "foo" })
  testProps({ gr: "bar" })
})

test("gridRowStart", () => {
  const testProps = U.snapshot(O.gridRowStart)
  testProps({ gridRowStart: "foo" })
  testProps({ grs: "bar" })
})

test("gridRowEnd", () => {
  const testProps = U.snapshot(O.gridRowEnd)
  testProps({ gridRowEnd: "foo" })
  testProps({ gre: "bar" })
})

test("gridColumn", () => {
  const testProps = U.snapshot(O.gridColumn)
  testProps({ gridColumn: "foo" })
  testProps({ gc: "bar" })
})

test("gridColumnStart", () => {
  const testProps = U.snapshot(O.gridColumnStart)
  testProps({ gridColumnStart: "foo" })
  testProps({ gcs: "bar" })
})

test("gridColumnEnd", () => {
  const testProps = U.snapshot(O.gridColumnEnd)
  testProps({ gridColumnEnd: "foo" })
  testProps({ gce: "bar" })
})

test("gridParentSet", () => {
  const testProps = U.snapshot(O.gridParentSet)
  testProps({
    display: "grid",
    placeItems: "a",
    placeContent: "b",
    alignItems: "c",
    alignContent: "d",
    justifyItems: "e",
    justifyContent: "f",
    grid: "g",
    gridTemplate: "h",
    gridTemplateRows: "i",
    gridTemplateColumns: "j",
    gridTemplateAreas: "k",
    gridGap: "l",
    gridRowGap: "m",
    gridColumnGap: "n",
    gridAutoRows: "o",
    gridAutoColumns: "p",
    gridAutoFlow: "q"
  })
  testProps({
    d: "grid",
    pli: "a",
    plc: "b",
    ali: "c",
    alc: "d",
    jfi: "e",
    jfc: "f",
    g: "g",
    gt: "h",
    gtr: "i",
    gtc: "j",
    gta: "k",
    gg: "l",
    grg: "m",
    gcg: "n",
    gar: "o",
    gac: "p",
    gaf: "q"
  })
})

test("gridChildSet", () => {
  const testProps = U.snapshot(O.gridChildSet)
  testProps({
    placeSelf: "a",
    alignSelf: "b",
    justifySelf: "c",
    gridArea: "d",
    gridRow: "e",
    gridRowStart: "f",
    gridRowEnd: "g",
    gridColumn: "h",
    gridColumnStart: "i",
    gridColumnEnd: "j"
  })
  testProps({
    pls: "a",
    als: "b",
    jfs: "c",
    ga: "d",
    gr: "e",
    grs: "f",
    gre: "g",
    gc: "h",
    gcs: "i",
    gce: "j"
  })
})
