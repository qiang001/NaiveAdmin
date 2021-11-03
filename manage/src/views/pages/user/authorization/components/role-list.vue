<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
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
import EditIcon from '@vicons/material/EditNoteOutlined'
import DeleteIcon from '@vicons/antd/DeleteOutlined'
import EmptyBox from '@/components/EmptyBox.vue'
import { useIconButton } from '@/hooks/useIconButton'
import { useDateTime } from '@/hooks/useDateFormat'

const maxHeight = inject('maxHeight') as Ref<number>
const loading = inject('loading') as Ref<boolean>

const data = inject('roles') as Ref<Array<IRoleListItem>>

const renderTag = (type: 'default' | 'success' | 'info', text: string) => {
  return h(
    NTag,
    {
      size: 'small',
      type,
    },
    {
      default: () => text,
    }
  )
}
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
      key: 'auths',
      render(row) {
        if (row.name === '超级管理员') {
          return h(NSpace, null, {
            default: () => [
              renderTag('default', '全部页面级权限'),
              renderTag('success', '全部内容显示级权限'),
              renderTag('info', '全部逻辑操作级权限'),
            ],
          })
        }
        const { pageCheckedAuths, contentAuths, logicAuths } =
          row as unknown as IRoleListItem
        const pageTags = pageCheckedAuths.map((key) =>
          renderTag('default', key)
        )
        const contentTags = contentAuths.map((key) => renderTag('success', key))
        const logicTags = logicAuths.map((key) => renderTag('info', key))
        return h(NSpace, null, {
          default: () => [...pageTags, ...contentTags, ...logicTags],
        })
      },
    },
    {
      title: '创建时间',
      key: 'createdAt',
      width: 186,
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
