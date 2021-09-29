import { ref } from 'vue'
export const useAuthSetting = (saveToDB) => {
  const showModal = ref(false)
  const role = ref(null)
  const open = (row) => {
    role.value = row
    showModal.value = true
  }
  const close = () => {
    role.value = null
    showModal.value = false
  }
  const save = ({ authKeys, checkedKeys }) => {
    saveToDB(authKeys,checkedKeys)
    close()
  }
  return {
    showModal,
    open,
    close,
    save,
  }
}
