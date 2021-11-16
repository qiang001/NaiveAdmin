import { useResponsiveTable } from '@/hooks/useResponsiveTable'
import { unref } from 'vue'
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
    containerId: 'page-panel',
    otherHeightTotalStatic: 95,
    otherElementIds: [],
  })

  // 核心方法
  const edit: I_useRoleList_edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }

  const _delete: I_useRoleList__delete = (row) => {
    const d = window.$dialog.warning({
      title: '警告',
      content: '确定删除？',
      positiveText: '确定',
      negativeText: '不确定',
      maskClosable: false,
      onPositiveClick: async () => {
        d.loading = true
        try {
          await _deleteFromDB({ data: { ...unref(row) } })
          setResultType('success')
          setTexts({ description: '删除成功' })
        } catch (error) {
          setResultType('error')
          setTexts({ description: error, confirmBtnText: '好吧，了解了' })
        }
        openResultModal()
        return await queryRoles()
      },
    })
  }
  const data = { maxHeight }
  const method = { edit, _delete }
  return {
    ...data,
    ...method,
  }
}
