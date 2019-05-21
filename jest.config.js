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
        classNameTemplate: "{title}",
        titleTemplate: "{title}"
      }
    ]
  ],
  coverageReporters: ["text", "html"],
  coveragePathIgnorePatterns: ["test-utils"],
  snapshotResolver: "<rootDir>/snapshots",
  moduleNameMapper: {
    "^onno$": "<rootDir>/packages/onno/src"
  }
}
