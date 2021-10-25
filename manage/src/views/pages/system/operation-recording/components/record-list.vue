<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    :scroll-x="1080"
    :loading="loading"
    :single-line="false"
    class="mt-2"
  >
    <template #empty>
      <empty-box></empty-box>
    </template>
  </n-data-table>
</template>

<script setup lang="ts">
import { h, inject, Ref } from 'vue'
import { NDataTable, DataTableColumn, NCollapse, NCollapseItem } from 'naive-ui'
import EmptyBox from '@/components/EmptyBox.vue'
import { useDateTime } from '@/hooks/useDateFormat'
import { useStore } from '@/hooks/useStore'
const store = useStore()
const maxHeight = inject('maxHeight') as Ref<number>
const loading = inject('loading') as Ref<boolean>
import { IRecord } from '../interfaces/data'
const data = inject('records') as Ref<Array<IRecord>>
const columns = createColumns()
function createColumns(): Array<DataTableColumn> {
  return [
    {
      title: '操作描述',
      key: 'description',
      render(row) {
        let { name, desc, visitorInfo, createdAt } = row as unknown as IRecord
        return h('div', null, {
          default: () => {
            return [
              h('div', null, {
                default: () => {
                  return name
                },
              }),
              h('div', null, {
                default: () => {
                  return desc
                },
              }),
              h(
                'div',
                { class: 'mt-1' },
                {
                  default: () => {
                    return `${visitorInfo.name} (${visitorInfo.username})`
                  },
                }
              ),
              h('div', null, {
                default: () => {
                  return useDateTime(createdAt)
                },
              }),
            ]
          },
        })
      },
      width: 280,
      fixed: 'left',
    },
    {
      title: '数据变更',
      key: 'changes',
      render(row) {
        return h(NCollapse, null, {
          default: () => {
            let { changes } = row as unknown as IRecord
            return changes.map((change) => {
              return h(
                NCollapseItem,
                { title: `${change.name} ${change.desc}`, name: change._id },
                {
                  default: () => {
                    return h('div', null, {
                      default: () => {
                        return change.diffArr.map((item) => {
                          let { value, added, removed } = item
                          let style: any = { whiteSpace: 'pre-wrap' }
                          let text = value
                          if (added) {
                            style.backgroundColor = !store.state.ifDark
                              ? '#eeffef'
                              : '#0a440a'
                            style.color = !store.state.ifDark
                              ? '#12961a'
                              : '#72b876'
                          }
                          if (removed) {
                            style.backgroundColor = !store.state.ifDark
                              ? '#ffeaea'
                              : '#5c0505b5'
                            style.color = !store.state.ifDark
                              ? '#ef2626'
                              : '#b66e6e'
                          }
                          return h(
                            'div',
                            { style },
                            {
                              default: () => {
                                return text
                              },
                            }
                          )
                        })
                      },
                    })
                  },
                }
              )
            })
          },
        })
      },
    },
  ]
}
</script>
