import { unref, ref } from 'vue'
export const useHandleBar = ({
  loadingBar,
  router,
  route,
  launchFullscreen,
  exitFullscreen,
}) => {
  const ifFullpage = ref(false)
  const refreshing = ref(false)
  const history = ref([])

  addHistory(route.name, route.meta.label)
  
  router.beforeEach(async (to, from, next) => {
    if (to.name != 'Redirect') {
      loadingBar.start()
    }
    next()
  })

  router.afterEach((to, from, failure) => {
    failure ? loadingBar.error() : success()
    function success() {
      if (to.name != 'Redirect') {
        loadingBar.finish()
      }
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

  const gotoTab = ({ name, ifCurrent }) => {
    history.value.length > 1 && !ifCurrent
      ? router.push({ name })
      : refreshRoute()
  }

  const deleteTab = ({ name, ifCurrent }) => {
    let index = history.value.findIndex((v) => v.name == name)
    if (index > -1) {
      history.value.splice(index, 1)
      if (ifCurrent) {
        let tailItem = history.value.pop()
        if (tailItem) {
          router.push({ name: tailItem.name })
        }
      }
    }
  }

  const refreshRoute = () => {
    refreshing.value = true
    setTimeout(() => {
      refreshing.value = false
    }, 500)
    router.push({
      name: 'Redirect',
      query: getTarget(),
    })
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

  const setFullpage = (bool) => {
    bool ? launchFullscreen(document.body) : exitFullscreen()
    ifFullpage.value = bool
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
