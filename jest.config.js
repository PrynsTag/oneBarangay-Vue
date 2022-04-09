module.exports = {
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  snapshotSerializers: [
    "jest-serializer-vue",
  ],
  testMatch: [
    "**/unit/**/*.spec.(js|jsx|ts|tsx)",
  ],
  testURL: "http://localhost/",
  transform: {
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
};
