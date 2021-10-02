import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useMenu } from './hooks/useMenu'
import { useSectionWidth } from './hooks/useSectionWidth'
import { useHandleBar } from './hooks/useHandleBar'
export const initController = (loadingBar) => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const { collapsed, inverted, collapsedChange, invertedChange } = useMenu()
  const { widthSpan, sectionWidth, widthChange } = useSectionWidth()
  const { ifFullpage, history, gotoTab, deleteTab, refreshRoute, setFullpage } =
    useHandleBar({ loadingBar, router, route })
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
  }
  const methods = {
    collapsedChange,
    invertedChange,
    widthChange,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  }
  return {
    ...data,
    ...methods,
  }
}
