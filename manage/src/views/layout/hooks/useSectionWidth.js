import { ref } from 'vue'
export const useSectionWidth = () => {
  const widthSpan = {
    min: 210,
    max: 420,
  }
  const sectionWidth = ref(widthSpan.min)
  const widthChange = (val) => {
    sectionWidth.value = val
  }
  return {
    widthSpan,
    sectionWidth,
    widthChange,
  }
}
