import { h } from 'vue'
interface Input {
  type: 'success' | 'disabled' | 'info'
  text: string
  ifDark: boolean
}
export const useStatusTag = ({ type, text, ifDark }: Input) => {
  const statusMap = {
    success: {
      backgroundColor: !ifDark ? '#e2f4e3' : '#2c3c32',
      textColor: !ifDark ? '#457a4c' : '#d0f0d1',
    },
    disabled: {
      backgroundColor: !ifDark ? '#f2f2f2' : '#383838',
      textColor: !ifDark ? '#95a4aa' : '#b2b2b2',
    },
    info: {
      backgroundColor: !ifDark ? '#d9ebfe' : '#2b3849',
      textColor: !ifDark ? '#2057a0' : '#cce4f6',
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
