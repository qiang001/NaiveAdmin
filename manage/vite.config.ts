import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/seamless/',
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: require('path').resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    proxy: {
      '/api': 'https://www.hi-otter.com/seamless',
    },
  },
})
