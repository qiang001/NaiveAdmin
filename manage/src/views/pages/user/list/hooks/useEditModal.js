import { ref, reactive, unref } from 'vue'
export const useEditModal = ({
  getRoleOptions,
  saveToDB,
  resetPage,
  queryUsers,
  useDebounce,
}) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  const { ifProcessing: confirmLoading, func: _saveToDB } =
    useDebounce(saveToDB)
  const user = reactive({
    _id: null,
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
    let obj = {
      data: { ...unref(user), roles: [...unref(user).roles] },
      type: ifEdit.value ? 'edit' : 'create',
    }
    try {
      await _saveToDB(obj)
      $message.success(obj.type=='edit'?'恭喜你，编辑成功！':'恭喜你，添加成功！')
      close()
      if (obj.type == 'create') {
        resetPage()
      }
      await queryUsers()
    } catch (error) {
      $message.error(error)
    }
  }

  function setUser(data) {
    user._id = data._id
    user.name = data.name
    user.username = data.username
    user.roles = data.roles.map((r) => r._id)
    user.ifActive = data.ifActive
    ifEdit.value = true
  }

  function resetUser() {
    user._id = null
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
