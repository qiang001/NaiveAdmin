import { onMounted } from 'vue'
export const useRoleList = ({ getRoles, openEditModal }) => {
  onMounted(async () => {
    await getRoles(5)
  })
  const edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }
  return {
    edit,
  }
}
