import { useInverted } from './hooks/useInverted'
import { useSectionWidth } from './hooks/useSectionWidth'
export const initController = () => {
  const { outInverted, invertedChange } = useInverted()
  const { sectionWidth, widthChange } = useSectionWidth()
  return {
    outInverted,
    invertedChange,
    sectionWidth,
    widthChange,
  }
}
