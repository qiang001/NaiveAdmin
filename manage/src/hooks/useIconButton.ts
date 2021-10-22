import { NButton, NIcon } from 'naive-ui'
import { h } from 'vue'
export const useIconButton = ({ type = 'default', dashed = false,icon, text, event }) => {
  return h(
    NButton,
    {
      size: 'small',
      type,
      dashed,
      onClick: event,
    },
    {
      default: () =>
        h(
          'div',
          { class: 'd-flex a-center' },
          {
            default: () => [
              h(
                NIcon,
                { size: 18, class: 'mr' },
                {
                  default: () => h(icon),
                }
              ),
              text,
            ],
          }
        ),
    }
  )
}
