import axios from 'axios'

export interface IUserInfo {
  _id: string
  username: string
  name: string
  roles: Array<{
    pageAuths: string[]
    contentAuths: string[]
    logicAuths: string[]
  }>
}

export const useLoginApi = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL as string,
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

  async function loginUser(data: {
    username: string
    password: string
  }): Promise<string> {
    try {
      let token = await instance.post<
        { username: string; password: string },
        string
      >('/v1/users/login', data)
      window.$message.success('恭喜你，登录成功！')
      return token
    } catch (error) {
      window.$message.error(error)
    }
  }

  async function getUserInfo(token: string): Promise<IUserInfo> {
    try {
      return await instance.get<any, IUserInfo>('/v1/users/userInfo', {
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
