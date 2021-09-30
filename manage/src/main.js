import { createApp } from 'vue'
import App from './App.vue'
import { buildRouter } from './navigation.js'
import { buildStore } from './store.js'
// init router
const router = buildRouter()
// init store
const store = buildStore(router)

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
