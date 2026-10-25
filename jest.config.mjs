import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'components/**/*.tsx',
    'config/**/*.js',
    'helpers/**/*.ts',
    'hooks/**/*.ts',
    'pages/**/*.tsx',
    'redux/**/*.ts',
    'services/**/*.ts',
    'styles/shouldForwardProp.ts',
  ],
};

export default createJestConfig(config);
