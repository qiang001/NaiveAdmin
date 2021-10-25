import { useDebounce } from '@/hooks/useDebounce'
import { ref, reactive, unref, Ref } from 'vue'
import { IRoleListItem } from '../interfaces/data'
import {
  // Input
  I_useApiCenter_saveToDB,
  I_initController_queryRoles,
  // Output
  I_useEditModal_open,
  I_useEditModal_close,
  I_useEditModal_confirm,
} from '../interfaces/method'
interface Input {
  queryRoles: I_initController_queryRoles
  saveToDB: I_useApiCenter_saveToDB
}
export const useEditModal = ({ queryRoles, saveToDB }: Input) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  // 防抖包裹
  const {
    ifProcessing: confirmLoading,
    func: _saveToDB,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_saveToDB } =
    useDebounce(saveToDB)
  const role = reactive<IRoleListItem>({
    _id: null,
    name: '',
    desc: '',
    pageAuths: [],
    pageCheckedAuths: [],
    contentAuths: [],
    logicAuths: [],
  })
  // 核心方法
  const open: I_useEditModal_open = ({ data, type }) => {
    if (type == 'edit') {
      setRole(data)
    } else {
      resetRole()
    }
    editModal.value = true
  }

  const close: I_useEditModal_close = () => {
    editModal.value = false
  }

  const confirm: I_useEditModal_confirm = async ({
    pageAuths,
    pageCheckedAuths,
    contentAuths,
    logicAuths,
  }) => {
    try {
      const obj: { data: IRoleListItem; type: 'create' | 'edit' } = {
        data: {
          ...unref(role),
          pageAuths,
          pageCheckedAuths,
          contentAuths,
          logicAuths,
        },
        type: ifEdit.value ? 'edit' : 'create',
      }
      await _saveToDB(obj)
      window.$message.success(
        obj.type == 'edit' ? '恭喜你，编辑成功！' : '恭喜你，添加成功！'
      )
      close()
      await queryRoles()
    } catch (error) {
      window.$message.error(error)
    }
  }

  function setRole(data: IRoleListItem) {
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
