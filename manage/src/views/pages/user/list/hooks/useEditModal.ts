import { useDebounce } from '@/hooks/useDebounce'
import { ref, reactive, unref, Ref } from 'vue'
import { IUserListItem, IEditUser, IRoleOption } from '../interfaces/data'
import {
  // Input
  I_useApiCenter_getRoleOptions,
  I_useApiCenter_saveToDB,
  I_useFilters_resetPage,
  I_useFilters_queryUsers,
  // Output
  I_useEditModal_open,
  I_useEditModal_close,
  I_useEditModal_confirm,
} from '../interfaces/method'
interface Input {
  getRoleOptions: I_useApiCenter_getRoleOptions
  saveToDB: I_useApiCenter_saveToDB
  resetPage: I_useFilters_resetPage
  queryUsers: I_useFilters_queryUsers
}
export const useEditModal = ({
  getRoleOptions,
  saveToDB,
  resetPage,
  queryUsers,
}: Input) => {
  // 维护状态数据
  const ifEdit = ref(false)
  const editModal = ref(false)
  // 防抖包裹
  const {
    ifProcessing: confirmLoading,
    func: _saveToDB,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_saveToDB } =
    useDebounce(saveToDB)
  const user = reactive<IEditUser>({
    _id: null,
    name: '',
    username: '',
    password: '',
    roles: [],
    ifActive: false,
  })
  const roleOptions = ref<Array<IRoleOption>>([])
  // 核心方法
  const open: I_useEditModal_open = async ({ data, type }) => {
    if (type == 'edit') {
      setUser(data)
    } else {
      resetUser()
    }
    roleOptions.value = await getRoleOptions()
    editModal.value = true
  }

  const close: I_useEditModal_close = () => {
    editModal.value = false
  }

  const confirm: I_useEditModal_confirm = async () => {
    let obj: { data: IEditUser; type: 'create' | 'edit' } = {
      data: { ...unref(user), roles: [...unref(user).roles] },
      type: ifEdit.value ? 'edit' : 'create',
    }
    try {
      await _saveToDB(obj)
      window.$message.success(
        obj.type == 'edit' ? '恭喜你，编辑成功！' : '恭喜你，添加成功！'
      )
      close()
      if (obj.type == 'create') {
        resetPage()
      }
      await queryUsers()
    } catch (error) {
      window.$message.error(error)
    }
  }

  function setUser(data: IUserListItem) {
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
