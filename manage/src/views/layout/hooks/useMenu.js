import { ref } from 'vue'
export const useMenu = () => {
  const collapsed = ref(false)
  const inverted = ref(false)
  const collapsedChange = (val) => {
    collapsed.value = val
  }
  const invertedChange = (val) => {
    inverted.value = val
  }
  return {
    collapsed,
    inverted,
    collapsedChange,
    invertedChange,
  }
}
