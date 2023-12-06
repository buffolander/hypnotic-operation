module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
  projects: [
    '<rootDir>/apps/bff/jest.unit.config.js',
    '<rootDir>/apps/frontend/jest.unit.config.js',
  ],
  coverageDirectory: '<rootDir>/coverage/',
};
