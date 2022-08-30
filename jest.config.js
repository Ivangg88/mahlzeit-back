/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.tsx",
    "src/**/*.ts",
    "!src/index.tsx",
    "!src/index.ts",
    "!src/loadEnvironment.ts",
    "!src/server/startServer.ts",
    "!src/react-app-env.d.ts",
    "!src/reportWebVitals.ts",
  ],
};
