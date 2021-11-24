import { ExtractPropTypes, PropType } from 'vue'

export const statusTagProps = {
  type: {
    type: String as PropType<
      | 'default'
      | 'disabled'
      | 'black'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
    >,
    default: 'default',
  },
  shape: {
    type: String as PropType<'default' | 'square' | 'round'>,
    default: 'default',
  },
}

type tStatusTag = ExtractPropTypes<typeof statusTagProps>
export type TStatusTag = Partial<tStatusTag>
