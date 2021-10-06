import { useStore } from 'vuex'
import { ref } from 'vue'
import { useActionHeader } from './hooks/useActionHeader'
import { useApiCenter } from './hooks/useApiCenter'
import { useUserList } from './hooks/useUserList'
import { useFilters } from './hooks/useFilters'
import { useEditModal } from './hooks/useEditModal'

export const initController = () => {
  // [公共状态数据]
  const store = useStore()
  const users = ref([])

  // [数据]逻辑 - 接口层
  const { loading, getUsers, getRoleOptions, saveToDB, deleteFromDB } =
    useApiCenter(users)

  // [搜索、排序、分页]逻辑 - 列表数据初始化放这里面比较好
  const {
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
  } = useFilters(getUsers)

  // 编辑框
  const {
    ifEdit,
    editModal,
    confirmLoading,
    user,
    roleOptions,
    open: openEditModal,
    close: closeEditModal,
    confirm: confirmEditModal,
  } = useEditModal({ getRoleOptions, saveToDB, resetPage, queryUsers })

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
    maxHeight,
    setMaxHeight,
    edit: editUser,
    _delete: deleteUser,
  } = useUserList({
    openEditModal,
    deleteFromDB,
    queryUsers,
  })

  // 最终对外暴露
  const data = {
    store,
    users,
    loading,
    filters,
    sort,
    pagination,
    ifEdit,
    editModal,
    confirmLoading,
    user,
    roleOptions,
    searching,
    maxHeight,
  }
  const methods = {
    changePage,
    changePageSize,
    closeEditModal,
    confirmEditModal,
    addUser,
    changeStatus,
    clearConditions,
    searchUsers,
    changeSort,
    setMaxHeight,
    editUser,
    deleteUser,
  }

  return {
    ...data,
    ...methods,
  }
}