import { useMenu } from './composables/useMenu'
import { useHandleBar } from './composables/useHandleBar'
import { useSetting } from './composables/useSetting'
import { useNotification } from './composables/useNotification'

export const initController = () => {
  const {
    ifFullpage,
    refreshing,
    history,
    gotoTab,
    deleteTab,
    refreshRoute,
    setFullpage,
  } = useHandleBar()

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
  } = useMenu(refreshRoute)

  const { settingShow, openSetting, closeSetting } = useSetting()

  const { badgeNum, viewNotification } = useNotification()
  const data = {
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
    badgeNum,
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
    viewNotification,
  }
  return {
    ...data,
    ...methods,
  }
}
