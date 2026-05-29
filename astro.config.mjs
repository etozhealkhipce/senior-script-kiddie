// @ts-check

import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  site: "https://sskd.tech",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["gsap", "@gsap/react"],
    },
  },
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
  image: {
    remotePatterns: [{ protocol: "https", hostname: "admin.sskd.tech" }],
  },
  trailingSlash: "never",
  build: {
    format: "file",
  },
});
