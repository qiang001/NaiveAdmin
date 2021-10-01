<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    virtual-scroll
    :scroll-x="800"
  />
</template>

<script setup>
const emit = defineEmits(['edit'])
import { h, inject } from 'vue'
import { NTag, NDataTable } from 'naive-ui'
import { EditNoteOutlined as EditIcon } from '@vicons/material'
import { useIconButton } from '@/hooks/useIconButton.js'
import { useTableResponsive } from '@/hooks/useTableResponsive.js'
const { maxHeight } = useTableResponsive(276)
const data = inject('roles')
const columns = createColumns()
function createColumns() {
  return [
    {
      title: '角色名称',
      key: 'name',
      width: 120,
      fixed: 'left',
    },
    {
      title: '描述',
      key: 'desc',
      width: 150,
      fixed: 'left',
      ellipsis: {
        tooltip: true,
      },
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
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return useIconButton(EditIcon, '编辑', () => emit('edit', row))
      },
      width: 124,
      fixed: 'right',
      ellipsis: {
        tooltip: true,
      },
    },
  ]
}
</script>
