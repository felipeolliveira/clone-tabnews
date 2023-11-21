const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: "./" })

module.exports = createJestConfig({
  globalSetup: '<rootDir>/tests/setup.ts'
});