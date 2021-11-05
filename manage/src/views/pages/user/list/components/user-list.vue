<template>
  <common-table
    :dynamicWidth="dynamicWidth"
    :maxHeight="maxHeight"
    :allColumns="allColumns"
    :list="list"
    :loading="loading"
    @refresh="refresh"
  >
  </common-table>
</template>

<script setup lang="ts">
import { NTag, DataTableBaseColumn, NSpace } from 'naive-ui'
import ResetIcon from '@vicons/fluent/Password24Filled'
import EditIcon from '@vicons/material/EditNoteOutlined'
import DeleteIcon from '@vicons/antd/DeleteOutlined'

import CommonTable from '@/components/CommonTable.vue'
import { useIconButton } from '@/hooks/useIconButton'
import { useStatusTag } from '@/hooks/useStatusTag'
import { useDateTime } from '@/hooks/useDateFormat'

import { IUserListItem } from '../interfaces/data'
import { h, inject, Ref } from 'vue'

const maxHeight = inject('maxHeight') as Ref<number>
const dynamicWidth = inject('dynamicWidth') as Ref<number>
const list = inject('users') as Ref<Array<IUserListItem>>
const loading = inject('loading') as Ref<boolean>

interface emitType {
  (e: 'refresh'): void
  (e: 'edit', data: IUserListItem): void
  (e: 'resetPassword', data: IUserListItem): void
  (e: '_delete', data: IUserListItem): void
}
const emit = defineEmits<emitType>()

const refresh = () => {
  emit('refresh')
}

const allColumns = createAllColumns()
function createAllColumns(): Array<DataTableBaseColumn> {
  return [
    {
      title: '昵称',
      key: 'name',
      width: 180,
      fixed: 'left',
    },
    {
      title: '用户名',
      key: 'username',
      width: 280,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '角色列表',
      key: 'roles',
      render(row) {
        let { roles } = row as unknown as IUserListItem
        const tags = roles.map((role) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              size: 'small',
            },
            {
              default: () => role.name,
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
      title: '当前状态',
      key: 'ifActive',
      render(row) {
        return h(
          NSpace,
          { justify: 'center' },
          {
            default: () =>
              row.ifActive
                ? useStatusTag({
                    type: 'success',
                    text: '已激活',
                  })
                : useStatusTag({
                    type: 'disabled',
                    text: '已离职',
                  }),
          }
        )
      },
      align: 'center',
      width: 140,
    },
    {
      title: '创建时间',
      key: 'createdAt',
      width: 180,
      render(row) {
        return useDateTime(row.createdAt as string)
      },
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(NSpace, null, {
          default: () => [
            useIconButton({
              type: 'primary',
              icon: EditIcon,
              text: '编辑',
              event: () => emit('edit', row as unknown as IUserListItem),
            }),
            useIconButton({
              type: 'default',
              dashed: true,
              icon: ResetIcon,
              text: '重置密码',
              event: () =>
                emit('resetPassword', row as unknown as IUserListItem),
            }),
            useIconButton({
              type: 'default',
              dashed: true,
              icon: DeleteIcon,
              text: '删除',
              event: () => emit('_delete', row as unknown as IUserListItem),
            }),
          ],
        })
      },
      width: 290,
      fixed: 'right',
    },
  ]
}
</script>
