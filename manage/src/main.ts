import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { buildRouter, initOtherPermissions } from './authorization'

const router = buildRouter()
app.use(router)

import { buildStore } from './store'
import { storeKey } from '@/hooks/useStore'

const store = buildStore(router)
app.use(store, storeKey)

// 其他权限 - 内容级&逻辑类 权限
initOtherPermissions(app, store)

app.mount('#app')
