import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for GitHub Pages (replace with repo name if different)
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : "/",
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    globals: true,
  },
  server: {
    proxy: {
      "/cnb": {
        target: "https://www.cnb.cz",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/cnb/, ""),
      },
    },
  },
});
