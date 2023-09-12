/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 14:15:38
 * @LastEditors: 小国际
 * @LastEditTime: 2023-08-29 15:59:46
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: ["@typescript-eslint/parser", ""],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-refresh", "prettier", "react", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    
  },
};
