import * as T from "../src/types"
import * as S from "../src/style"

export const style = (options?: Partial<T.StyleOptions>) =>
  S.style({
    propsKeys: ["a", "b", "c"],
    styleKeys: ["x", "y", "z"],
    themeKeys: ["t", "u", "v"],
    ...options
  })
