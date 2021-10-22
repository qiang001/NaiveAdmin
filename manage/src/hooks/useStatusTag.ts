import { h } from 'vue'
export const useStatusTag = ({ type, text, ifBorder, ifDark }) => {
  const statusMap = {
    success: {
      borderColor: !ifDark ? '#e5fae7' : '#0a320e',
      backgroundColor: !ifDark ? '#caf2cc' : '#005404',
      textColor: !ifDark ? '#0cae16' : '#59e861',
    },
    disabled: {
      borderColor: !ifDark ? '#f4f4f4' : '#222222',
      backgroundColor: !ifDark ? '#e6e6e6' : '#383838',
      textColor: !ifDark ? '#95a4aa' : '#b2b2b2',
    },
  }
  const style = {
    padding: '1px 8px',
    borderRadius: '30px',
    backgroundColor: statusMap[type].backgroundColor,
    color: statusMap[type].textColor,
    fontSize: '12px',
    cursor:'default',
    border:'none'
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
