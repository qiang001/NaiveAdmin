<template>
  <common-table
    :minWidth="minWidth"
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

import { h, inject, Ref } from 'vue'
import CommonTable from '@/components/CommonTable.vue'
import { useIconButton } from '@/hooks/useIconButton'
import { useStatusTag } from '@/hooks/useStatusTag'
import { useDateTime } from '@/hooks/useDateFormat'

import { useStore } from '@/hooks/useStore'
const store = useStore()

import { IUserListItem } from '../interfaces/data'
const maxHeight = inject('maxHeight') as Ref<number>
const minWidth = inject('minWidth') as Ref<number>
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
      width: 120,
      fixed: 'left',
    },
    {
      title: '用户名',
      key: 'username',
      width: 180,
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
        return row.ifActive
          ? useStatusTag({
              type: 'success',
              text: '已激活',
              ifDark: store.state.ifDark,
            })
          : useStatusTag({
              type: 'disabled',
              text: '已离职',
              ifDark: store.state.ifDark,
            })
      },
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
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
