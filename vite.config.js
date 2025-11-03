import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/itunes': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/itunes/, ''),
      },
      '/api/radio': {
        target: 'https://de1.api.radio-browser.info',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/radio/, '/json/stations'),
      },
      '/api/picsum': {
        target: 'https://picsum.photos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/picsum/, '/v2/list'),
      },
    },
  },
})
