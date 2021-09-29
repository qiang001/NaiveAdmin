import { ref, onMounted, onUnmounted } from 'vue'

export const useTableResponsive = (span) => {
  const maxHeight = ref(null)
  const setMaxHeight = () => {
    maxHeight.value = window.innerHeight - span
  }
  onMounted(() => {
    setMaxHeight()
    window.addEventListener('resize', setMaxHeight)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', setMaxHeight)
  })
  return {
    maxHeight,
  }
}
