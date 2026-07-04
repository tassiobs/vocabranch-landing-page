import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BLOG_API = process.env.VITE_BLOG_API ?? "http://localhost:8004";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/blog-api": {
        target: BLOG_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-api/, ""),
      },
    },
  },
});
