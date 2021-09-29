import { ref } from 'vue'
export const useSectionWidth = () => {
  const sectionWidth = ref(240)
  const widthChange = (val) => {
    sectionWidth.value = val
  }
  return {
    sectionWidth,
    widthChange,
  }
}
