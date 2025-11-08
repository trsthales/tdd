// @ts-nocheck
module.exports = {
  root: true,
  env: { es2021: true, node: true },
  parserOptions: { ecmaVersion: 2021, sourceType: 'module', project: null },
  plugins: ['unused-imports'],
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    'no-console': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'off',
  },
  ignorePatterns: ['dist', 'node_modules'],
};