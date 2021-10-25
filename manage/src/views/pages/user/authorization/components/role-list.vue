<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    virtual-scroll
    :scroll-x="1080"
    :loading="loading"
  >
    <template #empty>
      <empty-box></empty-box>
    </template>
  </n-data-table>
</template>

<script setup lang="ts">
import { IRoleListItem } from '../interfaces/data'
interface emitType {
  (e: 'edit', data: IRoleListItem): void
  (e: '_delete', data: IRoleListItem): void
}
const emit = defineEmits<emitType>()
import { h, inject, Ref } from 'vue'
import { NTag, NDataTable, DataTableColumn, NSpace } from 'naive-ui'
import { EditNoteOutlined as EditIcon } from '@vicons/material'
import { DeleteOutlined as DeleteIcon } from '@vicons/antd'
import EmptyBox from '@/components/EmptyBox.vue'
import { useIconButton } from '@/hooks/useIconButton'
import { useDateTime } from '@/hooks/useDateFormat'

const maxHeight = inject('maxHeight') as Ref<number>
const loading = inject('loading') as Ref<boolean>

const data = inject('roles') as Ref<Array<IRoleListItem>>

const columns = createColumns()
function createColumns(): Array<DataTableColumn> {
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
        const { pageCheckedAuths, contentAuths, logicAuths } =
          row as unknown as IRoleListItem
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
        return useDateTime(row.createdAt as string)
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
                  event: () => emit('edit', row as unknown as IRoleListItem),
                }),
                useIconButton({
                  type: 'default',
                  dashed: true,
                  icon: DeleteIcon,
                  text: '删除',
                  event: () => emit('_delete', row as unknown as IRoleListItem),
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
