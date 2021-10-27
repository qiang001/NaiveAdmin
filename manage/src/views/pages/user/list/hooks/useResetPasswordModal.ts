import { useDebounce } from '@/hooks/useDebounce'
import { ref, reactive, unref, Ref } from 'vue'
import { IUserResetPassword, IUserListItem } from '../interfaces/data'
import {
  // Input
  I_useApiCenter_changePassword,
  // Output
  I_useResetPasswordModal_open,
  I_useResetPasswordModal_close,
  I_useResetPasswordModal_confirm,
} from '../interfaces/method'
interface Input {
  changePassword: I_useApiCenter_changePassword
}
export const useResetPasswordModal = ({ changePassword }: Input) => {
  // 维护状态数据
  const resetPasswordModal = ref(false)
  // 防抖包裹
  const {
    ifProcessing: confirmLoading,
    func: _changePassword,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_changePassword } =
    useDebounce(changePassword)
  const user = reactive<IUserResetPassword>({
    _id: null,
    password: '',
    passwordConfirm: '',
  })
  // 核心方法
  const open: I_useResetPasswordModal_open = async ({ data }) => {
    setUser(data)
    resetPasswordModal.value = true
  }

  const close: I_useResetPasswordModal_close = () => {
    resetUser()
    resetPasswordModal.value = false
  }

  const confirm: I_useResetPasswordModal_confirm = async () => {
    try {
      let obj = {
        data: { ...unref(user) },
      }
      await _changePassword(obj)
      window.$message.success(`恭喜你，密码重置成功！`)
      close()
    } catch (error) {
      window.$message.error(error.message)
    }
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
  const data = { resetPasswordModal, confirmLoading, user }
  const methods = { open, close, confirm }
  return {
    ...data,
    ...methods,
  }
}
