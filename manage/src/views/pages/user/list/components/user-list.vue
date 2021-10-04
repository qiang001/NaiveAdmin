<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    :scroll-x="960"
    :loading="loading"
  />
</template>

<script setup>
const emit = defineEmits(['edit', '_delete'])
import { h, inject } from 'vue'
import { NTag, NDataTable, NSpace } from 'naive-ui'
import {
  EditNoteOutlined as EditIcon,
  DeleteFilled as DeleteIcon,
} from '@vicons/material'
import { useIconButton } from '@/hooks/useIconButton.js'
const maxHeight = inject('maxHeight')
const data = inject('users')
const loading = inject('loading')
const columns = createColumns()
function createColumns() {
  return [
    {
      title: '名称',
      key: 'name',
      width: 180,
      fixed: 'left',
    },
    {
      title: '用户名',
      key: 'username',
      width: 240,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '角色列表',
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
        return h(NSpace, null, {
          default: () => [
            useIconButton({
              type: 'default',
              icon: EditIcon,
              text: '编辑',
              event: () => emit('edit', row),
            }),
            useIconButton({
              type: 'default',
              dashed: true,
              icon: DeleteIcon,
              text: '删除',
              event: () => emit('_delete', row),
            }),
          ],
        })
      },
      width: 240,
      fixed: 'right',
    },
  ]
}
</script>
