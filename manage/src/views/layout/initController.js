import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useMenu } from './hooks/useMenu'
import { useSectionWidth } from './hooks/useSectionWidth'
import { useHandleBar } from './hooks/useHandleBar'
export const initController = (loadingBar) => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const { widthSpan, sectionWidth, widthChange } = useSectionWidth()

  const {
    ifFullpage,
    refreshing,
    history,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  } = useHandleBar({ loadingBar, router, route })

  const { collapsed, inverted, collapsedChange, invertedChange, navigateTo } =
    useMenu({ refreshRoute, router })

  const data = {
    store,
    router,
    route,
    collapsed,
    inverted,
    widthSpan,
    sectionWidth,
    history,
    ifFullpage,
    refreshing,
  }
  const methods = {
    widthChange,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
    collapsedChange,
    invertedChange,
    navigateTo,
  }
  return {
    ...data,
    ...methods,
  }
}
