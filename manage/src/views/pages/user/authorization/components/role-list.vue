<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    virtual-scroll
    :scroll-x="1080"
  >
    <template #empty>
      <empty-box></empty-box>
    </template>
  </n-data-table>
</template>

<script setup>
const emit = defineEmits(['edit', '_delete'])
import { h, inject } from 'vue'
import { NTag, NDataTable, NSpace } from 'naive-ui'
import { EditNoteOutlined as EditIcon } from '@vicons/material'
import { DeleteOutlined as DeleteIcon } from '@vicons/antd'
import EmptyBox from '@/components/EmptyBox.vue'
import { useIconButton } from '@/hooks/useIconButton.js'
import { useDateTime } from '@/hooks/useDateFormat.js'
const store = inject('store')
const maxHeight = inject('maxHeight')
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
      title: '包含人数',
      key: 'usersCount',
      width: 100,
      align: 'center',
    },
    {
      title: '权限列表',
      key: 'pageCheckedAuths',
      render(row) {
        const { pageCheckedAuths, contentAuths, logicAuths } = row
        const pageTags = pageCheckedAuths.map((key) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              size: 'small',
            },
            {
              default: () => key,
            }
          )
        })
        const contentTags = contentAuths.map((key) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              size: 'small',
              type: 'success',
            },
            {
              default: () => key,
            }
          )
        })
        const logicTags = logicAuths.map((key) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              size: 'small',
              type: 'info',
            },
            {
              default: () => key,
            }
          )
        })
        return [...pageTags, ...contentTags, ...logicTags]
      },
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '创建时间',
      key: 'createdAt',
      render(row) {
        return useDateTime(row.createdAt)
      },
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return row.name == '超级管理员'
          ? ''
          : h(NSpace, null, {
              default: () => [
                useIconButton({
                  type: 'primary',
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
      width: 256,
      fixed: 'right',
    },
  ]
}
</script>
