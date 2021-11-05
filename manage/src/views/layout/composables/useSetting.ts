import { ref } from 'vue'

export const useSetting = () => {
  const settingShow = ref(false)
  const openSetting = () => {
    settingShow.value = true
  }
  const closeSetting = () => {
    settingShow.value = false
  }
  return {
    settingShow,
    openSetting,
    closeSetting,
  }
}
