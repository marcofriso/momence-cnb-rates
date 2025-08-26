import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
