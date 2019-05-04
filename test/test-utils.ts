import * as T from "../src/types"
import * as S from "../src/style"

export const style = (options?: Partial<T.StyleOptions>) =>
  S.style({
    propsKeys: ["a", "b", "c"],
    styleKeys: ["x", "y", "z"],
    themeKeys: ["t", "u", "v"],
    ...options
  })

export const snapshot = (func: T.Func) => (props: T.Props, label?: string) => {
  let snapshotName = JSON.stringify(props, null, 2)
  if (label) snapshotName = `[${label}] ${snapshotName}`
  expect(func(props)).toMatchSnapshot(snapshotName)
}

export const fixture = {
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
    {
      alias: "A3",
      value: 0
    },
    "V4", // Normal value
    0 // Falsey value
  ]
}
