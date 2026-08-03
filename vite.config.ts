import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Pre-compress text assets so static hosts (Netlify/Vercel/S3+CDN/nginx)
    // can serve Brotli/gzip without on-the-fly CPU cost. Generate both; the
    // origin/CDN negotiates via Accept-Encoding.
    viteCompression({ algorithm: "brotliCompress", ext: ".br", threshold: 1024 }),
    viteCompression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Eager shell. React + router + the animation library are needed on
          // first paint, so they ship as stable, long-cache vendor chunks.
          react: ["react", "react-dom", "react-router"],
          motion: ["framer-motion"],
          // Radix primitives power the always-mounted header + booking dialog.
          radix: ["@radix-ui/react-dialog", "@radix-ui/react-navigation-menu"],
          // Lenis drives the smooth-scroll shell.
          scroll: ["lenis"],
          // The form engine is only reached via a lazy boundary, so it splits
          // into its own async chunk fetched on demand.
          forms: ["react-hook-form", "zod", "@hookform/resolvers/zod"],
        },
      },
    },
  },
});
