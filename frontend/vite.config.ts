import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 🟢 EL PROXY MÁGICO: Todo lo que vaya a /api, Vite se lo pasará a Java
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // También pasamos las conexiones de WebSocket si las necesitas luego
      '/ws-invernadero': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      }
    }
  }
})