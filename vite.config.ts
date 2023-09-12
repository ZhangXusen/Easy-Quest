/*
 * @Description:
 * @Version: 1.0
 * @Author: 小国际
 * @Date: 2023-08-29 14:15:38
 * @LastEditors: 小国际
 * @LastEditTime: 2023-09-02 21:31:13
 */
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
});
