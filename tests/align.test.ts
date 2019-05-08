import * as S from "../src"
import * as U from "./test-utils"

test("alignContent", () => {
  const testProps = U.snapshot(S.alignContent)
  testProps({ alignContent: "space-around" })
  testProps({ alc: "space-between" })
})

test("alignItems", () => {
  const testProps = U.snapshot(S.alignItems)
  testProps({ alignItems: "stretch" })
  testProps({ ali: "center" })
})

test("alignSelf", () => {
  const testProps = U.snapshot(S.alignSelf)
  testProps({ alignSelf: "flex-start" })
  testProps({ als: "flex-end" })
})

test("justifyContent", () => {
  const testProps = U.snapshot(S.justifyContent)
  testProps({ justifyContent: "space-around" })
  testProps({ jfc: "space-between" })
})

test("justifyItems", () => {
  const testProps = U.snapshot(S.justifyItems)
  testProps({ justifyItems: "stretch" })
  testProps({ jfi: "center" })
})

test("justifySelf", () => {
  const testProps = U.snapshot(S.justifySelf)
  testProps({ justifySelf: "flex-start" })
  testProps({ jfs: "flex-end" })
})

test("placeContent", () => {
  const testProps = U.snapshot(S.placeContent)
  testProps({ placeContent: "space-around" })
  testProps({ plc: "space-between" })
})

test("placeItems", () => {
  const testProps = U.snapshot(S.placeItems)
  testProps({ placeItems: "stretch" })
  testProps({ pli: "center" })
})

test("placeSelf", () => {
  const testProps = U.snapshot(S.placeSelf)
  testProps({ placeSelf: "flex-start" })
  testProps({ pls: "flex-end" })
})

test("order", () => {
  const testProps = U.snapshot(S.order)
  testProps({ order: 1 })
  testProps({ ord: 2 })
})
