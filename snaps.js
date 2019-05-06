const path = require("path")

const snapDir = path.resolve("snaps")
const testDir = path.resolve("tests")
const testExt = ".test.ts"

// https://jestjs.io/docs/en/configuration#snapshotresolver-string
module.exports = {
  testPathForConsistencyCheck: "test/file.test.ts",
  // resolves from test to snapshot path
  // test/file.test.ts > snap/file.snap
  resolveSnapshotPath: (testPath, snapExt) => {
    return testPath.replace(testDir, snapDir).replace(testExt, snapExt)
  },
  // resolves from snapshot to test path
  // snap/file.snap > test/file.test.ts
  resolveTestPath: (snapPath, snapExt) => {
    return snapPath.replace(snapDir, testDir).replace(snapExt, testExt)
  }
}
