import { ref, reactive, unref } from 'vue'
export const useEditModal = ({ getRoles, saveToDB }) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  const confirmLoading = ref(false)
  const role = reactive({
    _id: null,
    name: '',
    desc: '',
    pageAuths: [],
    pageCheckedAuths: [],
    contentAuths: [],
    logicAuths: [],
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

  const confirm = async ({ pageAuths, pageCheckedAuths,contentAuths,logicAuths }) => {
    try {
      confirmLoading.value = true
      await saveToDB({
        data: { ...unref(role), pageAuths, pageCheckedAuths,contentAuths,logicAuths },
        type: ifEdit.value ? 'edit' : 'create',
      })
      confirmLoading.value = false
      close()
      await getRoles()
    } catch (error) {
      confirmLoading.value = false
      $message.error(error.message)
    }
  }

  function setRole(data) {
    role._id = data._id
    role.name = data.name
    role.desc = data.desc
    role.pageAuths = data.pageAuths
    role.pageCheckedAuths = data.pageCheckedAuths
    role.contentAuths = data.contentAuths
    role.logicAuths = data.logicAuths
    ifEdit.value = true
  }

  function resetRole() {
    role._id = null
    role.name = ''
    role.desc = ''
    role.pageAuths = []
    role.pageCheckedAuths = []
    role.contentAuths = []
    role.logicAuths = []
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
