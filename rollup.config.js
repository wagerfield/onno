import typescript from "rollup-plugin-typescript"
import { resolve } from "path"
import { sync } from "glob"

export default sync("packages/*").map((pkg) => ({
  input: resolve(pkg, "src/index.ts"),
  output: [
    {
      file: resolve(pkg, "cjs/index.js"),
      format: "cjs"
    },
    {
      file: resolve(pkg, "esm/index.js"),
      format: "esm"
    }
  ],
  plugins: [typescript()]
}))
