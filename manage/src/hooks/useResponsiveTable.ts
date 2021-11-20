import { ref, watchEffect } from 'vue'
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
export const useResponsiveTable = (config: ITableConfig) => {
  const dynamicWidth = ref<number>(undefined)
  config.dynamicWidth && (dynamicWidth.value = config.dynamicWidth)
  const maxHeight = ref<number>(undefined)
  const { height: containerHeight } = useResizeContainer(
    config.containerId,
    'inner'
  )
  let dynamicElementIds = config.otherElementIds ?? []
  const dynamicHeights = dynamicElementIds.map((id) => {
    const { height } = useResizeContainer(id, 'outer')
    return height
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
      a += c.value
      return a
    }, 0)
    maxHeight.value =
      containerHeight.value -
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
