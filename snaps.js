// https://jestjs.io/docs/en/configuration#snapshotresolver-string

const snapDir = "snap"
const testDir = "test"
const testExt = ".test.ts"

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
