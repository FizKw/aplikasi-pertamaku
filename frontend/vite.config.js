import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/hafizh/',
  server:{
    watch:{
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },

})
