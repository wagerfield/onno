// https://jestjs.io/docs/en/configuration#snapshotresolver-string
module.exports = {
  testPathForConsistencyCheck: "some/file.spec.ts",
  // resolves from test to snapshot path
  // some/file.spec.ts > some/file.snap
  resolveSnapshotPath: (testPath, snapExt) => {
    return testPath.replace(".spec.ts", snapExt)
  },
  // resolves from snapshot to test path
  // some/file.snap > some/file.spec.ts
  resolveTestPath: (snapPath, snapExt) => {
    return snapPath.replace(snapExt, ".spec.ts")
  }
}
