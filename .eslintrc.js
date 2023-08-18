/*
 * @Author: berg yu
 * @Date: 2023-08-15 11:26:42
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-15 14:10:37
 * @Description: 请填写简介
 */
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-console': 'off',
    // "comma-dangle": [2, "never"], //禁止使用拖尾逗号
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  }
}
