const gzipSize = require("gzip-size")
const glob = require("glob")

const getStats = (pattern) => {
  return glob.sync(pattern).reduce((total, path) => {
    return total + gzipSize.fileSync(path)
  }, 0)
}

console.log("themed-system:", getStats("lib/*.js"))
console.log("styled-system:", getStats("tmp/styled-system.js"))
