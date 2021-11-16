import { useModal } from '@/hooks/useModal'
import { reactive, unref } from 'vue'
import { IUserResetPassword, IUserListItem } from '../interfaces/data'
import {
  // Input
  I_useApiCenter_changePassword,
  // Output
  I_useResetPasswordModal_open,
  I_useResetPasswordModal_close,
  I_useResetPasswordModal_confirm,
} from '../interfaces/method'
import {
  // Input
  I_useResultModal_openResultModal,
  I_useResultModal_setResultType,
  I_useResultModal_setTexts,
} from '@/hooks/useResultModal'
interface Input {
  _changePassword: I_useApiCenter_changePassword
  setTexts: I_useResultModal_setTexts
  setResultType: I_useResultModal_setResultType
  openResultModal: I_useResultModal_openResultModal
}
export const useResetPasswordModal = ({
  _changePassword,
  setTexts,
  setResultType,
  openResultModal,
}: Input) => {
  // 引入基本弹窗
  const { modalShow: resetPasswordModal, closeModal, openModal } = useModal()

  // 核心数据
  const user = reactive<IUserResetPassword>({
    _id: null,
    password: '',
    passwordConfirm: '',
  })

  // 核心方法
  const open: I_useResetPasswordModal_open = async ({ data }) => {
    setUser(data)
    openModal()
  }

  const close: I_useResetPasswordModal_close = () => {
    resetUser()
    closeModal()
  }

  const confirm: I_useResetPasswordModal_confirm = async () => {
    try {
      let obj = {
        data: { ...unref(user) },
      }
      await _changePassword(obj)
      setResultType('success')
      setTexts({ description: '密码重置成功！' })
      close()
    } catch (error) {
      setResultType('error')
      setTexts({ description: error })
    }
    openResultModal()
  }

  function setUser(data: IUserListItem) {
    user._id = data._id
    user.passwordConfirm = ''
    user.password = ''
  }

  function resetUser() {
    user._id = null
    user.passwordConfirm = ''
    user.password = ''
  }

  // 最终对外暴露
  const data = { resetPasswordModal, user }
  const methods = { open, close, confirm }
  return {
    ...data,
    ...methods,
  }
}
