import { NButton, NIcon } from 'naive-ui'
import { h, Component } from 'vue'
interface IConfig {
  type: 'primary' | 'default'
  dashed?: boolean
  ghost?: boolean
  icon: Component
  text: string
  event: () => void
}
export const useIconButton = ({
  type,
  dashed,
  ghost,
  icon,
  text,
  event,
}: IConfig) => {
  return h(
    NButton,
    {
      size: 'small',
      type,
      dashed,
      ghost,
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
