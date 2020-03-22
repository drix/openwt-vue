module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  moduleFileExtensions: [
      "js",
      "json",
      "vue"
  ],
  transform: {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.{js,vue}",
      "!**/node_modules/**"
  ],
  coverageReporters: [
      "html",
      "text-summary"
  ],
}
