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
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100
    }
  },
  snapshotResolver: "<rootDir>/snapshots",
  moduleNameMapper: {
    "^onno$": "<rootDir>/packages/onno/src"
  }
}
