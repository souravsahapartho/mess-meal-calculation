import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // In dev server, use '/' so http://localhost:3000/ loads directly
  // In production build, use './' relative paths so it loads cleanly on GitHub Pages (/mess-meal-calculation/) without path breakage
  base: command === 'serve' ? '/' : './',
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
}))
