# CELLO Functions

## CONTRIBUTION

Get started with following command.

```sh
git clone git@github.com:hal-tokyo-cello/cello-functions.git
cd cello-functions
npm install
```

Test code

```sh
npx jest test
```

### vscode

Recommended extensions other than workspace recommendation.

- `oderwat.indent-rainbow`

Recommended user settings

```json
{
  "files.autoSave": "onFocusChange",
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true
  },
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "*.vue": "${capture}.test.ts, ${capture}.test.js",
    "*.ts": "${capture}.test.ts, ${capture}.d.ts",
    "*.js": "${capture}.js, ${capture}.js.map, ${capture}.d.ts, ${capture}. d.ts.map",
    "tsconfig.json": "tsconfig.*.json",
    "package.json": "package-lock.json, yarn.lock, pnpm-lock.yaml"
  },
  "conventionalCommits.autoCommit": false,
  "jest.autoRun": "off"
}
```
