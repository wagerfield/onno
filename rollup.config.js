import prettier from "rollup-plugin-prettier"
import typescript from "rollup-plugin-typescript"
import { sizeSnapshot } from "rollup-plugin-size-snapshot"
import { sync } from "glob"
import { join } from "path"

export default sync("packages/*").map((pkg) => ({
  input: join(pkg, "src/index.ts"),
  output: [
    {
      file: join(pkg, "cjs/index.js"),
      format: "cjs"
    },
    {
      file: join(pkg, "esm/index.js"),
      format: "esm"
    }
  ],
  plugins: [
    typescript(),
    prettier({
      parser: "babel"
    }),
    sizeSnapshot({
      snapshotPath: "stats.json",
      printInfo: false
    })
  ]
}))
