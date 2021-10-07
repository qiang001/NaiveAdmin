import { watch, computed } from 'vue'
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

import request from '@/api/store.js'
const loginUser = async (data) => {
  try {
    let token = await request.post('/v1/users/login', data)
    $message.success('恭喜你，登录成功！')
    return token
  } catch (error) {
    $message.error(error)
  }
}
const getUserInfo = async (token) => {
  try {
    return await request.get('/v1/users/userInfo', {
      headers: { authorization: token },
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const buildStore = (router) => {
  const store = createStore({
    state() {
      return {
        mainColor: 'blue',
        ifDark: false,
        menuOptions: [],
        menuOptionsWithoutIcon: [],
        token: '',
        userInfo: null,
        authKeys: [],
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
        return searchOptions.filter((item) =>
          state.authKeys.some((key) => key == item.value)
        )
      },
    },
    mutations: {
      SET_MAINCOLOR(state, key) {
        state.mainColor = key
      },
      SET_IFDARK(state, bool) {
        state.ifDark = bool
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
      },
      SET_AUTH(state, AUTH_KEYS) {
        state.authKeys = [...AUTH_KEYS]
        const pages = buildPages(configuration)
        pages.forEach((page) => {
          const removeRoute = router.addRoute('Layout', page)
          if (!AUTH_KEYS.includes(page.name)) {
            removeRoute()
          }
        })
        state.menuOptions = buildMenuOptions(configuration, {
          AUTH_KEYS,
          ifHideIcon: false,
        })
        state.menuOptionsWithoutIcon = buildMenuOptions(configuration, {
          AUTH_KEYS,
          ifHideIcon: true,
        })
        prevent404()
      }
    },
    actions: {
      logout:({commit})=>{
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', '')
        commit('SET_AUTH', [])
        router.replace('/login?token=logout&message=三十六计走为上，溜了')
      },
      login: async ({ commit }, data) => {
        const token = await loginUser(data)
        if (!token) {
          return
        }
        commit('SET_TOKEN', token)
        const userInfo = await getUserInfo(token)
        commit('SET_USERINFO', userInfo)
        let authKeys = []
        if (userInfo.name == '超级管理员') {
          authKeys = ALL_AUTH_KEYS
        } else {
          authKeys = userInfo.roles.reduce((acc, cur) => {
            cur.pageAuths.forEach((key) => {
              acc = acc.includes(key) ? [...acc] : [...acc, key]
            })
            return acc
          }, [])
        }
        commit('SET_AUTH', authKeys)
        router.replace('/')
      },
      refreshLogin: async ({ commit }, token) => {
        try {
          commit('SET_TOKEN', token)
          const userInfo = await getUserInfo(token)
          commit('SET_USERINFO', userInfo)
          let authKeys = []
          if (userInfo.name == '超级管理员') {
            authKeys = ALL_AUTH_KEYS
          } else {
            authKeys = userInfo.roles.reduce((acc, cur) => {
              cur.pageAuths.forEach((key) => {
                acc = acc.includes(key) ? [...acc] : [...acc, key]
              })
              return acc
            }, [])
          }
          commit('SET_AUTH', authKeys)
          router.replace(router.currentRoute.value.fullPath)
        } catch (error) {
          commit('SET_TOKEN', '')
          commit('SET_AUTH', [])
          router.replace('/login?token=expired&message='+error.message)
        }
      },
    },
  })

  // 防止刷新404
  function prevent404 (){
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      redirect: {
        name: '404',
      },
    })
  }
  return store
}
