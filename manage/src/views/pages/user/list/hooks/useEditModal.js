import { ref, reactive, unref } from 'vue'
export const useEditModal = ({
  getRoleOptions,
  saveToDB,
  resetPage,
  queryUsers,
}) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  const confirmLoading = ref(false)
  const user = reactive({
    id: null,
    name: '',
    username: '',
    password: '',
    roles: [],
    ifActive: false,
  })
  const roleOptions = ref([])
  // 核心方法
  const open = async ({ data, type }) => {
    if (type == 'edit') {
      setUser(data)
    } else {
      resetUser()
    }
    roleOptions.value = await getRoleOptions()
    editModal.value = true
  }

  const close = () => {
    editModal.value = false
  }

  const confirm = async () => {
    confirmLoading.value = true
    let obj = {
      data: { ...unref(user) },
      type: ifEdit.value ? 'edit' : 'create',
    }
    await saveToDB(obj)
    confirmLoading.value = false
    close()
    if (obj.type == 'create') {
      resetPage()
    }
    await queryUsers()
  }

  function setUser(data) {
    user.id = data.id
    user.name = data.name
    user.username = data.username
    user.roles = [...data.roles]
    user.ifActive = data.ifActive
    ifEdit.value = true
  }

  function resetUser() {
    user.id = null
    user.name = ''
    user.username = ''
    user.password = ''
    user.roles = []
    user.ifActive = false
    ifEdit.value = false
  }

  // 最终对外暴露
  const data = { ifEdit, editModal, confirmLoading, user, roleOptions }
  const methods = { open, close, confirm }
  return {
    ...data,
    ...methods,
  }
}
