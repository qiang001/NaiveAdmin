<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    :scroll-x="1080"
    :loading="loading"
  >
    <template #empty>
      <empty-box showFile></empty-box>
    </template>
  </n-data-table>
</template>

<script setup lang="ts">
const emit = defineEmits(['edit', 'resetPassword', '_delete'])
import { h, inject, Ref } from 'vue'
import { NTag, NDataTable, DataTableColumn, NSpace } from 'naive-ui'
import { Password24Filled as ResetIcon } from '@vicons/fluent'
import { EditNoteOutlined as EditIcon } from '@vicons/material'
import { DeleteOutlined as DeleteIcon } from '@vicons/antd'
import EmptyBox from '@/components/EmptyBox.vue'
import { useIconButton } from '@/hooks/useIconButton'
import { useStatusTag } from '@/hooks/useStatusTag'
import { useDateTime } from '@/hooks/useDateFormat'

import { useStore } from 'vuex'
import { storeKey } from '@/store'
const store = useStore(storeKey)

const maxHeight = inject('maxHeight') as Ref<number>
import { IUserListItem } from '../interfaces/user'
const data = inject('users') as Ref<Array<IUserListItem>>
const loading = inject('loading') as Ref<boolean>
const columns = createColumns()
function createColumns(): Array<DataTableColumn> {
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
        let { roles }: any = row
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
              ifBorder: true,
              ifDark: store.state.ifDark,
            })
          : useStatusTag({
              type: 'disabled',
              text: '已离职',
              ifBorder: true,
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
        return useDateTime(row.createdAt)
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
              event: () => emit('edit', row),
            }),
            useIconButton({
              type: 'default',
              dashed: true,
              icon: ResetIcon,
              text: '重置密码',
              event: () => emit('resetPassword', row),
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
      width: 290,
      fixed: 'right',
    },
  ]
}
</script>
