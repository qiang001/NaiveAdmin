import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'
type usageType = 'inner' | 'outer'
export const useResizeContainer = (
  containerId: string,
  usage?: usageType
): { width: Ref<number>; height: Ref<number>; container: Ref<HTMLElement> } => {
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
    if (usage == 'inner' || containerId == 'page-panel') {
      const pl = parseFloat(
        getComputedStyle(container.value).paddingLeft.replace('px', '')
      )
      const pr = parseFloat(
        getComputedStyle(container.value).paddingRight.replace('px', '')
      )
      const pt = parseFloat(
        getComputedStyle(container.value).paddingTop.replace('px', '')
      )
      const pb = parseFloat(
        getComputedStyle(container.value).paddingBottom.replace('px', '')
      )
      width.value -= pl + pr
      height.value -= pt + pb
    }
  }

  onBeforeUnmount(() => {
    resizeObserver.unobserve(container.value)
  })
  return {
    width,
    height,
    container,
  }
}
