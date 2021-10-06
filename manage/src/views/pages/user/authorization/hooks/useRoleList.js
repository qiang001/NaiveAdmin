import { ref } from 'vue'
export const useRoleList = ({ openEditModal, deleteFromDB }) => {
  const maxHeight = ref(0)
  const otherTotalHeight = 126
  const setMaxHeight = ({ height }) => {
    if(height){
      maxHeight.value = height - otherTotalHeight
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
        return await deleteFromDB({ data: row })
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
