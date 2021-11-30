import { h } from '@vue/runtime-core'
import { NSpace, NButton } from 'naive-ui'
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
import {
  // Input
  I_useResultModal_openResultModalAsync,
  I_useResultModal_setResultType,
  I_useResultModal_setTexts,
} from '@/hooks/useResultModal'

interface Input {
  openEditModal: I_useEditModal_open
  openResetPasswordModal: I_useResetPasswordModal_open
  _deleteFromDB: I_useApiCenter_deleteFromDB
  resetPage: I_useConditions_resetPage
  queryUsers: I_useConditions_queryUsers
  setTexts: I_useResultModal_setTexts
  setResultType: I_useResultModal_setResultType
  openResultModalAsync: I_useResultModal_openResultModalAsync
}

export const useUserList = ({
  openEditModal,
  openResetPasswordModal,
  _deleteFromDB,
  resetPage,
  queryUsers,
  setTexts,
  setResultType,
  openResultModalAsync,
}: Input) => {
  // 响应式表格
  const { dynamicElements, dynamicWidth, maxHeight, size } = useResponsiveTable(
    {
      size: 'small',
      tool: true,
      pagination: true,
      containerId: 'page-panel',
      otherElementIds: ['componentId', 'action-header'],
      dynamicWidth: 240,
    }
  )

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
      bordered: true,
      action: () => {
        return h(
          NSpace,
          { align: 'center' },
          {
            default: () => [
              h(
                NButton,
                {
                  size: 'small',
                  secondary: true,
                  onClick: () => handler('cancel'),
                },
                { default: () => '不确定' }
              ),
              h(
                NButton,
                {
                  size: 'small',
                  loading: d.loading,
                  disabled: d.loading,
                  secondary: true,
                  type: 'primary',
                  onClick: () => handler('confirm'),
                },
                { default: () => '确定' }
              ),
            ],
          }
        )
      },
      maskClosable: false,
    })
    const handler = async (type: 'cancel' | 'confirm') => {
      if (type === 'cancel') {
        return d.destroy()
      }
      try {
        d.loading = true
        await _deleteFromDB({ data: row })
        setResultType('success')
        setTexts({ description: '删除成功', confirmBtnText: '点击继续' })
      } catch (error) {
        setResultType('error')
        setTexts({
          content: '抱歉',
          description: error,
          confirmBtnText: 'OK，了解了',
        })
      }
      d.destroy()
      await openResultModalAsync()
      await queryUsers()
    }
  }
  const data = { dynamicElements, dynamicWidth, maxHeight, size }
  const method = { refresh, edit, resetPassword, _delete }
  return {
    ...data,
    ...method,
  }
}
