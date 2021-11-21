import {
  // Input
  I_useApiCenter_exportData,
  I_useEditModal_open,
  // Output
  I_useActionHeader_exportExcel,
  I_useActionHeader_add,
} from '../interfaces/method'
interface Input {
  _exportData: I_useApiCenter_exportData
  openEditModal: I_useEditModal_open
}
export const useActionHeader = ({ _exportData, openEditModal }: Input) => {
  const exportExcel: I_useActionHeader_exportExcel = async () => {
    try {
      await _exportData()
      window.$message.success('恭喜你，导出成功！')
    } catch (error) {}
  }
  const add: I_useActionHeader_add = () => {
    openEditModal({ type: 'create' })
  }
  const data = {}
  const method = { exportExcel, add }
  return {
    ...data,
    ...method,
  }
}
