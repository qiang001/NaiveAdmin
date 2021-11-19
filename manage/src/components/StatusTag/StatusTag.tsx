import { defineComponent, computed } from 'vue'
import { statusTagProps } from './types'
import { useStore } from '@/hooks/useStore'
import './style.css'
export default defineComponent({
  name: 'StatusTag',
  props: statusTagProps,
  setup(props, ctx) {
    const store = useStore()
    const theme = computed(() => (store.state.ifDark ? 'dark' : 'light'))
    const tagClass = computed(() => {
      const { type, size, shape } = props
      return `hita-status-tag-${type}-${theme.value} hita-status-tag-${size}-size hita-status-tag-${shape}-shape`
    })
    return () => {
      const { type, bold } = props
      return (
        <div
          class={tagClass.value}
          style={{
            'font-weight': bold ? 'bold' : 'normal',
            cursor: type === 'disabled' ? 'not-allowed' : 'default',
            'user-select': 'none',
          }}
        >
          {ctx.slots.default?.()}
        </div>
      )
    }
  },
})
