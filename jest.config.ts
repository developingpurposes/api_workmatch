/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", //arquivos .ts .js .tsx
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  modulePathIgnorePatterns: ["mocks"],
};
