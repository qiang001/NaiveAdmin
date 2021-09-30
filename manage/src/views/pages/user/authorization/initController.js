import { ref } from 'vue'
import { useActionHeader } from './hooks/useActionHeader'
import { useApiCenter } from './hooks/useApiCenter'
import { useRoleList } from './hooks/useRoleList'
import { useEditModal } from './hooks/useEditModal'

export const initController = () => {
  // 公共 states
  const roles = ref([])
  // 接口层
  const { exportData, getRoles, saveToDB } = useApiCenter(roles)
  // 编辑框逻辑
  const {
    ifEdit,
    showModal: editModal,
    role,
    open: openEditModal,
    close: closeEditModal,
    loading: saveLoading,
    save: saveEditModal,
  } = useEditModal({ getRoles, saveToDB })
  // 按钮组逻辑
  const {
    loading: exportLoading,
    exportExcel,
    add: addRole,
  } = useActionHeader({
    exportData,
    openEditModal,
  })
  // 表格逻辑
  const { edit: editRole } = useRoleList({
    getRoles,
    openEditModal,
  })

  // 最终对外暴露
  const data = { roles, ifEdit, editModal, role, saveLoading, exportLoading }
  const methods = {
    exportExcel,
    addRole,
    editRole,
    closeEditModal,
    saveEditModal,
  }

  return {
    ...data,
    ...methods,
  }
}
