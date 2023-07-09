module.exports = {
  'packages/service/**/*.+(ts|tsx)': [() => 'yarn tsc -p packages/service/tsconfig.json --noEmit'],
};
