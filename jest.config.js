export default {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
   "reporters": [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Jest build Report",
            "outputPath": ".ci/reports/html/jest.html",
            "includeFailureMsg": true,
            "includeConsoleLog": true,
            "logo": "misc/img/gone.export.png",
            "sort": "executionAsc"
        }]
    ]
}
