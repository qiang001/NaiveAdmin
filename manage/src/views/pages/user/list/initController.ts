import { useResultModal } from '@/hooks/useResultModal'
import { useActionHeader } from './composables/useActionHeader'
import { useApiCenter } from './composables/useApiCenter'
import { useUserList } from './composables/useUserList'
import { useConditions } from './composables/useConditions'
import { useEditModal } from './composables/useEditModal'
import { useResetPasswordModal } from './composables/useResetPasswordModal'

export const initController = () => {
  // 引入结果弹窗
  const {
    resultOptions,
    setTexts,
    setResultType,
    openResultModal,
    openResultModalAsync,
    closeResultModal,
  } = useResultModal()
  // [数据]逻辑 - 接口层
  const {
    loading,
    _getUsers,
    rolesLoading,
    _getRoleOptions,
    confirmLoading,
    _saveToDB,
    resetLoading,
    _changePassword,
    _deleteFromDB,
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
    resetPage,
    changePage,
    changePageSize,
    queryUsers,
  } = useConditions({ _getUsers })

  // 编辑框
  const {
    editModalType,
    editModal,
    user,
    roleOptions,
    open: openEditModal,
    close: closeEditModal,
    confirm: confirmEditModal,
  } = useEditModal({
    _getRoleOptions,
    _saveToDB,
    resetFilters,
    resetSort,
    resetPage,
    queryUsers,
  })
  // 密码重置框
  const {
    resetPasswordModal,
    user: resetUser,
    open: openResetPasswordModal,
    close: closeResetPasswordModal,
    confirm: confirmResetPasswordModal,
  } = useResetPasswordModal({
    _changePassword,
    setTexts,
    setResultType,
    openResultModal,
  })
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
    _deleteFromDB,
    resetPage,
    queryUsers,
    setTexts,
    setResultType,
    openResultModalAsync,
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
    rolesLoading,
    roleOptions,
    resetPasswordModal,
    resetLoading,
    resetUser,
    searching,
    dynamicWidth,
    maxHeight,
    resultOptions,
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
    closeResultModal,
  }

  return {
    ...data,
    ...methods,
  }
}
