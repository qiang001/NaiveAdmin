import { ref } from 'vue'
export const useNotification = () => {
  const badgeNum = ref(33)
  const viewNotification = (ifOpen: boolean) => {
    if (!ifOpen) {
      badgeNum.value = 0
    }
    if (badgeNum.value > 0 && ifOpen) {
      window.$message.success(`加载 ${badgeNum.value} 条通知详情`)
    }
  }
  return {
    badgeNum,
    viewNotification,
  }
}
