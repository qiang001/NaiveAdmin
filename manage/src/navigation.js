import { createRouter, createWebHashHistory } from 'vue-router'

function buildRouter() {
  return createRouter({
    history: createWebHashHistory(),
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
        redirect: '/layout/console',
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

function buildPages(configuration) {
  // 动态引入神坑

  // 1.开发没问题，打包搞死人
  // ()=>import(`./views/pages/${item.path}/index.vue`)

  // 解决方案：import.meta.glob
  const modules = import.meta.glob('./views/pages/**/*.vue')

  let pages = []
  return recursion(configuration)
  function recursion(arr, expandedKeys) {
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
  function mapPage(item, expandedKeys) {
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
        ifCache:!!item.ifCache
      },
    }
  }
}

import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { iconCollection } from '@/assets/icons/menu.js'

// 渲染菜单
function buildMenuOptions(configuration, { AUTH_KEYS, ifHideIcon }) {
  return recursion(configuration, [])
  function recursion(arr, expandedKeys) {
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

  function mapMenuOption(item, expandedKeys, ifHideIcon) {
    return {
      icon: item.icon && !ifHideIcon ? renderIcon(item.icon) : undefined,
      label: item.label,
      key: item.name,
      expandedKey: [...expandedKeys, item.name].join(','),
    }
    function renderIcon(icon) {
      return () => {
        return h(
          NIcon,
          { size: 16 },
          {
            default: () => h(iconCollection[icon]),
          }
        )
      }
    }
  }
}

// 渲染菜单权限树
function buildMenuAuthTree(configuration) {
  return recursion(configuration, [])
  function recursion(arr, expandedKeys) {
    return arr.map((item) => {
      let auth = mapMenuAuth(item, expandedKeys)
      if (item.children) {
        auth.children = recursion(item.children, auth.expandedKey.split(','))
      }
      return auth
    })
  }

  function mapMenuAuth(item, expandedKeys) {
    return {
      label: item.label,
      key: item.name,
      belongsTo: item.belongsTo,
      expandedKey: [...expandedKeys, item.name].join(','),
    }
  }
}

// 路由权限拍平
function getAuthKeys(configuration) {
  let keys = []
  let hides = []
  let shows = []
  extractKeys(configuration)
  function extractKeys(arr) {
    arr.forEach((item) => {
      keys = [...keys, item.name]
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
        if (!item.ifHide) {
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
  }
}

export {
  buildRouter,
  buildPages,
  buildMenuOptions,
  buildMenuAuthTree,
  getAuthKeys,
}
