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
  I_renderProcessing_setText,
  I_renderProcessing_setIfDone,
  I_renderProcessing_setCallbackFn,
  I_renderProcessing_start,
} from '@/hooks/renderProcessing'
interface Input {
  setText: I_renderProcessing_setText
  setIfDone: I_renderProcessing_setIfDone
  setCallbackFn: I_renderProcessing_setCallbackFn
  startExportProcessing: I_renderProcessing_start
  _exportData: I_useApiCenter_exportData
  openEditModal: I_useEditModal_open
}
export const useActionHeader = ({
  setText,
  setIfDone,
  setCallbackFn,
  startExportProcessing,
  _exportData,
  openEditModal,
}: Input) => {
  const exportExcel: I_useActionHeader_exportExcel = async () => {
    try {
      setText('下载中...')
      setIfDone(false)
      setCallbackFn(() =>
        setTimeout(() => window.$message.success('恭喜你，导出成功！'), 200)
      )
      startExportProcessing()
      await _exportData()
      setText('下载完成')
      setIfDone(true)
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
