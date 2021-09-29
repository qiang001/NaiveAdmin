import { ref, onMounted } from 'vue'
export const useRoleList = (getRoles, openAuthSettingModal) => {
  const roles = ref([])
  onMounted(() => {
    roles.value = getRoles(10)
  })
  const edit = (row) => {
    openAuthSettingModal(row)
  }
  return {
    roles,
    edit,
  }
}
