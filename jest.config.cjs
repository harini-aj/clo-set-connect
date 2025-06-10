/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  }
};
