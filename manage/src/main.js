import { createApp } from 'vue'
import App from './App.vue'
import { router,store } from './init'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
