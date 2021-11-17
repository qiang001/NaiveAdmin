<template>
  <common-table
    :dynamicWidth="dynamicWidth"
    :maxHeight="maxHeight"
    :allColumns="allColumns"
    :list="list"
    :loading="loading"
    :pagination="pagination"
    @changePage="changePage"
    @changePageSize="changePageSize"
    @refresh="refresh"
  >
  </common-table>
</template>

<script setup lang="ts">
import {
  NTag,
  DataTableBaseColumn,
  NSpace,
  NAvatar,
  NElement,
  NTime,
  NButton,
  NIcon,
} from 'naive-ui'
import ResetIcon from '@vicons/fluent/Password24Filled'
import EditIcon from '@vicons/material/EditNoteOutlined'
import DeleteIcon from '@vicons/antd/DeleteOutlined'

import CommonTable from '@/components/CommonTable.vue'
import StatusTag from '@/components/StatusTag/StatusTag'

import { IUserListItem } from '../interfaces/data'
import { IPagination } from '@/hooks/usePagination'
import { h, inject, Ref } from 'vue'

const maxHeight = inject('maxHeight') as Ref<number>
const dynamicWidth = inject('dynamicWidth') as Ref<number>
const list = inject('users') as Ref<Array<IUserListItem>>
const loading = inject('loading') as Ref<boolean>
const pagination = inject('pagination') as IPagination

interface emitType {
  (e: 'refresh'): void
  (e: 'changePage', data: number): void
  (e: 'changePageSize', data: number): void
  (e: 'edit', data: IUserListItem): void
  (e: 'resetPassword', data: IUserListItem): void
  (e: '_delete', data: IUserListItem): void
}
const emit = defineEmits<emitType>()

const refresh = () => {
  emit('refresh')
}

const changePage = (val: number) => {
  emit('changePage', val)
}

const changePageSize = (val: number) => {
  emit('changePageSize', val)
}

const allColumns = createAllColumns()
function createAllColumns(): Array<DataTableBaseColumn> {
  return [
    {
      title: '用户信息',
      key: 'name',
      width: 280,
      fixed: 'left',
      render(row) {
        let { avatar, gender, age, name, username } =
          row as unknown as IUserListItem
        return h(
          NSpace,
          { align: 'center' },
          {
            default: () => [
              h(
                NAvatar,
                { src: avatar, size: 52, class: 'd-flex a-center' },
                ''
              ),
              h('div', null, {
                default: () => [
                  h('div', null, name),
                  h(
                    NSpace,
                    { align: 'center' },
                    {
                      default: () => [
                        h(
                          NElement,
                          {
                            style: {
                              fontSize: '12px',
                              color: 'var(--text-color-3)',
                            },
                          },
                          {
                            default: () =>
                              h(
                                'div',
                                { class: 'd-flex a-center' },
                                {
                                  default: () => [
                                    h('div', null, gender),
                                    h('div', { class: 'ml' }, age),
                                  ],
                                }
                              ),
                          }
                        ),
                      ],
                    }
                  ),
                  h(
                    NElement,
                    {
                      style: { fontSize: '12px', color: 'var(--text-color-2)' },
                    },
                    {
                      default: () => username,
                    }
                  ),
                ],
              }),
            ],
          }
        )
      },
    },
    {
      title: '角色列表',
      key: 'roles',
      render(row) {
        let { roles } = row as unknown as IUserListItem
        const tags = roles.map((role) => {
          return h(NTag, { size: 'small' }, { default: () => role.name })
        })
        return h(NSpace, { size: 'small' }, { default: () => tags })
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
                ? h(
                    StatusTag,
                    {
                      type: 'success',
                      bold: true,
                    },
                    {
                      default: () => '已激活',
                    }
                  )
                : h(
                    StatusTag,
                    {
                      type: 'default',
                      bold: true,
                    },
                    {
                      default: () => '已离职',
                    }
                  ),
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
        return h(NTime, { time: new Date(row.createdAt as string) })
      },
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(NSpace, null, {
          default: () => [
            h(
              NButton,
              {
                type: 'primary',
                size: 'small',
                onClick: () => emit('edit', row as unknown as IUserListItem),
              },
              {
                icon: () => h(NIcon, null, { default: () => h(EditIcon) }),
                default: () => '编辑',
              }
            ),
            h(
              NButton,
              {
                size: 'small',
                ghost: true,
                onClick: () =>
                  emit('resetPassword', row as unknown as IUserListItem),
              },
              {
                icon: () => h(NIcon, null, { default: () => h(ResetIcon) }),
                default: () => '重置密码',
              }
            ),
            h(
              NButton,
              {
                size: 'small',
                dashed: true,
                onClick: () => emit('_delete', row as unknown as IUserListItem),
              },
              {
                icon: () => h(NIcon, null, { default: () => h(DeleteIcon) }),
                default: () => '删除',
              }
            ),
          ],
        })
      },
      width: 300,
      fixed: 'right',
    },
  ]
}
</script>
