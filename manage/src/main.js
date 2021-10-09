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
app.directive('permission', {
  beforeMount(el, binding) {
    if (binding.arg == 'logic') {
      const key = Object.keys(binding.modifiers).join()
      el.addEventListener('click', () => {
        if (
          !store.state.logicAuths.includes(key) &&
          store.state.userInfo.name !== '超级管理员'
        ) {
          return $message.error('没有对应的操作许可权限')
        }
        const callback = binding.value
        callback()
      })
    }
  },
  mounted(el, binding) {
    if (binding.arg == 'content') {
      if (
        !store.state.contentAuths.includes(binding.value) &&
        store.state.userInfo.name !== '超级管理员'
      ) {
        el.parentNode.removeChild(el)
      }
    }
  },
})
app.mount('#app')
