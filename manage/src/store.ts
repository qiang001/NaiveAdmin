import { createStore } from 'vuex'
import { darkTheme } from 'naive-ui'
import { useLoginApi, IUserInfo } from '@/api/useLoginApi'
const { loginUser, getUserInfo } = useLoginApi()
import { IColorCollection } from '@/configuration'
import {
  pageConfig,
  getStyles,
  getColors,
  themeOverrides,
} from './configuration'
import {
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
  IMenuItem,
} from './authorization'
import { Router } from 'vue-router'
export type layoutStyleType =
  | 'top-left-right'
  | 'top-left-right-inverted'
  | 'left-right'
export interface State {
  layoutStyle: layoutStyleType
  mainColor: string
  ifDark: boolean
  ifPageTitle: boolean
  ifEmbedded: boolean
  cacheList: string[]
  menuOptions: IMenuItem[]
  menuOptionsWithoutIcon: IMenuItem[]
  token: string
  userInfo: IUserInfo
  authKeys: string[]
  contentAuths: string[]
  logicAuths: string[]
  loginPageMessage: {
    type: string | null
    text: string | null
  }
}
export const buildStore = (router: Router) => {
  // menu auth tree
  const menuAuthTree = buildMenuAuthTree(pageConfig)
  // auth keys
  const { ALL_AUTH_KEYS, HIDE_AUTH_KEYS, searchOptions, keyOptions } =
    getAuthKeys(pageConfig)
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
  // layoutStyles
  const styles = getStyles()
  const store = createStore<State>({
    state() {
      return {
        layoutStyle: styles[0],
        mainColor: Object.keys(getColors(false))[0],
        ifDark: false,
        ifPageTitle: false,
        ifEmbedded: false,
        cacheList: [],
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
      getLayoutStyles(state) {
        return styles.map((item) => {
          return {
            styleName: item,
            checked: item === state.layoutStyle,
          }
        })
      },
      getMainColors(state) {
        const colorSet: IColorCollection = getColors(state.ifDark)
        return Object.values(colorSet).map((item) => ({
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
      getCacheList(state) {
        return state.cacheList
      },
      getMenu: (state) => (ifHideIcon: boolean) => {
        return !ifHideIcon ? state.menuOptions : state.menuOptionsWithoutIcon
      },
      getMenuAuthTree(state) {
        return menuAuthTree
      },
      getAllAuthKeys(state) {
        return ALL_AUTH_KEYS
      },
      getHideAuthKeys(state) {
        return HIDE_AUTH_KEYS
      },
      getSearchOptions(state) {
        return searchOptions.filter((item) =>
          state.authKeys.some((key) => key == item.value)
        )
      },
      getLabelWithKey: (state) => (key: string) => {
        return keyOptions.find((o) => o.name === key)?.label
      },
    },
    mutations: {
      SET_LAYOUTSTYLE(state, key) {
        let style = styles.find((s) => s === key)
        state.layoutStyle = style || styles[0]
      },
      SET_MAINCOLOR(state, key) {
        let colors = Object.keys(getColors(false))
        let mainColor = colors.includes(key) ? key : colors[0]
        state.mainColor = mainColor
      },
      SET_IFDARK(state, bool) {
        state.ifDark = bool
      },
      SET_IFPAGETITLE(state, bool) {
        state.ifPageTitle = bool
      },
      SET_IFEMBEDDED(state, bool) {
        state.ifEmbedded = bool
      },
      REMOVE_CACHE(state, name) {
        state.cacheList = state.cacheList.filter((n) => n !== name)
      },
      ADD_CACHE(state, name) {
        !state.cacheList.includes(name) && state.cacheList.push(name)
      },
      SET_TOKEN(state, token) {
        state.token = token
      },
      SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
      },
      SET_AUTH(state, auths) {
        const { authKeys, contentAuths, logicAuths } = auths
        state.authKeys = [...authKeys]
        state.contentAuths = contentAuths
        state.logicAuths = logicAuths
        const pages = buildPages(pageConfig)
        pages.forEach((page) => {
          const removeRoute = router.addRoute('Layout', page)
          if (!authKeys.includes(page.name)) {
            removeRoute()
          } else {
            page?.meta?.ifCache &&
              !state.cacheList.includes(page.name as string) &&
              state.cacheList.push(page.name as string)
          }
        })
        state.menuOptions = buildMenuOptions(pageConfig, {
          AUTH_KEYS: authKeys,
          ifHideIcon: false,
        })
        state.menuOptionsWithoutIcon = buildMenuOptions(pageConfig, {
          AUTH_KEYS: authKeys,
          ifHideIcon: true,
        })
        prevent404()
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
      login: async ({ dispatch }, data) => {
        const token = await loginUser(data)
        if (!token) {
          return
        }
        await dispatch('setupAuths', token)
        router.replace('/')
      },
      refreshLogin: async ({ commit, dispatch }, token) => {
        try {
          await dispatch('setupAuths', token)
          router.replace(router.currentRoute.value.fullPath)
        } catch (error) {
          dispatch('clearAuths')
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
      logout: ({ commit, dispatch }) => {
        dispatch('clearAuths')
        commit('SET_LOGIN_MESSAGE', { type: 'success', text: '成功退出系统！' })
        router.replace('/login')
      },
      setupAuths: async ({ commit }, token) => {
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
        commit('SET_AUTH', { authKeys, contentAuths, logicAuths })
      },
      clearAuths: ({ commit }) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', '')
        commit('SET_AUTH', { authKeys: [], contentAuths: [], logicAuths: [] })
      },
    },
  })
  // 自定义特殊情况下的 redirect
  router.beforeEach(async (to, from, next) => {
    if (
      to.redirectedFrom &&
      to.name === 'Layout' &&
      store.state.userInfo?.name === '超级管理员'
    ) {
      next({ path: '/layout/design-standard', replace: true })
    } else {
      next()
    }
  })
  return store
}
