import { ref, reactive, unref } from 'vue'
import {IUserResetPassword} from '../interfaces/user'
export const useResetPasswordModal = ({
    changePassword,
    useDebounce
}) => {
  // 维护状态数据
  const resetPasswordModal = ref(false)
  const { ifProcessing: confirmLoading, func: _changePassword } =
  useDebounce(changePassword)
  const user = reactive<IUserResetPassword>({
    _id: null,
    password: '',
    passwordConfirm:''
  })
  // 核心方法
  const open = async ({data}) => {
    setUser(data)
    resetPasswordModal.value = true
  }

  const close = () => {
    resetUser()
    resetPasswordModal.value = false
  }

  const confirm = async () => {
    try {
      let obj = {
        data: { ...unref(user)},
      }
      await _changePassword(obj)
      window.$message.success(`恭喜你，密码重置成功！`)
      close()
    } catch (error) {
      window.$message.error(error.message)
    }
  }

  function setUser(data) {
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
