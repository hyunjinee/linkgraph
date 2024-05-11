module.exports = {
  'packages/service/**/*.+(ts|tsx)': [() => 'pnpm tsc -p packages/service/tsconfig.json --noEmit'],
};
