import { ref, watchEffect } from 'vue'
import { useResizeContainer } from '@/hooks/useResizeContainer'
interface ITableConfig {
  width?: number
  containerId: string
  otherHeightTotalStatic: number
  otherElementIds: string[]
}
export const useResponsiveTable = (arg: ITableConfig) => {
  const minWidth = ref<number>(undefined)
  arg.width && (minWidth.value = arg.width)
  const maxHeight = ref<number>(undefined)
  const { height: containerHeight } = useResizeContainer(arg.containerId)
  const dynamicHeights = arg.otherElementIds.map((id) => {
    const { height } = useResizeContainer(id)
    return height
  })
  watchEffect(() => {
    const otherHeightTotalDynamic = dynamicHeights.reduce((a, c) => {
      a += c.value
      return a
    }, 0)
    maxHeight.value =
      containerHeight.value -
      arg.otherHeightTotalStatic -
      otherHeightTotalDynamic
  })
  return {
    minWidth,
    maxHeight,
  }
}
