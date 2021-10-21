import axios from 'axios'

export const useLoginApi = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL,
    timeout: 30 * 60 * 1000,
  })

  instance.interceptors.response.use(
    function (response) {
      return response.data
    },
    function (error) {
      if (!error.response) {
        return Promise.reject('服务器连接失败，请检查网络状态')
      }
      return Promise.reject(error.response.data.error)
    }
  )

  async function loginUser(data) {
    try {
      let token = await instance.post('/v1/users/login', data)
      $message.success('恭喜你，登录成功！')
      return token
    } catch (error) {
      $message.error(error)
    }
  }
  async function getUserInfo(token) {
    try {
      return await instance.get('/v1/users/userInfo', {
        headers: { authorization: token },
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    loginUser,
    getUserInfo,
  }
}
