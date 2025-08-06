import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,  // This will make it accessible on the local network
    port: 3000,  // You can change the port if needed
  },
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
      },
    },
  }
  
})
