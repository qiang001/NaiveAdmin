import { ref, onMounted } from 'vue'
import { useApiCenter } from './composables/useApiCenter'
import { IRecord } from './interfaces/data'
import { I_initController_queryRecords } from './interfaces/method'

export const initController = () => {
  // 接口层
  const { loading, _getRecords } = useApiCenter()
  // 初始化数据
  const records = ref<Array<IRecord>>([])
  const queryRecords: I_initController_queryRecords = async () => {
    records.value = await _getRecords()
  }
  onMounted(async () => {
    await queryRecords()
  })
  // 最终对外暴露
  const data = {
    records,
    loading,
  }
  const methods = {}

  return {
    ...data,
    ...methods,
  }
}
