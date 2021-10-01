import { ref } from 'vue'
export const useActionHeader = ({ exportData, openEditModal }) => {
  const exportLoading = ref(false)
  const exportExcel = async () => {
    exportLoading.value = true
    await exportData()
    exportLoading.value = false
  }
  const add = () => {
    openEditModal({ type: 'create' })
  }
  return {
    exportLoading,
    exportExcel,
    add,
  }
}
