import { createStore } from 'vuex'
import { darkTheme } from 'naive-ui'
import { buildRouter, buildPages, buildMenuOptions } from './navigation.js'
import { configuration,getAllAuthKeys } from './configuration.js'
// all auth keys
const ALL_AUTH_KEYS = getAllAuthKeys()

// init router
const router = buildRouter()

// init store
const store = createStore({
  state() {
    return {
      ifDark: false,
      menuOptions: [],
    }
  },
  getters: {
    getTheme(state) {
      const theme = state.ifDark ? darkTheme : null
      const themeOverrides = {
        common: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, PingFang SC, Noto Sans, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif',
        },
        Menu: {
          arrowColor: '#333639FF',
        },
      }
      return {
        theme,
        themeOverrides,
      }
    },
    getMenu(state) {
      return state.menuOptions
    },
  },
  mutations: {
    SET_IFDARK(state, bool) {
      state.ifDark = bool
    },
    SET_AUTH(state, AUTH_KEYS) {
      const pages = buildPages(configuration)
      pages.forEach((page) => {
        const removeRoute = router.addRoute('Layout', page)
        if (!AUTH_KEYS.includes(page.name)) {
          removeRoute()
        }
      })
      router.replace('/')
      state.menuOptions = buildMenuOptions(configuration, AUTH_KEYS)
    },
  },
  actions: {},
})

store.commit('SET_AUTH',ALL_AUTH_KEYS)

export { router, store }
