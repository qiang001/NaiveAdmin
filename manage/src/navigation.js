import { createRouter, createWebHashHistory } from 'vue-router'

function buildRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/layout',
        name: 'Layout',
        component: () => import('./views/layout/index.vue'),
        children: [],
        meta: {
          menuKey:'',
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
          menuKey:'',
          expandedKey: '',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('./views/404.vue'),
        meta: {
          menuKey:'',
          expandedKey: '',
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        redirect: {
          name: '404',
        },
      },
    ],
  })
}

function buildPages(configuration) {
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
      component: () => import(`./views/pages/${item.path}/index.vue`),
      meta: {
        menuKey:item.belongsTo||item.name,
        expandedKey: [
          ...expandedKeys,
          item.ifHide ? item.belongsTo : item.name,
        ].join(','),
      },
    }
  }
}

function buildMenuOptions(configuration, AUTH_KEYS) {
  return recursion(configuration, [])
  function recursion(arr, expandedKeys) {
    return arr
      .filter((v) => !v.ifHide && AUTH_KEYS.includes(v.name))
      .map((item) => {
        let option = mapMenuOption(item, expandedKeys)
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

  function mapMenuOption(item, expandedKeys) {
    return {
      label: item.label,
      key: item.name,
      expandedKey: [...expandedKeys, item.name].join(','),
    }
  }
}

export { buildRouter, buildPages, buildMenuOptions }
