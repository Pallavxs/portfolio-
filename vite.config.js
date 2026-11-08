import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dedicated port to avoid collisions with other running projects
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    host: true
  }
})
