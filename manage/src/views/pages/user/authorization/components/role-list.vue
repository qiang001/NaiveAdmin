<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    virtual-scroll
  />
</template>

<script setup>
const emit = defineEmits(['edit'])
import { h ,inject} from 'vue'
import { NTag, NButton, NDataTable } from 'naive-ui'
import { useTableResponsive } from '@/hooks/useTableResponsive.js'
const { maxHeight } = useTableResponsive(216)
const data = inject('roles')
const columns = createColumns()
function createColumns() {
  return [
    {
      title: '角色名称',
      key: 'name',
    },
    {
      title: '描述',
      key: 'desc',
    },
    {
      title: '权限列表',
      key: 'tags',
      render(row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              size: 'small',
            },
            {
              default: () => tagKey,
            }
          )
        })
        return tags
      },
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => emit('edit',row),
          },
          { default: () => '设置权限' }
        )
      },
    },
  ]
}

</script>
