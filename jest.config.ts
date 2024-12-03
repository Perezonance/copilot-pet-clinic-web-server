import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  testLocationInResults: true,
  testMatch: ["**/?(*.)+(test).[t]s?(x)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: ["node_modules", "dist"],
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]sx?$": [
      "babel-jest",
      {
        presets: ["@babel/preset-typescript", "@babel/preset-flow"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      },
    ],
  },
  // testRegex: "(/__tests__/.*|(\\.|/))(test|spec)\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
