import { useDebounce } from '@/hooks/useDebounce'
import { useModal, modalType } from '@/hooks/useModal'
import { ref, reactive, unref, Ref } from 'vue'
import { IUserListItem, IEditUser, IRoleOption } from '../interfaces/data'
import {
  // Input
  I_useApiCenter_getRoleOptions,
  I_useApiCenter_saveToDB,
  I_useConditions_resetFilters,
  I_useConditions_resetSort,
  I_useConditions_resetPage,
  I_useConditions_queryUsers,
  // Output
  I_useEditModal_open,
  I_useEditModal_close,
  I_useEditModal_confirm,
} from '../interfaces/method'
interface Input {
  _getRoleOptions: I_useApiCenter_getRoleOptions
  _saveToDB: I_useApiCenter_saveToDB
  resetFilters: I_useConditions_resetFilters
  resetSort: I_useConditions_resetSort
  resetPage: I_useConditions_resetPage
  queryUsers: I_useConditions_queryUsers
}
export const useEditModal = ({
  _getRoleOptions,
  _saveToDB,
  resetFilters,
  resetSort,
  resetPage,
  queryUsers,
}: Input) => {
  // 引入基本弹窗
  const {
    modalShow: editModal,
    modalType: editModalType,
    openModal,
    closeModal,
    setModalType,
  } = useModal()

  // 核心数据
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
    openModal()
    roleOptions.value = await _getRoleOptions()
  }

  const close: I_useEditModal_close = () => {
    closeModal()
  }

  const confirm: I_useEditModal_confirm = async () => {
    let obj: { data: IEditUser; type: modalType } = {
      data: { ...unref(user), roles: [...unref(user).roles] },
      type: editModalType.value,
    }
    try {
      await _saveToDB(obj)
      window.$message.success(
        obj.type == 'edit' ? '恭喜你，编辑成功！' : '恭喜你，添加成功！'
      )
      close()
      if (obj.type == 'create') {
        resetFilters()
        resetSort()
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
    setModalType('edit')
  }

  function resetUser() {
    user._id = null
    user.name = ''
    user.username = ''
    user.password = ''
    user.roles = []
    user.ifActive = false
    setModalType('create')
  }

  // 最终对外暴露
  const data = { editModalType, editModal, user, roleOptions }
  const methods = { open, close, confirm }
  return {
    ...data,
    ...methods,
  }
}
