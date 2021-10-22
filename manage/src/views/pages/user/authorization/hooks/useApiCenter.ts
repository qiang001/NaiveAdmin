import { useAxios } from '@/api/index'
export const useApiCenter = ({ store, roles, useDebounce }) => {
  const request = useAxios(store)
  // 导出表格
  const exportData = async () => {
    console.log('加载中...')
    return new Promise((res) => {
      setTimeout(() => {
        window.$message.success('恭喜你，导出成功！')
        res(true)
      }, 1500)
    })
  }

  // 拉取角色列表
  const { ifProcessing: loading, func: getRoles } = useDebounce(async () => {
    try {
      roles.value = await request.get('/v1/roles')
    } catch (error) {
      console.log(error)
    }
  }, 50)
  // 保存编辑后的数据
  const saveToDB = async ({ data, type }) => {
    return type == 'edit'
      ? await request.put(`/v1/roles/${data._id}`, data)
      : await request.post('/v1/roles', data)
  }
  // 删除数据
  const deleteFromDB = async ({ data }) => {
    return await request.delete(`/v1/roles/${data._id}`)
  }
  return {
    exportData,
    loading,
    getRoles,
    saveToDB,
    deleteFromDB,
  }
}
