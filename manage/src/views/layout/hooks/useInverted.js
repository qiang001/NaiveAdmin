import { ref } from 'vue'
export const useInverted = () => {
  const outInverted = ref(false)
  const invertedChange = (val) => {
    outInverted.value = val
  }
  return {
    outInverted,
    invertedChange,
  }
}
