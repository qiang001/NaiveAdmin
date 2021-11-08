import { useAxios } from '@/api/index'
import { useDebounce } from '@/hooks/useDebounce'
import { Ref } from 'vue'
import { IUserListItem } from '../interfaces/data'
import {
  // Output
  I_useApiCenter_getUsers,
  I_useApiCenter_getRoleOptions,
  I_useApiCenter_saveToDB,
  I_useApiCenter_changePassword,
  I_useApiCenter_deleteFromDB,
} from '../interfaces/method'

export const useApiCenter = () => {
  const request = useAxios()
  // 拉取用户列表
  const getUsers: I_useApiCenter_getUsers = async ({
    filters,
    sort,
    pagination,
  }) => {
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
      let { total, payload } = await request.get<
        never,
        { total: number; payload: IUserListItem[] }
      >(url)
      return { total, payload }
    } catch (error) {
      return { total: 0, payload: [] }
    }
  }
  const {
    ifProcessing: loading,
    func: _getUsers,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_getUsers } =
    useDebounce(getUsers, 200)

  // 拉取角色options
  const getRoleOptions: I_useApiCenter_getRoleOptions = async () => {
    return await request.get('/v1/users/roles')
  }
  const {
    ifProcessing: rolesLoading,
    func: _getRoleOptions,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_getRoleOptions } =
    useDebounce(getRoleOptions, 200)

  // 保存编辑后的数据
  const saveToDB: I_useApiCenter_saveToDB = async ({ data, type }) => {
    return type == 'edit'
      ? await request.put(`/v1/users/${data._id}`, data)
      : await request.post('/v1/users', data)
  }
  const changePassword: I_useApiCenter_changePassword = async ({ data }) => {
    return await request.patch(`/v1/users/${data._id}`, data)
  }
  // 删除数据
  const deleteFromDB: I_useApiCenter_deleteFromDB = async ({ data }) => {
    return await request.delete(`/v1/users/${data._id}`)
  }
  const data = { loading,rolesLoading }
  const method = {
    _getUsers,
    _getRoleOptions,
    saveToDB,
    changePassword,
    deleteFromDB,
  }
  return {
    ...data,
    ...method,
  }
}
