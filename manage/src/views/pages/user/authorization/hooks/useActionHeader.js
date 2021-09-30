import { ref } from 'vue'
export const useActionHeader = ({ exportData, openEditModal }) => {
  const loading = ref(false)
  const exportExcel = async () => {
    loading.value = true
    await exportData()
    loading.value = false
  }
  const add = () => {
    openEditModal({ type: 'create' })
  }
  return {
    loading,
    exportExcel,
    add,
  }
}
