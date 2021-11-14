import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/seamless/',
  plugins: [vue(), vueJsx({})],
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
