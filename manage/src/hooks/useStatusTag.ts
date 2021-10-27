import { h } from 'vue'
interface Input {
  type: 'success' | 'disabled'
  text: string
  ifBorder: boolean
  ifDark: boolean
}
export const useStatusTag = ({ type, text, ifBorder, ifDark }: Input) => {
  const statusMap = {
    success: {
      borderColor: !ifDark ? '#e8f5ee' : '#0b2e0e',
      backgroundColor: !ifDark ? '#b4f7d01a' : '#0c290d',
      textColor: !ifDark ? '#00c250' : '#2aae67',
    },
    disabled: {
      borderColor: !ifDark ? '#f4f4f4' : '#222222',
      backgroundColor: !ifDark ? '#fbfbfb' : '#383838',
      textColor: !ifDark ? '#95a4aa' : '#b2b2b2',
    },
  }
  const style = {
    padding: '1px 8px',
    borderRadius: '30px',
    backgroundColor: statusMap[type].backgroundColor,
    color: statusMap[type].textColor,
    fontSize: '12px',
    cursor: 'default',
    border: 'none',
  }

  if (ifBorder) {
    style.border = `2px solid ${statusMap[type].borderColor}`
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
