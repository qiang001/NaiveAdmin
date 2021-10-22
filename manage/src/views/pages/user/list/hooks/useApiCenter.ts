import { useAxios } from '@/api/index'
export const useApiCenter = ({ store, users, useDebounce }) => {
  const request = useAxios(store)
  // 拉取用户列表
  const { ifProcessing: loading, func: getUsers } = useDebounce(
    async ({ filters, sort, pagination }) => {
      const { page, pageSize } = pagination
      let url = `/v1/users?page=${page}&pageSize=${pageSize}`
      let { name, username, ifActive } = filters
      if (name) {
        url += `&name=${name}`
      }
      if (username) {
        url += `&username=${username}`
      }
      if (ifActive !== null) {
        url += `&ifActive=${ifActive}`
      }
      if (sort) {
        url += `&sortRef=${sort}`
      }
      try {
        let { total, payload }:any = await request.get(url)
        users.value = payload
        return { total }
      } catch (error) {
        users.value = []
        return { total: 0 }
      }
    },
    50
  )

  // 拉取角色options
  const getRoleOptions = async () => {
    return await request.get('/v1/users/roles')
  }

  // 保存编辑后的数据
  const saveToDB = async ({ data, type }) => {
    return type == 'edit'
      ? await request.put(`/v1/users/${data._id}`, data)
      : await request.post('/v1/users', data)
  }
  const changePassword = async ({ data }) => {
    return await request.patch(`/v1/users/${data._id}`, data)
  }
  // 删除数据
  const deleteFromDB = async ({ data }) => {
    return await request.delete(`/v1/users/${data._id}`)
  }
  return {
    loading,
    getUsers,
    getRoleOptions,
    saveToDB,
    changePassword,
    deleteFromDB,
  }
}
