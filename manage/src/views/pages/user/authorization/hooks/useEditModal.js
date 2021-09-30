import { ref, reactive } from 'vue'
export const useEditModal = ({ getRoles, saveToDB }) => {
  const ifEdit = ref(false)
  const showModal = ref(false)
  const role = reactive({
    name: '',
    desc: '',
    tags: [],
  })
  const setRole = (data) => {
    role.name = data.name
    role.desc = data.desc
    role.tags = data.tags
  }
  const resetRole = () => {
    role.name = ''
    role.desc = ''
    role.tags = []
  }
  const open = ({ data, type }) => {
    if (type == 'edit') {
      setRole(data)
      ifEdit.value = true
    } else {
      resetRole()
      ifEdit.value = false
    }
    showModal.value = true
  }
  const close = () => {
    resetRole()
    showModal.value = false
  }
  const loading = ref(false)
  const save = async ({ authKeys, checkedKeys }) => {
    loading.value = true
    await saveToDB({
      data: {
        name: role.name,
        desc: role.desc,
        authKeys,
        checkedKeys,
      },
      type: ifEdit.value ? 'edit' : 'create',
    })
    loading.value = false
    close()
    await getRoles(6)
  }
  return {
    ifEdit,
    showModal,
    role,
    open,
    close,
    loading,
    save,
  }
}
