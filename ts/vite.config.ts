import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
      preact(), 
      tailwindcss(), 
      svgr()
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src")
    },
  },
});
