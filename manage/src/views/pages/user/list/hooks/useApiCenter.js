import { ref } from 'vue'
import {useAxios} from '@/api/index.js'
export const useApiCenter = ({store,users}) => {
  const request = useAxios(store)
  const loading = ref(false)
  // 拉取用户列表
  const getUsers = async ({ filters, sort, pagination }) => {
    loading.value = true
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
      let { total, payload } = await request.get(url)
      users.value = payload
      loading.value = false
      return { total }
    } catch (error) {
      users.value = []
      loading.value = false
      return { total: 0 }
    }
  }
  // 拉取角色options
  const getRoleOptions = async () => {
    return await request.get('/v1/users/roles')
  }

  // 保存编辑后的数据
  const saveToDB = async ({ data, type }) => {
    try {
      type == 'edit'
      ? await request.put(`/v1/users/${data._id}`, data)
      : await request.post('/v1/users', data)
      $message.success(`恭喜你，${type}成功！`)
    } catch (error) {
      throw new Error(error)
    }
  }
  const changePassword = async({data})=>{
    try {
      await request.patch(`/v1/users/${data._id}`,data)
      $message.success(`恭喜你，密码重置成功！`)
    } catch (error) {
      $message.error(error)
    }
  }
  // 删除数据
  const deleteFromDB = async ({ data }) => {
    try {
      await request.delete(`/v1/users/${data._id}`)
      $message.success(`恭喜你，删除成功！`)
    } catch (error) {
      $message.error(error)
    }
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
