import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true  
  },
  server: {
      port: 7376,
      proxy: {
          "/api": {
          target: "http://localhost:7666",
          changeOrigin: true,
        },
      },
  },
  plugins: [
      preact(), 
      tailwindcss(), 
      svgr()
  ],
  envDir: resolve(import.meta.dirname, ".."),
  resolve: {
    alias: {
        "@": resolve(import.meta.dirname, "./src"),
        "react": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime"
    },
  },
});
