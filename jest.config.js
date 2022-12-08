module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: [
    "**/__tests__/**/*.(test).[jt]s?(x)",
    "**/?(*.)+(test).[jt]s?(x)",
  ],
  moduleNameMapper: {
    "^#root/(.*)": "<rootDir>/$1",
  },
  testTimeout: 15000,
  testPathIgnorePatterns: ["/dist/"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.d.ts",
    "!src/db/**/*.{js,ts}",
    "!src/generated/*.{js,ts}",
    "!src/utils/test/**/*.{js,ts}",
  ],
};
