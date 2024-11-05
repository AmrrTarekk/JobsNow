export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    // Mock SCSS modules
    "\\.module\\.(css|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transformIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
};
