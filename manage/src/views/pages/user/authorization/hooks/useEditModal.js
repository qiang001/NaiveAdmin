import { ref, reactive } from 'vue'
export const useEditModal = ({ getRoles, saveToDB }) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  const confirmLoading = ref(false)
  const role = reactive({
    name: '',
    desc: '',
    tags: [],
  })
  // 核心方法
  const open = ({ data, type }) => {
    if (type == 'edit') {
      setRole(data)
    } else {
      resetRole()
    }
    editModal.value = true
  }

  const close = () => {
    editModal.value = false
  }

  const confirm = async ({ authKeys, checkedKeys }) => {
    confirmLoading.value = true
    await saveToDB({
      data: {
        name: role.name,
        desc: role.desc,
        authKeys,
        checkedKeys,
      },
      type: ifEdit.value ? 'edit' : 'create',
    })
    confirmLoading.value = false
    close()
    await getRoles()
  }

  function setRole(data) {
    role.name = data.name
    role.desc = data.desc
    role.tags = data.tags
    ifEdit.value = true
  }

  function resetRole() {
    role.name = ''
    role.desc = ''
    role.tags = []
    ifEdit.value = false
  }
  // 最终对外暴露
  const data = { ifEdit, editModal, confirmLoading, role }
  const methods = { open, close, confirm }
  return {
    ...data,
    ...methods,
  }
}
