// https://jestjs.io/docs/en/configuration#snapshotresolver-string
module.exports = {
  testPathForConsistencyCheck: "some/file.test.ts",
  // resolves from test to snapshot path
  // some/file.test.ts > some/file.snap
  resolveSnapshotPath: (testPath, snapExt) => {
    return testPath.replace(".test.ts", snapExt)
  },
  // resolves from snapshot to test path
  // some/file.snap > some/file.test.ts
  resolveTestPath: (snapPath, snapExt) => {
    return snapPath.replace(snapExt, ".test.ts")
  }
}
