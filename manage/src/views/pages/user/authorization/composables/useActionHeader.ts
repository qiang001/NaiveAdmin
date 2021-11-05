import { ref } from 'vue'
import {
  // Input
  I_useApiCenter_exportData,
  I_useEditModal_open,
  // Output
  I_useActionHeader_exportExcel,
  I_useActionHeader_add,
} from '../interfaces/method'
interface Input {
  exportData: I_useApiCenter_exportData
  openEditModal: I_useEditModal_open
}
export const useActionHeader = ({ exportData, openEditModal }: Input) => {
  const exportLoading = ref(false)
  const exportExcel: I_useActionHeader_exportExcel = async () => {
    exportLoading.value = true
    await exportData()
    exportLoading.value = false
  }
  const add: I_useActionHeader_add = () => {
    openEditModal({ type: 'create' })
  }
  const data = { exportLoading }
  const method = { exportExcel, add }
  return {
    ...data,
    ...method,
  }
}
