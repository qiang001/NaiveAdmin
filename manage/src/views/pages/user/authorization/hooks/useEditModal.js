import { ref, reactive, unref } from 'vue'
export const useEditModal = ({ getRoles, saveToDB,useDebounce }) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  const { ifProcessing: confirmLoading, func: _saveToDB } =
  useDebounce(saveToDB)
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
      const obj = {
        data: { ...unref(role), pageAuths, pageCheckedAuths,contentAuths,logicAuths },
        type: ifEdit.value ? 'edit' : 'create',
      }
      await _saveToDB(obj)
      $message.success(obj.type=='edit'?'恭喜你，编辑成功！':'恭喜你，添加成功！')
      close()
      await getRoles()
    } catch (error) {
      $message.error(error)
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
