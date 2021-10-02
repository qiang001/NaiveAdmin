import { ref } from 'vue'
import { useActionHeader } from './hooks/useActionHeader'
import { useApiCenter } from './hooks/useApiCenter'
import { useRoleList } from './hooks/useRoleList'
import { useEditModal } from './hooks/useEditModal'

export const initController = () => {
  // 公共状态数据
  const roles = ref([])
  // 接口层
  const { exportData, getRoles, saveToDB } = useApiCenter(roles)
  // 编辑框逻辑
  const {
    ifEdit,
    editModal,
    confirmLoading,
    role,
    open: openEditModal,
    close: closeEditModal,
    confirm: confirmEditModal,
  } = useEditModal({ getRoles, saveToDB })
  // 按钮组逻辑
  const {
    exportLoading,
    exportExcel,
    add: addRole,
  } = useActionHeader({
    exportData,
    openEditModal,
  })
  // 表格逻辑
  const {
    maxHeight,
    setMaxHeight,
    edit: editRole,
  } = useRoleList({
    getRoles,
    openEditModal,
  })

  // 最终对外暴露
  const data = {
    roles,
    ifEdit,
    editModal,
    confirmLoading,
    role,
    exportLoading,
    maxHeight,
  }
  const methods = {
    exportExcel,
    addRole,
    setMaxHeight,
    editRole,
    closeEditModal,
    confirmEditModal,
  }

  return {
    ...data,
    ...methods,
  }
}
