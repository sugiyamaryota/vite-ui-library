module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
      '^.+\\.module\\.(css)$':'<rootDir>/src/jest/cssTransform.js'
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        // '<rootDir>/src/__mocks__/fileMock.js',
    },
    testEnvironment: "jsdom",
  }
