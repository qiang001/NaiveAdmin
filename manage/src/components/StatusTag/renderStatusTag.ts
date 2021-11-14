import { h, computed } from 'vue'
import { useStore } from '@/hooks/useStore'
import { TStatusTag } from './types'

export const renderStatusTag = ({ type, size, shape, text }: TStatusTag) => {
  !type && (type = 'default')
  !size && (size = 'default')
  !shape && (shape = 'default')
  !text && (text = '默认类型')

  const store = useStore()
  const ifDark = computed(() => store.state.ifDark)
  const statusMap = {
    default: {
      backgroundColor: !ifDark.value ? '#f2f2f2' : '#383838',
      textColor: !ifDark.value ? '#95a4aa' : '#b2b2b2',
    },
    success: {
      backgroundColor: !ifDark.value ? '#e2f4e3' : '#2c3c32',
      textColor: !ifDark.value ? '#457a4c' : '#d0f0d1',
    },
    info: {
      backgroundColor: !ifDark.value ? '#d9ebfe' : '#2b3849',
      textColor: !ifDark.value ? '#2057a0' : '#cce4f6',
    },
    warning: {
      backgroundColor: !ifDark.value ? '#ffe7da' : '#574236',
      textColor: !ifDark.value ? '#ff6207' : '#ffceb1',
    },
    error: {
      backgroundColor: !ifDark.value ? '#ffe4e4' : '#472930',
      textColor: !ifDark.value ? '#f52d5b' : '#f7a7b9',
    },
  }

  const shapeMap = {
    default: '3px',
    square: '0px',
    round: '50px',
  }

  const style = {
    padding: size == 'default' ? '1px 8px' : '0 4px',
    borderRadius: shapeMap[shape],
    backgroundColor: statusMap[type].backgroundColor,
    color: statusMap[type].textColor,
    fontSize: size == 'default' ? '14px' : '12px',
    fontWeight: 'bold',
    cursor: 'default',
    border: 'none',
    userSelect: 'none',
  }

  return h(
    'div',
    {
      style,
    },
    {
      default: () => text,
    }
  )
}
