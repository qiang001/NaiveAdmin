import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useDebounce } from '@/hooks/useDebounce'
import { useActionHeader } from './hooks/useActionHeader'
import { useApiCenter } from './hooks/useApiCenter'
import { useRoleList } from './hooks/useRoleList'
import { useEditModal } from './hooks/useEditModal'

export const initController = () => {
  // 公共状态数据
  const store = useStore()
  const roles = ref([])
  // 接口层
  const { exportData,loading, getRoles, saveToDB, deleteFromDB } = useApiCenter({store,roles,useDebounce})
  // 初始化数据
  onMounted(async () => {
    await getRoles()
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
  } = useEditModal({ getRoles, saveToDB,useDebounce })
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
    getRoles,
    openEditModal,
    deleteFromDB,
    useDebounce
  })

  // 最终对外暴露
  const data = {
    store,
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
