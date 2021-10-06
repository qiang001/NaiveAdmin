import { ref, watch } from 'vue'
import { useResizeContainer } from '@/hooks/useResizeContainer'
export const useUserList = ({ openEditModal, deleteFromDB, queryUsers }) => {
  const maxHeight = ref(0)
  let panelHeight = 0
  const otherTotalHeight = ref(0)
  const { height: actionHeaderHeight } = useResizeContainer('action-header')
  watch(
    actionHeaderHeight,
    () => {
      otherTotalHeight.value = 125 + actionHeaderHeight.value
      maxHeight.value = panelHeight - otherTotalHeight.value
    },
    { immediate: true }
  )
  const setMaxHeight = ({ height }) => {
    if (height) {
      panelHeight = height
      maxHeight.value = panelHeight - otherTotalHeight.value
    }
  }

  const edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }
  const _delete = (row) => {
    const d = $dialog.warning({
      title: '警告',
      content: '确定删除？',
      positiveText: '确定',
      negativeText: '不确定',
      maskClosable: false,
      onPositiveClick: async () => {
        d.loading = true
        await deleteFromDB({ data: row })
        return await queryUsers()
      },
    })
  }
  return {
    maxHeight,
    setMaxHeight,
    edit,
    _delete,
  }
}
