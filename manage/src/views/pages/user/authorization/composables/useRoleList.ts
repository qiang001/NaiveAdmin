import { useDebounce } from '@/hooks/useDebounce'
import { useResponsiveTable } from '@/hooks/useResponsiveTable'
import { unref, Ref } from 'vue'
import {
  // Input
  I_initController_queryRoles,
  I_useEditModal_open,
  I_useApiCenter_deleteFromDB,
  // Output
  I_useRoleList_edit,
  I_useRoleList__delete,
} from '../interfaces/method'

interface Input {
  queryRoles: I_initController_queryRoles
  openEditModal: I_useEditModal_open
  deleteFromDB: I_useApiCenter_deleteFromDB
}
export const useRoleList = ({
  queryRoles,
  openEditModal,
  deleteFromDB,
}: Input) => {
  // 响应式表格
  const { maxHeight } = useResponsiveTable({
    containerId: 'page-panel',
    otherHeightTotalStatic: 146,
    otherElementIds: [],
  })
  // 防抖包裹
  const {
    func: _deleteFromDB,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_deleteFromDB } =
    useDebounce(deleteFromDB)
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
          window.$message.success(`恭喜你，删除成功！`)
        } catch (error) {
          window.$message.error(error)
        }
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
