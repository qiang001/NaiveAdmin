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
} from './authorization'

import { pageConfig, getColors, themeOverrides } from './configuration'

const router = buildRouter()
app.use(router)

import { buildStore,storeKey } from './store'

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
app.use(store,storeKey)

// 其他权限 - 内容级&逻辑类 权限
initOtherPermissions(app, store)

app.mount('#app')
