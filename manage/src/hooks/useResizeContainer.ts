import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'

type usageType = 'inner' | 'outer'

// 适用于页面初始化时 [自动封装了生命周期]
export const useResizeContainer = (containerId: string, usage?: usageType) => {
  usage = containerId === 'page-panel' ? 'inner' : usage
  const _container = ref<HTMLElement>(null)
  const _rect = reactive({
    width: 0,
    height: 0,
  })
  let _resizeObserver = null

  onMounted(() => {
    const { resizeObserver, container } = observe(containerId, _rect, usage)
    _resizeObserver = resizeObserver
    _container.value = container
  })

  onBeforeUnmount(() => {
    _resizeObserver.unobserve(_container.value)
  })

  return {
    rect: _rect,
    container: _container,
  }
}

// 核心能力单独提供
export const observe = (
  targetId: string,
  rect: { width: number; height: number },
  usage?: usageType
) => {
  const container = document.getElementById(targetId)

  const ResizeObserver = window.ResizeObserver
  let resizeObserver = null
  let resizeTimer = null

  resizeObserver = new ResizeObserver(() => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      resizeHandler()
    }, 10)
  })

  resizeObserver.observe(container)

  function resizeHandler() {
    rect.width = container.getBoundingClientRect().width
    rect.height = container.getBoundingClientRect().height
    if (usage == 'inner') {
      const pl = parseFloat(
        getComputedStyle(container).paddingLeft.replace('px', '')
      )
      const pr = parseFloat(
        getComputedStyle(container).paddingRight.replace('px', '')
      )
      const pt = parseFloat(
        getComputedStyle(container).paddingTop.replace('px', '')
      )
      const pb = parseFloat(
        getComputedStyle(container).paddingBottom.replace('px', '')
      )
      rect.width -= pl + pr
      rect.height -= pt + pb
    }
    if (usage == 'outer') {
      const ml = parseFloat(
        getComputedStyle(container).marginLeft.replace('px', '')
      )
      const mr = parseFloat(
        getComputedStyle(container).marginRight.replace('px', '')
      )
      const mt = parseFloat(
        getComputedStyle(container).marginTop.replace('px', '')
      )
      const mb = parseFloat(
        getComputedStyle(container).marginBottom.replace('px', '')
      )
      rect.width += ml + mr
      rect.height += mt + mb
    }
  }

  return {
    resizeObserver,
    container,
  }
}
