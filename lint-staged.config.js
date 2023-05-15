module.exports = {
  "packages/frontend/**/*.+(ts|tsx)": [
    () => "yarn tsc -p packages/frontend/tsconfig.json --noEmit",
  ],
}
