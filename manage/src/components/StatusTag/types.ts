import { ExtractPropTypes, PropType } from 'vue'

export const statusTagProps = {
  type: {
    type: String as PropType<
      'default' | 'success' | 'info' | 'warning' | 'error'
    >,
    default: 'default',
  },
  size: {
    type: String as PropType<'default' | 'small'>,
    default: 'default',
  },
  shape: {
    type: String as PropType<'default' | 'square' | 'round'>,
    default: 'default',
  },
  text: {
    type: String as PropType<string>,
    default: '默认类型',
  },
}

type tStatusTag = ExtractPropTypes<typeof statusTagProps>
export type TStatusTag = Partial<tStatusTag>
