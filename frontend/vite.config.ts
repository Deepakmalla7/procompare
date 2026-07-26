import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// React dev server on :3000; the FastAPI backend stays on :8000.
// All /api and data-loading calls are proxied to the backend (no CORS issues).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
      '/upload': { target: 'http://localhost:8000', changeOrigin: true },
      '/status': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
  build: { outDir: 'dist' },
})
