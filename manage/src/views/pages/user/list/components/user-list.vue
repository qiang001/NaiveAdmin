<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    :scroll-x="1080"
    :loading="loading"
  >
    <template #empty>
      <div>
        <img
          src="../../../../../assets/images/user.svg"
          alt=""
          style="width: 360px"
          v-if="!store.state.ifDark"
        />
        <img
          src="../../../../../assets/images/user-dark.svg"
          alt=""
          style="width: 360px"
          v-else
        />
        <div class="d-flex a-center j-center">
          <n-gradient-text type="primary" :size="18">无数据</n-gradient-text>
        </div>
      </div>
    </template>
  </n-data-table>
</template>

<script setup>
const emit = defineEmits(['edit', '_delete'])
import { h, inject } from 'vue'
import { NTag, NDataTable, NSpace, NGradientText } from 'naive-ui'
import {
  EditNoteOutlined as EditIcon,
  DeleteFilled as DeleteIcon,
} from '@vicons/material'
import { useIconButton } from '@/hooks/useIconButton.js'
import { useStatusTag } from '@/hooks/useStatusTag.js'
const store = inject('store')
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
      key: 'roles',
      render(row) {
        const tags = row.roles.map((role) => {
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
      width: 180,
      fixed: 'right',
    },
  ]
}
</script>
