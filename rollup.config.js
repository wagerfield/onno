import typescript from "rollup-plugin-typescript"

export default {
  input: "src/index.ts",
  output: [
    {
      file: "cjs/index.js",
      format: "cjs"
    },
    {
      file: "esm/index.js",
      format: "esm"
    }
  ],
  plugins: [typescript()]
}
