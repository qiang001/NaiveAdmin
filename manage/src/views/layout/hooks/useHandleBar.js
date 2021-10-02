import { unref, ref } from 'vue'
export const useHandleBar = ({ loadingBar, router, route }) => {
  const ifFullpage = ref(false)
  const history = ref([])

  addHistory(route.name, route.meta.label)

  router.beforeEach((to, from, next) => {
    loadingBar.start()
    next()
  })

  router.afterEach((to, from, failure) => {
    failure ? loadingBar.error() : success()
    function success() {
      loadingBar.finish()
      addHistory(to.name, to.meta.label)
    }
  })

  function addHistory(name, label) {
    if (
      !['Layout', 'Redirect', 'Home', 'Login', '404', 'Not Found'].includes(
        name
      )
    ) {
      if (!history.value.some((v) => v.name == name)) {
        history.value.push({
          name,
          label,
          ifCurrent: false,
        })
      }
      setCurrentRoute(name)
    }
  }

  function setCurrentRoute(name) {
    history.value.forEach((item) => {
      item.ifCurrent = item.name == name
    })
  }

  const gotoTab = (name) => {
    router.push({ name })
  }

  const deleteTab = ({ name, ifCurrent }) => {
    let index = history.value.findIndex((v) => v.name == name)
    if (index > -1) {
      history.value.splice(index, 1)
      if (ifCurrent) {
        let tailItem = history.value.pop()
        if (tailItem) {
          gotoTab(tailItem.name)
        }
      }
    }
  }

  const refreshRoute = () => {
    router.push({
      name: 'Redirect',
      query: getTarget(),
    })
  }

  const setFullpage = (bool) => {
    ifFullpage.value = bool
  }

  function getTarget() {
    const { currentRoute } = router
    const { path, query } = unref(currentRoute)
    let obj = {
      targetPath: path,
      targetQuery: '',
    }
    let queryString = ''
    Object.keys(query).forEach((key) => {
      queryString += `!@#$${key}=${query[key]}`
    })
    if (queryString) {
      obj.targetQuery = queryString
    }
    return obj
  }

  return {
    ifFullpage,
    route,
    history,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  }
}
