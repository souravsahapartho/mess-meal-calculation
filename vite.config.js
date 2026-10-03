import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Exact GitHub Pages base path ensures 100% reliable asset resolution
  base: '/mess-meal-calculation/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'vendor-export': ['jspdf', 'jspdf-autotable', 'html-to-image', 'canvas-confetti']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
