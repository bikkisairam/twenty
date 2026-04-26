module.exports = {
  displayName: 'pace-tests',
  preset: '../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../coverage/pace-tests',
  testMatch: ['**/__tests__/**/*.test.ts'],
};
