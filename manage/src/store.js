import { createStore } from 'vuex'
import { darkTheme } from 'naive-ui'
import {
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
} from './navigation.js'
import { configuration, getColors, themeOverrides } from './configuration.js'
// menu auth tree
const menuAuthTree = buildMenuAuthTree(configuration)
// auth keys
const { ALL_AUTH_KEYS, HIDE_AUTH_KEYS, searchOptions } =
  getAuthKeys(configuration)

export const buildStore = (router) => {
  const store = createStore({
    state() {
      return {
        mainColor: 'blue',
        ifDark: false,
        menuOptions: [],
        menuOptionsWithoutIcon: [],
      }
    },
    getters: {
      getMainColors(state) {
        return Object.values(getColors(state.ifDark))
      },
      getTheme(state) {
        const theme = state.ifDark ? darkTheme : null
        const overrides = themeOverrides(state.mainColor, state.ifDark)
        return {
          theme,
          overrides,
        }
      },
      getMenu: (state) => (ifHideIcon) => {
        return !ifHideIcon ? state.menuOptions : state.menuOptionsWithoutIcon
      },
      getMenuAuthTree(state) {
        return menuAuthTree
      },
      getHideAuthKeys(state) {
        return HIDE_AUTH_KEYS
      },
      getSearchOptions(state) {
        return searchOptions
      },
    },
    mutations: {
      SET_MAINCOLOR(state, key) {
        state.mainColor = key
      },
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
        state.menuOptions = buildMenuOptions(configuration, {
          AUTH_KEYS,
          ifHideIcon: false,
        })
        state.menuOptionsWithoutIcon = buildMenuOptions(configuration, {
          AUTH_KEYS,
          ifHideIcon: true,
        })
      },
    },
    actions: {
      login({ commit }, data) {
        commit('SET_AUTH', ALL_AUTH_KEYS)
      },
    },
  })
  // 初始化权限
  let initAuth = ['Console']
  initAuth = ALL_AUTH_KEYS
  store.commit('SET_AUTH', initAuth)
  return store
}
