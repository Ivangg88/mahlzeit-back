/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/server/startServer.ts",
    "!src/server/index.ts",
    "!src/database/index.ts",
  ],
};
