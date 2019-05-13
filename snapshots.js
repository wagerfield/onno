// https://jestjs.io/docs/en/configuration#snapshotresolver-string
module.exports = {
  testPathForConsistencyCheck: "test/file.test.ts",
  // resolves from test to snapshot path
  // test/file.test.ts > test/snapshots/file.snap
  resolveSnapshotPath: (testPath) => {
    return testPath.replace(/(\w+)\.test\.ts$/, "snapshots/$1.snap")
  },
  // resolves from snapshot to test path
  // test/snapshots/file.snap > test/file.test.ts
  resolveTestPath: (snapPath) => {
    return snapPath.replace(/snapshots\/(\w+)\.snap$/, "$1.test.ts")
  }
}
