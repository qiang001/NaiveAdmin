import { useMenu } from './hooks/useMenu'
import { useSectionWidth } from './hooks/useSectionWidth'
import { useHandleBar } from './hooks/useHandleBar'
export const initController = (loadingBar) => {
  const { collapsed, inverted, collapsedChange, invertedChange } = useMenu()
  const { widthSpan, sectionWidth, widthChange } = useSectionWidth()
  const {
    ifFullpage,
    route,
    history,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  } = useHandleBar({ loadingBar, collapsedChange })
  const data = {
    collapsed,
    inverted,
    widthSpan,
    sectionWidth,
    route,
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
