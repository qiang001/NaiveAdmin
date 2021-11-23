import { ref, watchEffect, reactive, onBeforeUnmount } from 'vue'
import { useResizeContainer } from '@/hooks/useResizeContainer'
interface ITableConfig {
  size?: 'large' | 'medium' | 'small'
  tool: boolean
  pagination: boolean
  containerId: string
  otherElementIds?: string[]
  otherHeightTotalStatic?: number
  dynamicWidth?: number
}

// 适用于大多数情况
// 比较好的解决方案：
// 每个表格组件对应自己的 useXxxList.js , 独享生命周期, 即使用 useResponsiveTable 即可

export const useResponsiveTable = (config: ITableConfig) => {
  const dynamicWidth = ref<number>(undefined)
  config.dynamicWidth && (dynamicWidth.value = config.dynamicWidth)
  const maxHeight = ref<number>(undefined)
  const { rect: rectContainer } = useResizeContainer(
    config.containerId,
    'inner'
  )
  let dynamicElementIds = config.otherElementIds ?? []
  const dynamicHeights = dynamicElementIds.map((id) => {
    const { rect } = useResizeContainer(id, 'outer')
    return rect
  })
  const toolHeight = config.tool ? 34 : 0
  const HeaderMap = {
    large: 49,
    medium: 47,
    small: 39,
  }
  const tableHeaderHeight = config.size
    ? HeaderMap[config.size]
    : HeaderMap['medium']
  const paginationHeight = config.pagination ? 40 : 0
  watchEffect(() => {
    const otherHeightTotalDynamic = dynamicHeights.reduce((a, c) => {
      a += c.height
      return a
    }, 0)
    maxHeight.value =
      rectContainer.height -
      (config.otherHeightTotalStatic ?? 0) -
      otherHeightTotalDynamic -
      toolHeight -
      tableHeaderHeight -
      paginationHeight -
      2
  })
  return {
    dynamicWidth,
    maxHeight,
    size: config.size || 'medium',
  }
}

// 适用于页面部分组件延迟展现的情况
// 场景：[ 同一个生命周期产生多个响应式表格, 但是仅渲染了部分表格 ]
// => index.vue
// => initController.ts
// => useXxxList.ts 这里产生了多个响应式表格, 而页面仅渲染了一个
// 需要手动控制响应时机
// 应该尽量避免这种情况

import { observe } from '@/hooks/useResizeContainer'
export const useResponsiveTableDelay = (config: ITableConfig) => {
  const dynamicWidth = ref<number>(undefined)
  config.dynamicWidth && (dynamicWidth.value = config.dynamicWidth)
  const maxHeight = ref<number>(undefined)

  const _rectContainer = reactive({
    width: 0,
    height: 0,
  })

  const observers = ref([])

  onBeforeUnmount(() => {
    observers.value.forEach((obj) => {
      const { observer, dom } = obj
      observer.unobserve(dom)
    })
  })

  const startObserveInner = () => {
    const { resizeObserver, container } = observe(
      config.containerId,
      _rectContainer,
      'inner'
    )
    observers.value.push({ observer: resizeObserver, dom: container })
  }

  let dynamicHeights = []
  const startObserveOuter = () => {
    let dynamicElementIds = config.otherElementIds ?? []
    dynamicHeights = dynamicElementIds.map((id) => {
      const _rect = reactive({
        width: 0,
        height: 0,
      })
      const { resizeObserver, container } = observe(id, _rect, 'outer')
      observers.value.push({ observer: resizeObserver, dom: container })
      return _rect
    })
  }

  const toolHeight = config.tool ? 34 : 0
  const HeaderMap = {
    large: 49,
    medium: 47,
    small: 39,
  }
  const tableHeaderHeight = config.size
    ? HeaderMap[config.size]
    : HeaderMap['medium']
  const paginationHeight = config.pagination ? 40 : 0
  watchEffect(() => {
    const otherHeightTotalDynamic = dynamicHeights.reduce((a, c) => {
      a += c.height
      return a
    }, 0)
    maxHeight.value =
      _rectContainer.height -
      (config.otherHeightTotalStatic ?? 0) -
      otherHeightTotalDynamic -
      toolHeight -
      tableHeaderHeight -
      paginationHeight -
      2
  })
  return {
    dynamicWidth,
    maxHeight,
    size: config.size || 'medium',
    startObserveInner,
    startObserveOuter,
  }
}
