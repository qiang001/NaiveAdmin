import { createStore } from 'vuex'
import { darkTheme } from 'naive-ui'
import {
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
} from './navigation.js'
import { pageConfig, getColors, themeOverrides } from './configuration.js'
// menu auth tree
const menuAuthTree = buildMenuAuthTree(pageConfig)
// auth keys
const { ALL_AUTH_KEYS, HIDE_AUTH_KEYS, searchOptions } = getAuthKeys(pageConfig)

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
        cacheList:[],
        menuOptions: [],
        menuOptionsWithoutIcon: [],
        token: '',
        userInfo: null,
        authKeys: [],
        contentAuths: [],
        logicAuths: [],
        loginPageMessage: {
          type: null,
          text: null,
        },
      }
    },
    getters: {
      getMainColors(state) {
        return Object.values(getColors(state.ifDark)).map((item) => ({
          ...item,
          checked: item.key == state.mainColor,
        }))
      },
      getTheme(state) {
        const theme = state.ifDark ? darkTheme : null
        const overrides = themeOverrides(state.mainColor, state.ifDark)
        return {
          theme,
          overrides,
        }
      },
      getCacheList(state){
        return state.cacheList
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
      REMOVE_CACHE(state,name){
        state.cacheList = state.cacheList.filter(n=>n!==name)
      },
      ADD_CACHE(state,name){
        !state.cacheList.includes(name) && state.cacheList.push(name)
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
      },
      SET_AUTH(state, AUTH_KEYS) {
        state.authKeys = [...AUTH_KEYS]
        const pages = buildPages(pageConfig)
        pages.forEach((page) => {
          const removeRoute = router.addRoute('Layout', page)
          if (!AUTH_KEYS.includes(page.name)) {
            removeRoute()
          }else{
            page.meta.ifCache && !state.cacheList.includes(page.name) && state.cacheList.push(page.name)
          }
        })
        state.menuOptions = buildMenuOptions(pageConfig, {
          AUTH_KEYS,
          ifHideIcon: false,
        })
        state.menuOptionsWithoutIcon = buildMenuOptions(pageConfig, {
          AUTH_KEYS,
          ifHideIcon: true,
        })
        prevent404()
      },
      SET_PERMISSION(state, data) {
        state.contentAuths = data.contentAuths
        state.logicAuths = data.logicAuths
      },
      CLEAR_LOGIN_MESSAGE(state) {
        state.loginPageMessage.type = null
        state.loginPageMessage.text = null
      },
      SET_LOGIN_MESSAGE(state, data) {
        state.loginPageMessage.type = data.type
        state.loginPageMessage.text = data.text
      },
    },
    actions: {
      logout: ({ commit }) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', '')
        commit('SET_AUTH', [])
        commit('SET_PERMISSION', { contentAuths: [], logicAuths: [] })
        commit('SET_LOGIN_MESSAGE', { type: 'success', text: '成功退出系统！' })
        router.replace('/login')
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
        let contentAuths = []
        let logicAuths = []
        if (userInfo.name == '超级管理员') {
          authKeys = ALL_AUTH_KEYS
        } else {
          const permission = userInfo.roles.reduce(
            (acc, cur) => {
              cur.pageAuths.forEach((key) => {
                acc.authKeys = acc.authKeys.includes(key)
                  ? [...acc.authKeys]
                  : [...acc.authKeys, key]
              })
              cur.contentAuths.forEach((key) => {
                acc.contentAuths = acc.contentAuths.includes(key)
                  ? [...acc.contentAuths]
                  : [...acc.contentAuths, key]
              })
              cur.logicAuths.forEach((key) => {
                acc.logicAuths = acc.logicAuths.includes(key)
                  ? [...acc.logicAuths]
                  : [...acc.logicAuths, key]
              })
              return acc
            },
            { authKeys: [], contentAuths: [], logicAuths: [] }
          )
          authKeys = permission.authKeys
          contentAuths = permission.contentAuths
          logicAuths = permission.logicAuths
        }
        commit('SET_AUTH', authKeys)
        commit('SET_PERMISSION', { contentAuths, logicAuths })
        router.replace(userInfo.name == '超级管理员'?'/layout/console':'/')
      },
      refreshLogin: async ({ commit }, token) => {
        try {
          commit('SET_TOKEN', token)
          const userInfo = await getUserInfo(token)
          commit('SET_USERINFO', userInfo)
          let authKeys = []
          let contentAuths = []
          let logicAuths = []
          if (userInfo.name == '超级管理员') {
            authKeys = ALL_AUTH_KEYS
          } else {
            const permission = userInfo.roles.reduce(
              (acc, cur) => {
                cur.pageAuths.forEach((key) => {
                  acc.authKeys = acc.authKeys.includes(key)
                    ? [...acc.authKeys]
                    : [...acc.authKeys, key]
                })
                cur.contentAuths.forEach((key) => {
                  acc.contentAuths = acc.contentAuths.includes(key)
                    ? [...acc.contentAuths]
                    : [...acc.contentAuths, key]
                })
                cur.logicAuths.forEach((key) => {
                  acc.logicAuths = acc.logicAuths.includes(key)
                    ? [...acc.logicAuths]
                    : [...acc.logicAuths, key]
                })
                return acc
              },
              { authKeys: [], contentAuths: [], logicAuths: [] }
            )
            authKeys = permission.authKeys
            contentAuths = permission.contentAuths
            logicAuths = permission.logicAuths
          }
          commit('SET_AUTH', authKeys)
          commit('SET_PERMISSION', { contentAuths, logicAuths })
          router.replace(router.currentRoute.value.fullPath)
        } catch (error) {
          commit('SET_TOKEN', '')
          commit('SET_AUTH', [])
          store.commit('SET_PERMISSION', { contentAuths: [], logicAuths: [] })
          commit('SET_LOGIN_MESSAGE', {
            type: 'error',
            text:
              error.message == '服务器连接失败，请检查网络状态'
                ? error.message
                : 'token 已过期，请重新登录',
          })
          router.replace('/login')
        }
      },
    },
  })

  // 防止刷新404
  function prevent404() {
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
