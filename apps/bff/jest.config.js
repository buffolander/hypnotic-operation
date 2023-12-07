const maxWorkers = 'JEST_MAX_WORKERS' in process.env ? Number(process.env.JEST_MAX_WORKERS) : 5;

const AnchorToRootDir = (s) => '<rootDir>/' + s;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  maxWorkers,
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  modulePathIgnorePatterns: [
    'dist',
    'node_modules',
    'test',
    'coverage',
  ].map(AnchorToRootDir),
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/__specs__/**',
    '!src/**/types/**',
    '!src/**/env/**',
    '!src/**/index.ts',
    '!src/**/types.ts',
  ],
  coverageReporters: [
    'html',
    'text',
    'text-summary',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  coverageDirectory: AnchorToRootDir('coverage'),
}
