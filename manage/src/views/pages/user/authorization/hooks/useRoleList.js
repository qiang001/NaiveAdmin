import { onMounted } from 'vue'
export const useRoleList = ({ getRoles, openEditModal }) => {
  onMounted(async () => {
    await getRoles(1000)
  })
  const edit = (row) => {
    openEditModal({ data: row, type: 'edit' })
  }
  return {
    edit,
  }
}
