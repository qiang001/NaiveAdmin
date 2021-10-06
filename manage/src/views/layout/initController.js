import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useFullscreen } from './hooks/useFullscreen'
import { useMenu } from './hooks/useMenu'
import { useHandleBar } from './hooks/useHandleBar'
export const initController = (loadingBar) => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const { launchFullscreen, exitFullscreen } = useFullscreen()

  const {
    ifFullpage,
    refreshing,
    history,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  } = useHandleBar({
    loadingBar,
    router,
    route,
    launchFullscreen,
    exitFullscreen,
  })

  const {
    widthSpan,
    sectionWidth,
    widthChange,
    widthChangeDone,
    collapsed,
    inverted,
    collapsedChange,
    invertedChange,
    navigateTo,
  } = useMenu({ refreshRoute, router })

  const data = {
    store,
    router,
    route,
    ifFullpage,
    refreshing,
    history,
    collapsed,
    inverted,
    widthSpan,
    sectionWidth,
  }
  const methods = {
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
    collapsedChange,
    invertedChange,
    navigateTo,
    widthChange,
    widthChangeDone
  }
  return {
    ...data,
    ...methods,
  }
}
