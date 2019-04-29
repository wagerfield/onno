const gzipSize = require("gzip-size")
const glob = require("glob")

const getSize = (files) =>
  files.reduce((total, path) => {
    return total + gzipSize.fileSync(path)
  }, 0)

glob("lib/*.js", {}, (error, files) => {
  if (files) console.log(getSize(files))
})
