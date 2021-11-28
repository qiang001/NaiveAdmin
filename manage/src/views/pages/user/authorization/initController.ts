import { ref, onMounted } from 'vue'
import { useResultModal } from '@/hooks/useResultModal'
import { renderProcessing } from '@/hooks/renderProcessing'
import { useActionHeader } from './composables/useActionHeader'
import { useApiCenter } from './composables/useApiCenter'
import { useRoleList } from './composables/useRoleList'
import { useEditModal } from './composables/useEditModal'

import { IRoleListItem } from './interfaces/data'
import { I_initController_queryRoles } from './interfaces/method'

export const initController = () => {
  // 引入结果弹窗
  const {
    resultOptions,
    setTexts,
    setResultType,
    openResultModal,
    closeResultModal,
  } = useResultModal()
  // 接口层
  const {
    exportLoading,
    _exportData,
    loading,
    _getRoles,
    confirmLoading,
    _saveToDB,
    _deleteFromDB,
  } = useApiCenter()

  // 引入导出进度框
  const { start: startExportProcessing } = renderProcessing(
    '导出中...',
    exportLoading
  )

  // 初始化数据
  const roles = ref<Array<IRoleListItem>>([])
  const queryRoles: I_initController_queryRoles = async () => {
    roles.value = await _getRoles()
  }
  onMounted(async () => {
    await queryRoles()
  })
  // 编辑框逻辑
  const {
    editModalType,
    editModal,
    role,
    open: openEditModal,
    close: closeEditModal,
    confirm: confirmEditModal,
  } = useEditModal({ queryRoles, _saveToDB })
  // 按钮组逻辑
  const { exportExcel, add: addRole } = useActionHeader({
    startExportProcessing,
    _exportData,
    openEditModal,
  })
  // 表格逻辑
  const {
    maxHeight,
    edit: editRole,
    _delete: deleteRole,
  } = useRoleList({
    queryRoles,
    openEditModal,
    _deleteFromDB,
    setTexts,
    setResultType,
    openResultModal,
  })

  // 最终对外暴露
  const data = {
    roles,
    loading,
    editModalType,
    editModal,
    confirmLoading,
    role,
    exportLoading,
    maxHeight,
    resultOptions,
  }
  const methods = {
    exportExcel,
    addRole,
    editRole,
    deleteRole,
    closeResultModal,
    closeEditModal,
    confirmEditModal,
  }

  return {
    ...data,
    ...methods,
  }
}
