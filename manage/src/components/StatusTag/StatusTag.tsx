import { renderStatusTag } from './renderStatusTag'
import { defineComponent } from 'vue'
import { statusTagProps } from './types'

export default defineComponent({
  name: 'StatusTag',
  props: statusTagProps,
  setup(props) {
    const { type, size, shape, text } = props
    return () => {
      return renderStatusTag({ type, size, shape, text })
    }
  },
})
