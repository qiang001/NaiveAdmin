import { onMounted, ref } from 'vue'
export const useRoleList = ({ getRoles, openEditModal }) => {
  const maxHeight = ref(0)
  const otherTotalHeight = 126
  const setMaxHeight = ({ width, height }) => {
    maxHeight.value = height - otherTotalHeight
  }
  onMounted(async () => {
    await getRoles(1000)
  })
  const edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }
  return {
    maxHeight,
    setMaxHeight,
    edit,
  }
}
