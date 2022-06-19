module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  testMatch: ["**/?(*.)+(test).+(ts)"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
};
