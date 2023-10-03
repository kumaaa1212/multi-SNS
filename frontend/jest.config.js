// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})

const customeJestConfig = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/.node_modules/'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jsdom',
}

module.exports = createJestConfig(customeJestConfig)
