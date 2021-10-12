import { useAxios } from '@/api/index.js'
export const useApiCenter = ({ store, records, useDebounce }) => {
  const request = useAxios(store)

  // 拉取角色列表
  const { ifProcessing: loading, func: getRecords } = useDebounce(async () => {
    try {
        records.value = await request.get('/v1/operationRecords')
    } catch (error) {
      console.log(error)
    }
  }, 50)
  
  return {
    loading,
    getRecords,
  }
}
