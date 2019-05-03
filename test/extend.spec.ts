import * as S from "../src/style"

test("returns style factory", () => {
  const s = S.extend({})
  expect(s).toEqual(expect.any(Function))
  expect(s).toHaveLength(1)
})
