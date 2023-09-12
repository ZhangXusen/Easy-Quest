/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 14:25:07
 * @LastEditors: 小国际
 * @LastEditTime: 2023-08-29 17:15:48
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Path to the Tremor module
    // "./node_modules/@tremor/**/*.{js,ts/,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  //消除, antd button与 tailwind冲突的问题
  corePlugins: {
    preflight: false,
  },
};
