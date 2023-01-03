export default {
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reporters: ['default'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.spec.(ts|tsx)$',
  testTimeout: 60000,
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' }
};
