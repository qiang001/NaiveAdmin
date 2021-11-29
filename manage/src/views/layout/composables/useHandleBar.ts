import { unref, ref, Ref } from 'vue'
import { useStore } from '@/hooks/useStore'
import { useLoadingBar } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { IHistory } from '../interfaces/data'

export const useHandleBar = () => {
  const loadingBar = useLoadingBar()
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const ifFullpage = ref(false)
  const refreshing = ref(false)
  const history: Ref<Array<IHistory>> = ref([])

  addHistory(route)

  router.beforeEach(async (to, from, next) => {
    if (!['Redirect', 'Layout'].includes(to.name as string)) {
      loadingBar.start()
    }
    to.name == from.name ? (refreshRoute(to), next()) : next()
  })

  router.afterEach((to, from, failure) => {
    failure ? error() : success()
    function error() {
      if (
        !['Redirect', 'Layout'].includes(to.name as string) &&
        to.name != from.name
      ) {
        loadingBar.error()
      }
    }
    function success() {
      if (!['Redirect', 'Layout'].includes(to.name as string)) {
        loadingBar.finish()
      }
      addHistory(to)
    }
  })

  function addHistory({ name, query, fullPath, path, meta }) {
    if (
      !['Layout', 'Redirect', 'Home', 'Login', '404', 'Not Found'].includes(
        name
      )
    ) {
      if (
        !history.value.some((v) => v.name == name && v.fullPath == fullPath)
      ) {
        history.value.push({
          name,
          label: meta.label,
          ifCurrent: false,
          query,
          fullPath,
          path,
          meta,
        })
      }
      meta.ifCache && store.commit('ADD_CACHE', name)
      setCurrentRoute(name, fullPath)
    }
  }

  function setCurrentRoute(name, fullPath) {
    history.value.forEach((item) => {
      item.ifCurrent = item.name == name && item.fullPath == fullPath
    })
  }

  const gotoTab = ({ name, ifCurrent, query, path }) => {
    history.value.length > 1 && !ifCurrent
      ? name == route.name
        ? refreshRoute({ path, query })
        : router.push({ name, query })
      : refreshRoute()
  }

  const deleteTab = ({ name, ifCurrent, fullPath, meta }) => {
    let index = history.value.findIndex(
      (v) => v.name == name && v.fullPath == fullPath
    )
    if (index > -1) {
      history.value.splice(index, 1)
      clearCache(meta, name)
      if (ifCurrent) {
        let tailItem = history.value.pop()
        history.value.push(tailItem)
        if (tailItem) {
          tailItem.name == route.name
            ? refreshRoute({ path: tailItem.path, query: tailItem.query })
            : router.push({ name: tailItem.name, query: tailItem.query })
        }
      }
    }
  }

  const refreshRoute = (
    { path, query } = { path: undefined, query: undefined }
  ) => {
    router.push({
      name: 'Redirect',
      query: getTarget({ targetPath: path, targetQuery: query }),
    })
  }

  function getTarget(
    { targetPath, targetQuery } = {
      targetPath: undefined,
      targetQuery: undefined,
    }
  ) {
    if (!targetPath || !targetQuery) {
      refreshing.value = true
      setTimeout(() => {
        refreshing.value = false
      }, 1000)
      const { currentRoute } = router
      const { name, path, query, meta } = unref(currentRoute)
      clearCacheForce(meta, name)
      targetPath = path
      targetQuery = query
    }

    let queryString = ''
    Object.keys(targetQuery).forEach((key) => {
      queryString += `!@#$${key}=${targetQuery[key]}`
    })
    return {
      targetPath,
      targetQuery: queryString,
    }
  }

  const clearCache = (meta, name) => {
    const sibling = history.value.findIndex((v) => v.name == name)
    sibling === -1 && meta.ifCache && store.commit('REMOVE_CACHE', name)
  }

  const clearCacheForce = (meta, name) => {
    meta.ifCache && store.commit('REMOVE_CACHE', name)
  }

  const setFullpage = (bool) => {
    bool ? launchFullscreen(document.body) : exitFullscreen()
    ifFullpage.value = bool
    function launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen()
      }
    }

    function exitFullscreen() {
      const fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      if (fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      }
    }
  }

  return {
    ifFullpage,
    refreshing,
    route,
    history,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  }
}
