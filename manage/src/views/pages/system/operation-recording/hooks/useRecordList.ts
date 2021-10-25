import { ref } from 'vue'
import { I_useRecordList_setMaxHeight } from '../interfaces/method'
export const useRecordList = () => {
  const maxHeight = ref(0)
  const otherTotalHeight = 106
  const setMaxHeight: I_useRecordList_setMaxHeight = ({ height }) => {
    if (height) {
      maxHeight.value = height - otherTotalHeight
    }
  }

  return {
    maxHeight,
    setMaxHeight,
  }
}
