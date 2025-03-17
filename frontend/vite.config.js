import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server:{
    allowedHosts: ['localhost', '127.0.0.1', 'knowing-terrier-sought.ngrok-free.app'],
  },
})
