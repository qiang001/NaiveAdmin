import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
const baseMap = {
  development: '/',
  production: '/seamless/',
}
export default defineConfig({
  base: baseMap[process.env.NODE_MODE],
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
