import { useDebounce } from '@/hooks/useDebounce'
import { Ref } from 'vue'
import { useResponsiveTable } from '@/hooks/useResponsiveTable'
import {
  // Input
  I_useEditModal_open,
  I_useResetPasswordModal_open,
  I_useApiCenter_deleteFromDB,
  I_useConditions_resetPage,
  I_useConditions_queryUsers,
  // Output
  I_useUserList_refresh,
  I_useUserList_edit,
  I_useUserList_resetPassword,
  I_useUserList__delete,
} from '../interfaces/method'

interface Input {
  openEditModal: I_useEditModal_open
  openResetPasswordModal: I_useResetPasswordModal_open
  _deleteFromDB: I_useApiCenter_deleteFromDB
  resetPage: I_useConditions_resetPage
  queryUsers: I_useConditions_queryUsers
}

export const useUserList = ({
  openEditModal,
  openResetPasswordModal,
  _deleteFromDB,
  resetPage,
  queryUsers,
}: Input) => {
  // 响应式表格
  const { dynamicWidth, maxHeight } = useResponsiveTable({
    dynamicWidth: 480,
    containerId: 'page-panel',
    otherHeightTotalStatic: 166,
    otherElementIds: ['action-header'],
  })

  // 核心方法
  const refresh: I_useUserList_refresh = async () => {
    resetPage()
    await queryUsers()
  }

  const edit: I_useUserList_edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }

  const resetPassword: I_useUserList_resetPassword = (row) => {
    openResetPasswordModal({ data: row })
  }

  const _delete: I_useUserList__delete = (row) => {
    const d = window.$dialog.warning({
      title: '警告',
      content: '确定删除？',
      positiveText: '确定',
      negativeText: '不确定',
      maskClosable: false,
      onPositiveClick: async () => {
        d.loading = true
        try {
          await _deleteFromDB({ data: row })
          window.$message.success(`恭喜你，删除成功！`)
        } catch (error) {
          window.$message.error(error)
        }
        return await queryUsers()
      },
    })
  }
  const data = { dynamicWidth, maxHeight }
  const method = { refresh, edit, resetPassword, _delete }
  return {
    ...data,
    ...method,
  }
}
