module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    "prettier/prettier": `error`,
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used" }]
  }
};
