import * as T from "../src/types"
import * as H from "./test-utils"

test("style supports themes", () => {
  const themeKeys = ["n.m.o", "t.u.v"]
  const fallback = ["F0", "F1", "F2"]
  const theme1 = {
    t: ["T0"],
    u: ["U0", "U1"]
  }
  const theme2 = {
    t: {
      u: {
        v: ["0V", "1V"]
      }
    }
  }

  const none = H.style()
  const fall = H.style({ fallback })
  const nest = H.style({ themeKeys })
  const fbns = H.style({ themeKeys, fallback })

  const testProps = (label: string, theme: any, props: T.Props) => {
    const stringProps = JSON.stringify(props)
    const snapshotName = (name: string) => `${name}[${label}]: ${stringProps}`
    expect(none({ ...props, theme })).toMatchSnapshot(snapshotName("none"))
    expect(fall({ ...props, theme })).toMatchSnapshot(snapshotName("fall"))
    expect(nest({ ...props, theme })).toMatchSnapshot(snapshotName("nest"))
    expect(fbns({ ...props, theme })).toMatchSnapshot(snapshotName("fbns"))
  }

  testProps("T1", theme1, { a: 0 })
  testProps("T1", theme1, { a: 1 })
  testProps("T1", theme1, { a: 2 })
  testProps("T1", theme1, { a: 3 })

  testProps("T2", theme2, { a: 0 })
  testProps("T2", theme2, { a: 1 })
  testProps("T2", theme2, { a: 2 })
  testProps("T2", theme2, { a: 3 })
})
