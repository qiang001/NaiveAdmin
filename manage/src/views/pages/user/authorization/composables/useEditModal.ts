import { useModal, modalType } from '@/hooks/useModal'
import { reactive, unref } from 'vue'
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
  _saveToDB: I_useApiCenter_saveToDB
}
export const useEditModal = ({ queryRoles, _saveToDB }: Input) => {
  // 引入基本弹窗
  const {
    modalShow: editModal,
    modalType: editModalType,
    openModal,
    closeModal,
    setModalType,
  } = useModal()

  // 核心数据
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
    openModal()
  }

  const close: I_useEditModal_close = () => {
    closeModal()
  }

  const confirm: I_useEditModal_confirm = async ({
    pageAuths,
    pageCheckedAuths,
    contentAuths,
    logicAuths,
  }) => {
    try {
      const obj: { data: IRoleListItem; type: modalType } = {
        data: {
          ...unref(role),
          pageAuths,
          pageCheckedAuths,
          contentAuths,
          logicAuths,
        },
        type: editModalType.value,
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
    setModalType('edit')
  }

  function resetRole() {
    role._id = null
    role.name = ''
    role.desc = ''
    role.pageAuths = []
    role.pageCheckedAuths = []
    role.contentAuths = []
    role.logicAuths = []
    setModalType('create')
  }
  // 最终对外暴露
  const data = { editModalType, editModal, role }
  const methods = { open, close, confirm }
  return {
    ...data,
    ...methods,
  }
}
