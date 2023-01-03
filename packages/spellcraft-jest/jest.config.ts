export default {
  coverageDirectory: '../reports/coverage',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/results' }]],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.spec.(ts|tsx)$',
  testTimeout: 60000,
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' }
};
