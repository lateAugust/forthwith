module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    uni: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
    getCurrentPages: 'readonly',
    __wxConfig: 'readonly'
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier', 'plugin:json/recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {}
};
