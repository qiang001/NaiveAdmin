import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import {
  buildRouter,
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
  initOtherPermissions,
} from './authorization.js'

import { pageConfig, getColors, themeOverrides } from './configuration.js'

import { buildStore } from './store.js'

const router = buildRouter()
app.use(router)

const store = buildStore({
  // 初始路由
  router,
  // 添加权限路由 - 页面级权限
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
  pageConfig,
  // 主题配色相关
  getColors,
  themeOverrides,
})
app.use(store)

// 其他权限 - 内容级&逻辑类 权限
initOtherPermissions(app, store)

app.mount('#app')
