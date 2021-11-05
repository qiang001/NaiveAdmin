<template>
  <n-data-table
    :row-key="(row) => row._id"
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

// map 数据库存的数据为 => label
// 页面级
import { useStore } from '@/hooks/useStore'
const store = useStore()
// 内容+逻辑级
import { permissionConfig } from '@/configuration'
let contentMaps = []
let logicMaps = []
permissionConfig.forEach((page) => {
  page.contentAuths.forEach((item) => {
    contentMaps = [
      ...contentMaps,
      {
        label: `${page.label}页面 - ${item.desc}`,
        key: `${page.page}-${item.key}`,
      },
    ]
  })
  page.logicAuths.forEach((item) => {
    logicMaps = [
      ...logicMaps,
      {
        label: `${page.label}页面 - ${item.desc}`,
        key: `${page.page}-${item.key}`,
      },
    ]
  })
})
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
      type: 'selection',
    },
    {
      type: 'expand',
      expandable: (row) => {
        const { pageCheckedAuths, contentAuths, logicAuths } =
          row as unknown as IRoleListItem
        return (
          [...pageCheckedAuths, ...contentAuths, ...logicAuths].length > 0 ||
          row.name === '超级管理员'
        )
      },
      renderExpand: (row) => {
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
          renderTag('default', store.getters.getLabelWithKey(key))
        )
        const contentTags = contentAuths.map((key) =>
          renderTag(
            'success',
            contentMaps.find((item) => item.key === key)?.label
          )
        )
        const logicTags = logicAuths.map((key) =>
          renderTag('info', logicMaps.find((item) => item.key === key)?.label)
        )
        return h('div', null, {
          default: () => [
            pageTags.length > 0
              ? h('div', null, {
                  default: () => [
                    h(
                      'div',
                      {
                        class: 'my-1',
                        style: { fontSize: '12px', fontWeight: 'bold' },
                      },
                      '页面级权限'
                    ),
                    h(NSpace, null, {
                      default: () => pageTags,
                    }),
                  ],
                })
              : '',
            contentTags.length > 0
              ? h('div', null, {
                  default: () => [
                    h(
                      'div',
                      {
                        class: 'my-1',
                        style: { fontSize: '12px', fontWeight: 'bold' },
                      },
                      '内容显示级权限'
                    ),
                    h(NSpace, null, {
                      default: () => contentTags,
                    }),
                  ],
                })
              : '',
            logicTags.length > 0
              ? h('div', null, {
                  default: () => [
                    h(
                      'div',
                      {
                        class: 'my-1',
                        style: { fontSize: '12px', fontWeight: 'bold' },
                      },
                      '逻辑操作级权限'
                    ),
                    h(NSpace, null, {
                      default: () => logicTags,
                    }),
                  ],
                })
              : '',
          ],
        })
      },
    },
    {
      title: '角色名称',
      key: 'name',
      width: 120,
      fixed: 'left',
    },
    {
      title: '描述',
      key: 'desc',
      width: 120,
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
      title: '创建时间',
      key: 'createdAt',
      width: 166,
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
