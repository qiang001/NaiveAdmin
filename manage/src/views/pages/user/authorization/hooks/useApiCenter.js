import request from '@/api/index.js'
export const useApiCenter = (roles) => {
  // 导出表格
  const exportData = async () => {
    console.log('加载中...')
    return new Promise((res) => {
      setTimeout(() => {
        $message.success('恭喜你，导出成功！')
        res()
      }, 1500)
    })
  }

  // 拉取角色列表
  const getRoles = async () => {
    try {
      roles.value = await request.get('/v1/roles')
    } catch (error) {
      console.log(error)
    }
  }
  // 保存编辑后的数据
  const saveToDB = async ({ data, type }) => {
    try {
      type == 'edit'
      ? await request.put(`/v1/roles/${data._id}`, data)
      : await request.post('/v1/roles', data)
      $message.success(`恭喜你，${type}成功！`)
    } catch (error) {
      throw new Error(error)
    }
  }
  // 删除数据
  const deleteFromDB = async ({ data }) => {
    try {
      await request.delete(`/v1/roles/${data._id}`)
      $message.success(`恭喜你，删除成功！`)
    } catch (error) {
      $message.error(error)
    }
  }
  return {
    exportData,
    getRoles,
    saveToDB,
    deleteFromDB,
  }
}
