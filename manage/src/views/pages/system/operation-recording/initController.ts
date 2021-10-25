import { ref, onMounted } from 'vue'
import { useApiCenter } from './hooks/useApiCenter'
import { useRecordList } from './hooks/useRecordList'
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
  const { maxHeight, setMaxHeight } = useRecordList()
  // 最终对外暴露
  const data = {
    records,
    loading,
    maxHeight,
  }
  const methods = { setMaxHeight }

  return {
    ...data,
    ...methods,
  }
}
