import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'

const manifest: Partial<ManifestOptions> = {
  theme_color: "#8936FF",
  background_color: "#2EC6FE",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icons/icon512_maskable.png",
      type: "image/png"
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icons/icon512_rounded.png",
      type: "image/png"
    }
  ],
  screenshots: [
    {
      src: "screenshots/desktop.png",
      type: "image/png",
      sizes: "1920x917",
      form_factor: "wide"
    },
    {
      src: "screenshots/mobile.png",
      type: "image/png",
      sizes: "476x843",
      form_factor: "narrow"
    }
  ],
  orientation: "portrait",
  display: "standalone",
  lang: "ru-RU",
  name: "PWA Full Name",
  short_name: "PWA Short Name",
  start_url: "/"
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      base: './',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{html,css,js}'], // Указываем, какие ресурсы предкэшировать
      },
      manifest: manifest,
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
    })
  ],
})
