import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: served from /employee-cabinet/
export default defineConfig({
  base: '/employee-cabinet/',
  plugins: [react(), tailwindcss()],
  server: { port: 5212 },
})
