import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["apple-touch-icon.png"],
  manifest: {
    name: "2026 Summer Vegas Poker Events",
    short_name: "Vegas Poker",
    description: "A mobile-friendly guide to 2026 Summer Vegas poker events.",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
})
  ]
});