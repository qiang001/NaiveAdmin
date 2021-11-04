import { useStore } from '@/hooks/useStore'
import { useRouter, useRoute } from 'vue-router'
import { useFullscreen } from './hooks/useFullscreen'
import { useMenu } from './hooks/useMenu'
import { useHandleBar } from './hooks/useHandleBar'
import { useSetting } from './hooks/useSetting'
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
    ifHideIcon,
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
    ifHideIcon,
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
