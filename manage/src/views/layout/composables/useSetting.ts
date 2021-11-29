import { useToggle } from '@/hooks/useToggle'
export const useSetting = () => {
  const {
    ifActive: settingShow,
    switchOn: openSetting,
    switchOff: closeSetting,
  } = useToggle()
  return {
    settingShow,
    openSetting,
    closeSetting,
  }
}
