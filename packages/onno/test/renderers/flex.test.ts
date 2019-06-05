import * as O from "../../src"
import * as U from "../test-utils"

test("flex", () => {
  const testProps = U.snapshot(O.flex)
  testProps({ flex: "0 0 auto" })
  testProps({ fx: "1 1 auto" })
})

test("flexBasis", () => {
  const testProps = U.snapshot(O.flexBasis)
  testProps({ flexBasis: "available" })
  testProps({ fxb: "content" })
})

test("flexGrow", () => {
  const testProps = U.snapshot(O.flexGrow)
  testProps({ flexGrow: 0 })
  testProps({ fxg: 1 })
})

test("flexShrink", () => {
  const testProps = U.snapshot(O.flexShrink)
  testProps({ flexShrink: 0 })
  testProps({ fxs: 1 })
})

test("flexFlow", () => {
  const testProps = U.snapshot(O.flexFlow)
  testProps({ flexFlow: "column" })
  testProps({ fxf: "nowrap" })
})

test("flexDirection", () => {
  const testProps = U.snapshot(O.flexDirection)
  testProps({ flexDirection: "row" })
  testProps({ fxd: "column-reverse" })
})

test("flexWrap", () => {
  const testProps = U.snapshot(O.flexWrap)
  testProps({ flexWrap: "nowrap" })
  testProps({ fxw: "wrap" })
})

test("flexParentSet", () => {
  const testProps = U.snapshot(O.flexParentSet)
  testProps({
    display: "flex",
    alignItems: "center",
    alignContent: "flex-end",
    justifyItems: "stretch",
    justifyContent: "space-evenly",
    flexFlow: "row nowrap",
    flexDirection: "column",
    flexWrap: "wrap"
  })
  testProps({
    d: "inline-flex",
    ali: "start",
    alc: "flex-start",
    jfi: "center",
    jfc: "space-around",
    fxf: "column wrap",
    fxd: "row",
    fxw: "nowrap"
  })
})

test("flexChildSet", () => {
  const testProps = U.snapshot(O.flexChildSet)
  testProps({
    alignSelf: "flex-start",
    justifySelf: "flex-end",
    order: 3,
    flex: "1 0 auto",
    flexBasis: "fit-content",
    flexGrow: 0,
    flexShrink: 1
  })
  testProps({
    als: "center",
    jfs: "baseline",
    ord: 5,
    fx: "0 1 min-content",
    fxb: "available",
    fxg: 1,
    fxs: 0
  })
})

test("flexSet", () => {
  const testProps = U.snapshot(O.flexSet)
  testProps({
    display: "flex",
    alignItems: "center",
    alignContent: "flex-end",
    justifyItems: "stretch",
    justifyContent: "space-evenly",
    flexFlow: "row nowrap",
    flexDirection: "column",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    justifySelf: "flex-end",
    order: 3,
    flex: "1 0 auto",
    flexBasis: "fit-content",
    flexGrow: 0,
    flexShrink: 1
  })
  testProps({
    d: "inline-flex",
    ali: "start",
    alc: "flex-start",
    jfi: "center",
    jfc: "space-around",
    fxf: "column wrap",
    fxd: "row",
    fxw: "nowrap",
    als: "center",
    jfs: "baseline",
    ord: 5,
    fx: "0 1 min-content",
    fxb: "available",
    fxg: 1,
    fxs: 0
  })
})
