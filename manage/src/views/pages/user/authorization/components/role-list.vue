<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    virtual-scroll
    :scroll-x="800"
  >
    <template #empty>
      <div>
        <img
          src="../../../../../assets/images/auth.svg"
          alt=""
          style="width: 360px"
          v-if="!store.state.ifDark"
        />
        <img
          src="../../../../../assets/images/auth-dark.svg"
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
