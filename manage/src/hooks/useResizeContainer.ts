import { ref,onMounted,onBeforeUnmount } from 'vue'
export const useResizeContainer = (containerId:string) => {
  const width = ref(null)
  const height = ref(null)
  let resizeObserver = null
  let container = ref(null)
  let resizeTimer = null
  onMounted(() => {
    container.value = document.getElementById(containerId)
    const ResizeObserver = window.ResizeObserver
    resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      resizeTimer = setTimeout(() => {
        resizeHandler()
      }, 100)
    })
    resizeObserver.observe(container.value)
  })

  function resizeHandler() {
    width.value = container.value.getBoundingClientRect().width
    height.value = container.value.getBoundingClientRect().height
  }

  onBeforeUnmount(() => {
    resizeObserver.unobserve(container.value)
  })
  return {
    width,
    height,
    container
  }
}
