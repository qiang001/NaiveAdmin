import { createRouter, createWebHistory } from 'vue-router'

const base = import.meta.env.VITE_APP_SITE_BASE_URL as string

function buildRouter() {
  return createRouter({
    history: !base ? createWebHistory() : createWebHistory(base),
    routes: [
      {
        path: '/layout',
        name: 'Layout',
        component: () => import('./views/layout/index.vue'),
        children: [
          {
            path: 'redirect',
            name: 'Redirect',
            component: () => import('./views/pages/redirect/index.vue'),
            meta: {
              label: '跳转中...',
              menuKey: '',
              expandedKey: '',
            },
          },
        ],
        meta: {
          label: '主页',
          menuKey: '',
          expandedKey: '',
        },
      },
      {
        path: '/',
        name: 'Home',
        redirect: '/layout',
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('./views/login.vue'),
        meta: {
          label: '登录',
          menuKey: '',
          expandedKey: '',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('./views/404.vue'),
        meta: {
          label: '404',
          menuKey: '',
          expandedKey: '',
        },
      },
    ],
  })
}

import { IPageItem } from '@/configuration'
import { RouteRecordRaw } from 'vue-router'
function buildPages(configuration: Array<IPageItem>): Array<RouteRecordRaw> {
  // 动态引入神坑

  // 1.开发没问题，打包搞死人
  // ()=>import(`./views/pages/${item.path}/index.vue`)

  // 解决方案：import.meta.glob
  const modules = import.meta.glob('./views/pages/**/*.vue')

  let pages = []
  return recursion(configuration)
  function recursion(
    arr: Array<IPageItem>,
    expandedKeys?: Array<string>
  ): Array<RouteRecordRaw> {
    arr.forEach((item) => {
      expandedKeys = expandedKeys || []
      if (item.path) {
        const page = mapPage(item, expandedKeys)
        pages = [...pages, page]
      }
      if (item.children) {
        return recursion(item.children, [...expandedKeys, item.name])
      }
    })
    return pages
  }
  function mapPage(
    item: IPageItem,
    expandedKeys: Array<string>
  ): RouteRecordRaw {
    return {
      path: item.path,
      name: item.name,
      component: modules[`./views/pages/${item.path}/index.vue`],
      meta: {
        label: item.label,
        menuKey: item.belongsTo || item.name,
        expandedKey: [
          ...expandedKeys,
          item.ifHide ? item.belongsTo : item.name,
        ].join(','),
        ifCache: !!item.ifCache,
      },
    }
  }
}

import { h } from 'vue'
import { NIcon } from 'naive-ui'
// 渲染菜单
export interface IMenuItem {
  icon?: any
  label: string
  key: string
  expandedKey: string
  children?: IMenuItem[]
}

function buildMenuOptions(
  configuration: Array<IPageItem>,
  { AUTH_KEYS, ifHideIcon }
): Array<IMenuItem> {
  return recursion(configuration, [])
  function recursion(
    arr: Array<IPageItem>,
    expandedKeys: Array<string>
  ): Array<IMenuItem> {
    return arr
      .filter((v) => !v.ifHide && AUTH_KEYS.includes(v.name))
      .map((item) => {
        let option = mapMenuOption(item, expandedKeys, ifHideIcon)
        if (
          item.children &&
          item.children.some((c) => !c.ifHide && AUTH_KEYS.includes(c.name))
        ) {
          option.children = recursion(
            item.children,
            option.expandedKey.split(',')
          )
        }
        return option
      })
  }

  function mapMenuOption(
    item: IPageItem,
    expandedKeys: Array<string>,
    ifHideIcon: boolean
  ): IMenuItem {
    return {
      icon: item.icon && !ifHideIcon ? renderIcon(item.icon) : undefined,
      label: item.label,
      key: item.name,
      expandedKey: [...expandedKeys, item.name].join(','),
    }
    function renderIcon(icon) {
      return () => {
        return h(NIcon, null, {
          default: () => h(icon),
        })
      }
    }
  }
}

// 渲染菜单权限树
interface IMenuAuth {
  label: string
  key: string
  belongsTo?: string
  expandedKey: string
  children?: IMenuAuth[]
}

function buildMenuAuthTree(configuration: Array<IPageItem>): Array<IMenuAuth> {
  return recursion(configuration, [])
  function recursion(
    arr: Array<IPageItem>,
    expandedKeys: Array<string>
  ): IMenuAuth[] {
    return arr.map((item) => {
      let auth = mapMenuAuth(item, expandedKeys)
      if (item.children) {
        auth.children = recursion(item.children, auth.expandedKey.split(','))
      }
      return auth
    })
  }

  function mapMenuAuth(
    item: IPageItem,
    expandedKeys: Array<string>
  ): IMenuAuth {
    return {
      label: item.label,
      key: item.name,
      belongsTo: item.belongsTo,
      expandedKey: [...expandedKeys, item.name].join(','),
    }
  }
}

// 路由权限拍平
export interface ISearchOption {
  label: string
  labelPinYin: string
  value: string
}

interface IKeyOption {
  label: string
  name: string
}

interface IMenuAuthsFlated {
  ALL_AUTH_KEYS: string[]
  HIDE_AUTH_KEYS: Array<{
    name: string
    belongsTo: string
  }>
  searchOptions: ISearchOption[]
  keyOptions: IKeyOption[]
}

function getAuthKeys(configuration: Array<IPageItem>): IMenuAuthsFlated {
  let keys = []
  let hides = []
  let shows = []
  let keyOptions = []
  extractKeys(configuration)
  function extractKeys(arr: Array<IPageItem>): void {
    arr.forEach((item) => {
      keys = [...keys, item.name]
      keyOptions = [
        ...keyOptions,
        {
          name: item.name,
          label: item.label,
        },
      ]
      if (item.ifHide) {
        hides = [
          ...hides,
          {
            name: item.name,
            belongsTo: item.belongsTo,
          },
        ]
      }
      if (item.children) {
        extractKeys(item.children)
      } else {
        if (!item.ifHide && item.labelPinYin) {
          shows = [
            ...shows,
            {
              label: item.label,
              labelPinYin: item.labelPinYin,
              value: item.name,
            },
          ]
        }
      }
    })
  }
  return {
    ALL_AUTH_KEYS: keys,
    HIDE_AUTH_KEYS: hides,
    searchOptions: shows,
    keyOptions,
  }
}

import { App } from 'vue'
import { Store } from 'vuex'
import { State } from '@/store'
function initOtherPermissions(app: App, store: Store<State>): void {
  app.directive('permission', {
    beforeMount(el, binding) {
      if (binding.arg == 'logic') {
        const key = Object.keys(binding.modifiers).join()
        el.addEventListener('click', () => {
          if (
            !store.state.logicAuths.includes(key) &&
            store.state.userInfo.name !== '超级管理员'
          ) {
            return window.$message.error('没有对应的操作许可权限')
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
}

export {
  buildRouter,
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
  initOtherPermissions,
}
