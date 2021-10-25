import { useAxios } from '@/api/index'
import { useDebounce } from '@/hooks/useDebounce'
import { Ref } from 'vue'
import { I_useApiCenter_getRecords } from '../interfaces/method'
export const useApiCenter = () => {
  const request = useAxios()

  // 拉取角色列表
  const getRecords = async () => {
    try {
      return await request.get('/v1/operationRecords')
    } catch (error) {
      console.log(error)
    }
  }
  const {
    ifProcessing: loading,
    func: _getRecords,
  }: { ifProcessing: Ref<boolean>; func: I_useApiCenter_getRecords } =
    useDebounce(getRecords, 50)

  return {
    loading,
    _getRecords,
  }
}
