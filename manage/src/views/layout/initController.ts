import { useStore } from '@/hooks/useStore'
import { useRouter, useRoute } from 'vue-router'
import { useFullscreen } from './composables/useFullscreen'
import { useMenu } from './composables/useMenu'
import { useHandleBar } from './composables/useHandleBar'
import { useSetting } from './composables/useSetting'
import { useLoadingBar } from 'naive-ui'

export const initController = () => {
  const loadingBar = useLoadingBar()
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
    store,
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
    accordion,
    ifShowIcon,
    ifShowSearch,
    collapsedChange,
    navigateTo,
  } = useMenu({ refreshRoute, router })

  const { settingShow, openSetting, closeSetting } = useSetting()

  const data = {
    store,
    route,
    ifFullpage,
    refreshing,
    history,
    collapsed,
    inverted,
    accordion,
    ifShowIcon,
    ifShowSearch,
    widthSpan,
    sectionWidth,
    settingShow,
  }
  const methods = {
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
    collapsedChange,
    navigateTo,
    widthChange,
    widthChangeDone,
    openSetting,
    closeSetting,
  }
  return {
    ...data,
    ...methods,
  }
}
