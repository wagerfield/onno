import * as O from "../../src"
import * as U from "../test-utils"

test("alignContent", () => {
  const testProps = U.snapshot(O.alignContent)
  testProps({ alignContent: "space-around" })
  testProps({ alc: "space-between" })
})

test("alignItems", () => {
  const testProps = U.snapshot(O.alignItems)
  testProps({ alignItems: "stretch" })
  testProps({ ali: "center" })
})

test("alignSelf", () => {
  const testProps = U.snapshot(O.alignSelf)
  testProps({ alignSelf: "flex-start" })
  testProps({ als: "flex-end" })
})

test("justifyContent", () => {
  const testProps = U.snapshot(O.justifyContent)
  testProps({ justifyContent: "space-around" })
  testProps({ jfc: "space-between" })
})

test("justifyItems", () => {
  const testProps = U.snapshot(O.justifyItems)
  testProps({ justifyItems: "stretch" })
  testProps({ jfi: "center" })
})

test("justifySelf", () => {
  const testProps = U.snapshot(O.justifySelf)
  testProps({ justifySelf: "flex-start" })
  testProps({ jfs: "flex-end" })
})

test("placeContent", () => {
  const testProps = U.snapshot(O.placeContent)
  testProps({ placeContent: "space-around" })
  testProps({ plc: "space-between" })
})

test("placeItems", () => {
  const testProps = U.snapshot(O.placeItems)
  testProps({ placeItems: "stretch" })
  testProps({ pli: "center" })
})

test("placeSelf", () => {
  const testProps = U.snapshot(O.placeSelf)
  testProps({ placeSelf: "flex-start" })
  testProps({ pls: "flex-end" })
})

test("order", () => {
  const testProps = U.snapshot(O.order)
  testProps({ order: 1 })
  testProps({ ord: 2 })
})
