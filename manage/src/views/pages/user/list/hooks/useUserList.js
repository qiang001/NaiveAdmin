import { ref } from 'vue'
export const useUserList = ({ openEditModal, deleteFromDB,queryUsers }) => {
  const maxHeight = ref(0)
  const otherTotalHeight = 208
  const setMaxHeight = ({ width, height }) => {
    maxHeight.value = height - otherTotalHeight
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
    _delete
  }
}
