import { useActionHeader } from './hooks/useActionHeader'
import { useApiCenter } from './hooks/useApiCenter'
import { useUserList } from './hooks/useUserList'
import { useFilters } from './hooks/useFilters'
import { useEditModal } from './hooks/useEditModal'
import { useResetPasswordModal } from './hooks/useResetPasswordModal'

export const initController = () => {
  // [数据]逻辑 - 接口层
  const {
    loading,
    _getUsers,
    getRoleOptions,
    saveToDB,
    changePassword,
    deleteFromDB,
  } = useApiCenter()

  // [搜索、排序、分页]逻辑 - 列表数据初始化放这里面比较好
  const {
    users,
    filters,
    resetFilters,
    setStatus,
    sort,
    resetSort,
    setSort,
    pagination,
    changePage,
    changePageSize,
    resetPage,
    queryUsers,
  } = useFilters({ _getUsers })

  // 编辑框
  const {
    editModalType,
    editModal,
    confirmLoading,
    user,
    roleOptions,
    open: openEditModal,
    close: closeEditModal,
    confirm: confirmEditModal,
  } = useEditModal({
    getRoleOptions,
    saveToDB,
    resetFilters,
    resetSort,
    resetPage,
    queryUsers,
  })
  // 密码重置框
  const {
    resetPasswordModal,
    confirmLoading: resetLoading,
    user: resetUser,
    open: openResetPasswordModal,
    close: closeResetPasswordModal,
    confirm: confirmResetPasswordModal,
  } = useResetPasswordModal({ changePassword })
  // Action 页面
  const {
    add: addUser,
    changeStatus,
    clear: clearConditions,
    searching,
    search: searchUsers,
    changeSort,
  } = useActionHeader({
    openEditModal,
    resetFilters,
    setStatus,
    resetSort,
    setSort,
    resetPage,
    queryUsers,
  })

  // 表格
  const {
    dynamicWidth,
    maxHeight,
    refresh: refreshList,
    edit: editUser,
    resetPassword,
    _delete: deleteUser,
  } = useUserList({
    openEditModal,
    openResetPasswordModal,
    deleteFromDB,
    resetPage,
    queryUsers,
  })

  // 最终对外暴露
  const data = {
    users,
    loading,
    filters,
    sort,
    pagination,
    editModalType,
    editModal,
    confirmLoading,
    user,
    roleOptions,
    resetPasswordModal,
    resetLoading,
    resetUser,
    searching,
    dynamicWidth,
    maxHeight,
  }
  const methods = {
    changePage,
    changePageSize,
    closeEditModal,
    confirmEditModal,
    closeResetPasswordModal,
    confirmResetPasswordModal,
    addUser,
    changeStatus,
    clearConditions,
    searchUsers,
    changeSort,
    refreshList,
    editUser,
    resetPassword,
    deleteUser,
  }

  return {
    ...data,
    ...methods,
  }
}
