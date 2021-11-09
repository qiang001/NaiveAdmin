import { ref, watchEffect } from 'vue'
import { useResizeContainer } from '@/hooks/useResizeContainer'
interface ITableConfig {
  dynamicWidth?: number
  containerId: string
  otherHeightTotalStatic: number
  otherElementIds: string[]
}
export const useResponsiveTable = (config: ITableConfig) => {
  const dynamicWidth = ref<number>(undefined)
  config.dynamicWidth && (dynamicWidth.value = config.dynamicWidth)
  const maxHeight = ref<number>(undefined)
  const { height: containerHeight } = useResizeContainer(
    config.containerId,
    'inner'
  )
  const dynamicHeights = config.otherElementIds.map((id) => {
    const { height } = useResizeContainer(id, 'outer')
    return height
  })
  watchEffect(() => {
    const otherHeightTotalDynamic = dynamicHeights.reduce((a, c) => {
      a += c.value
      return a
    }, 0)
    maxHeight.value =
      containerHeight.value -
      config.otherHeightTotalStatic -
      otherHeightTotalDynamic
  })
  return {
    dynamicWidth,
    maxHeight,
  }
}
