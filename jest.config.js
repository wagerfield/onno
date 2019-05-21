module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        output: "reports/junit/results.xml",
        suiteNameTemplate: "{filepath}",
        classNameTemplate: "{filename}",
        titleTemplate: "{title}"
      }
    ]
  ],
  coverageReporters: ["lcov", "text"],
  coveragePathIgnorePatterns: ["test-utils"],
  snapshotResolver: "<rootDir>/snapshots",
  moduleNameMapper: {
    "^onno$": "<rootDir>/packages/onno/src"
  }
}
