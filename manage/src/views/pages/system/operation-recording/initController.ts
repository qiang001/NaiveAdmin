import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { ref, onMounted } from 'vue'
import { useDebounce } from '@/hooks/useDebounce'
import { useApiCenter } from './hooks/useApiCenter'
import { useRecordList } from './hooks/useRecordList'

import {IRecord} from './interfaces/recordList'

export const initController = () => {
  // 公共状态数据

  const store = useStore(storeKey)
  const records = ref<Array<IRecord>>([])
  // 接口层
  const { loading, getRecords } = useApiCenter({ store, records, useDebounce })
  // 初始化数据
  onMounted(async () => {
    await getRecords()
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
