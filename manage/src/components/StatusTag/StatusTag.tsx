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
      const { type, shape } = props
      return `hita-status-tag hita-status-tag-${type}-${theme.value} hita-status-tag-${shape}-shape`
    })
    return () => {
      const { type } = props
      return (
        <div
          class={tagClass.value}
          style={{
            'font-weight': 'bold',
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
