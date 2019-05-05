import * as I from "../src"

export interface TestProps extends I.ThemeProps {
  a?: any
  b?: any
  c?: any
}

export interface TestStyle extends I.Style {
  x: any
  y: any
  z: any
}

export function style<
  P extends I.ThemeProps = TestProps,
  S extends I.Style = TestStyle
>(options?: Partial<I.StyleOptions>) {
  return I.style<P, S>({
    propsKeys: ["a", "b", "c"],
    styleKeys: ["x", "y", "z"],
    themeKeys: ["t", "u", "v"],
    ...options
  })
}

export function snapshot<
  P extends I.ThemeProps = TestProps,
  S extends I.Style = TestStyle
>(fn: I.StyleFunction<P, S>) {
  return (props: P, label?: string) => {
    let snapshotName = JSON.stringify(props, null, 2)
    if (label) snapshotName = `[${label}] ${snapshotName}`
    expect(fn(props)).toMatchSnapshot(snapshotName)
  }
}

export const OBJ = {
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
