import { defineComponent, computed } from 'vue'
import { statusTagProps } from './types'
import { useStore } from '@/hooks/useStore'
import './style.css'
export default defineComponent({
  name: 'StatusTag',
  props: statusTagProps,
  setup(props, ctx) {
    const { type, size, shape, bold } = props
    const store = useStore()
    const theme = computed(() => (store.state.ifDark ? 'dark' : 'light'))
    const tagClass = computed(() => {
      return `hita-status-tag-${type}-${theme.value} hita-status-tag-${size}-size hita-status-tag-${shape}-shape`
    })
    return () => {
      return (
        <div
          class={tagClass.value}
          style={{
            'font-weight': bold ? 'bold' : 'normal',
            cursor: 'default',
            'user-select': 'none',
          }}
        >
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})
