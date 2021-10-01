import { useInverted } from './hooks/useInverted'
import { useSectionWidth } from './hooks/useSectionWidth'
import { useHandleBar } from './hooks/useHandleBar'
export const initController = (loadingBar) => {
  const { outInverted, invertedChange } = useInverted()
  const { widthSpan, sectionWidth, widthChange } = useSectionWidth()
  const { route, history, gotoTab, deleteTab, refreshRoute } =
    useHandleBar(loadingBar)
  const data = { outInverted, widthSpan, sectionWidth, route, history }
  const methods = {
    invertedChange,
    widthChange,
    gotoTab,
    deleteTab,
    refreshRoute,
  }
  return {
    ...data,
    ...methods,
  }
}
