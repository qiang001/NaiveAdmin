import { ref, reactive, unref } from 'vue'
export const useResetPasswordModal = ({
    changePassword,
}) => {
  // 维护状态数据
  const resetPasswordModal = ref(false)
  const confirmLoading = ref(false)
  const user = reactive({
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
      confirmLoading.value = true
      let obj = {
        data: { ...unref(user)},
      }
      await changePassword(obj)
      confirmLoading.value = false
      close()
    } catch (error) {
      confirmLoading.value = false
      $message.error(error.message)
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
