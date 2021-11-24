import { useResponsiveTable } from '@/hooks/useResponsiveTable'
import { unref, h } from 'vue'
import { NSpace, NButton } from 'naive-ui'
import {
  // Input
  I_initController_queryRoles,
  I_useEditModal_open,
  I_useApiCenter_deleteFromDB,
  // Output
  I_useRoleList_edit,
  I_useRoleList__delete,
} from '../interfaces/method'
import {
  // Input
  I_useResultModal_openResultModal,
  I_useResultModal_setResultType,
  I_useResultModal_setTexts,
} from '@/hooks/useResultModal'
interface Input {
  queryRoles: I_initController_queryRoles
  openEditModal: I_useEditModal_open
  _deleteFromDB: I_useApiCenter_deleteFromDB
  setTexts: I_useResultModal_setTexts
  setResultType: I_useResultModal_setResultType
  openResultModal: I_useResultModal_openResultModal
}
export const useRoleList = ({
  queryRoles,
  openEditModal,
  _deleteFromDB,
  setTexts,
  setResultType,
  openResultModal,
}: Input) => {
  // 响应式表格
  const { maxHeight } = useResponsiveTable({
    tool: false,
    pagination: false,
    containerId: 'page-panel',
    otherElementIds: ['action-header'],
  })

  // 核心方法
  const edit: I_useRoleList_edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }

  const _delete: I_useRoleList__delete = (row) => {
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
                { default: () => '不确定，再想想' }
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
                { default: () => '立即删除' }
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
        await _deleteFromDB({ data: { ...unref(row) } })
        setResultType('success')
        setTexts({ description: '删除成功' })
      } catch (error) {
        setResultType('error')
        setTexts({ description: error, confirmBtnText: '好吧，了解了' })
      }
      d.destroy()
      openResultModal()
      await queryRoles()
    }
  }
  const data = { maxHeight }
  const method = { edit, _delete }
  return {
    ...data,
    ...method,
  }
}
