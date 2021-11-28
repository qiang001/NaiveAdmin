import {
  // Input
  I_useApiCenter_exportData,
  I_useEditModal_open,
  // Output
  I_useActionHeader_exportExcel,
  I_useActionHeader_add,
} from '../interfaces/method'
import {
  // Input
  I_renderProcessing_start,
} from '@/hooks/renderProcessing'
interface Input {
  startExportProcessing: I_renderProcessing_start
  _exportData: I_useApiCenter_exportData
  openEditModal: I_useEditModal_open
}
export const useActionHeader = ({
  startExportProcessing,
  _exportData,
  openEditModal,
}: Input) => {
  const exportExcel: I_useActionHeader_exportExcel = async () => {
    try {
      startExportProcessing()
      await _exportData()
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
