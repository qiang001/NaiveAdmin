import { ref, onMounted } from 'vue'
import { useActionHeader } from './composables/useActionHeader'
import { useApiCenter } from './composables/useApiCenter'
import { useRoleList } from './composables/useRoleList'
import { useEditModal } from './composables/useEditModal'

import { IRoleListItem } from './interfaces/data'
import { I_initController_queryRoles } from './interfaces/method'

export const initController = () => {
  // 接口层
  const {
    exportData,
    loading,
    _getRoles,
    confirmLoading,
    _saveToDB,
    _deleteFromDB,
  } = useApiCenter()
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
    edit: editRole,
    _delete: deleteRole,
  } = useRoleList({
    queryRoles,
    openEditModal,
    _deleteFromDB,
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
  }
  const methods = {
    exportExcel,
    addRole,
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
