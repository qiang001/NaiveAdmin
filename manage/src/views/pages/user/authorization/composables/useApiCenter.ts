import { useAxios } from '@/api/index'
import { useDebounce } from '@/hooks/useDebounce'
import { Ref } from 'vue'
import {
  I_useApiCenter_exportData,
  I_useApiCenter_getRoles,
  I_useApiCenter_saveToDB,
  I_useApiCenter_deleteFromDB,
} from '../interfaces/method'
export const useApiCenter = () => {
  const request = useAxios()
  // 导出表格
  const exportData: I_useApiCenter_exportData = async () => {
    console.log('加载中...')
    return new Promise<boolean>((res) => {
      setTimeout(() => {
        res(true)
      }, 3000)
    })
  }
  const {
    ifProcessing: exportLoading,
    func: _exportData,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_exportData } =
    useDebounce(exportData, 200)

  // 拉取角色列表
  const getRoles: I_useApiCenter_getRoles = async () => {
    try {
      return await request.get('/v1/roles')
    } catch (error) {
      console.log(error)
    }
  }
  const {
    ifProcessing: loading,
    func: _getRoles,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_getRoles } =
    useDebounce(getRoles, 200)

  // 保存编辑后的数据
  const saveToDB: I_useApiCenter_saveToDB = async ({ data, type }) => {
    return type == 'edit'
      ? await request.put(`/v1/roles/${data._id}`, data)
      : await request.post('/v1/roles', data)
  }
  const {
    ifProcessing: confirmLoading,
    func: _saveToDB,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_saveToDB } =
    useDebounce(saveToDB)

  // 删除数据
  const deleteFromDB: I_useApiCenter_deleteFromDB = async ({ data }) => {
    return await request.delete(`/v1/roles/${data._id}`)
  }
  const {
    func: _deleteFromDB,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_deleteFromDB } =
    useDebounce(deleteFromDB)
  const data = { exportLoading, loading, confirmLoading }
  const method = { _exportData, _getRoles, _saveToDB, _deleteFromDB }
  return {
    ...data,
    ...method,
  }
}
