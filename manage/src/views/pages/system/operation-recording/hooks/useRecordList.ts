import { ref } from 'vue'
export const useRecordList = () => {
  const maxHeight = ref(0)
  const otherTotalHeight = 106
  const setMaxHeight = ({ height }) => {
    if (height) {
      maxHeight.value = height - otherTotalHeight
    }
  }

  return {
    maxHeight,
    setMaxHeight,
  }
}
