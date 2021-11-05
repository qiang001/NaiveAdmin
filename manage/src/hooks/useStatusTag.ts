import { h, computed } from 'vue'
import { useStore } from './useStore'
interface Input {
  type: 'success' | 'disabled' | 'info'
  text: string
}
export const useStatusTag = ({ type, text }: Input) => {
  const store = useStore()
  const ifDark = computed(() => store.state.ifDark)
  const statusMap = {
    success: {
      backgroundColor: !ifDark.value ? '#e2f4e3' : '#2c3c32',
      textColor: !ifDark.value ? '#457a4c' : '#d0f0d1',
    },
    disabled: {
      backgroundColor: !ifDark.value ? '#f2f2f2' : '#383838',
      textColor: !ifDark.value ? '#95a4aa' : '#b2b2b2',
    },
    info: {
      backgroundColor: !ifDark.value ? '#d9ebfe' : '#2b3849',
      textColor: !ifDark.value ? '#2057a0' : '#cce4f6',
    },
  }
  const style = {
    padding: '1px 8px',
    borderRadius: '3px',
    backgroundColor: statusMap[type].backgroundColor,
    color: statusMap[type].textColor,
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'default',
    border: 'none',
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
