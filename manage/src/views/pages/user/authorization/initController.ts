import { ref, onMounted } from 'vue'
import { useActionHeader } from './hooks/useActionHeader'
import { useApiCenter } from './hooks/useApiCenter'
import { useRoleList } from './hooks/useRoleList'
import { useEditModal } from './hooks/useEditModal'

import { IRoleListItem } from './interfaces/data'
import { I_initController_queryRoles } from './interfaces/method'

export const initController = () => {
  // 接口层
  const { exportData, loading, _getRoles, saveToDB, deleteFromDB } =
    useApiCenter()
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
    ifEdit,
    editModal,
    confirmLoading,
    role,
    open: openEditModal,
    close: closeEditModal,
    confirm: confirmEditModal,
  } = useEditModal({ queryRoles, saveToDB })
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
    _delete: deleteRole,
  } = useRoleList({
    queryRoles,
    openEditModal,
    deleteFromDB,
  })

  // 最终对外暴露
  const data = {
    roles,
    loading,
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
    deleteRole,
    closeEditModal,
    confirmEditModal,
  }

  return {
    ...data,
    ...methods,
  }
}
