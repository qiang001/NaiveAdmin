<template>
  <n-data-table
    :max-height="maxHeight"
    :columns="columns"
    :data="data"
    virtual-scroll
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

<script setup>
import { h, inject } from 'vue'
import { NDataTable,NDivider } from 'naive-ui'
import EmptyBox from '@/components/EmptyBox.vue'
import { useDateTime } from '@/hooks/useDateFormat.js'
const store = inject('store')
const maxHeight = inject('maxHeight')
const loading = inject('loading')
const data = inject('records')
const columns = createColumns()
function createColumns() {
  return [
    {
      title: '操作描述',
      key: 'description',
      render(row) {
        return h(
          'div',
          { style: { position: 'absolute', top: '10px' } },
          {
            default: () => {
              return [
                h('div', null, {
                  default: () => {
                    return row.name
                  },
                }),
                h('div', null, {
                  default: () => {
                    return row.desc
                  },
                }),
                h(
                  'div',
                  { class: 'mt-1' },
                  {
                    default: () => {
                      return `${row.visitorInfo.name} (${row.visitorInfo.username})`
                    },
                  }
                ),
                h('div', null, {
                  default: () => {
                    return useDateTime(row.createdAt)
                  },
                }),
              ]
            },
          }
        )
      },
      width: 280,
      fixed: 'left',
    },
    {
      title: '数据变更',
      key: 'changes',
      render(row) {
        return h('div', null, {
          default: () => {
            return row.changes.map((change) => {
              return h('div', null, {
                default: () => {
                  return [
                    h(NDivider, null, {
                      default: () => {
                        return `${change.name} ${change.desc}`
                      },
                    }),
                    h('div', null, {
                      default: () => {
                        return change.diffArr.map((item) => {
                          let { value, added, removed } = item
                          let style = { whiteSpace: 'pre-wrap' }
                          let text = value
                          if (added) {
                            style.backgroundColor = !store.state.ifDark
                              ? '#eeffef'
                              : '#2c3a2c'
                            style.color = !store.state.ifDark
                              ? '#12961a'
                              : '#72b876'
                          }
                          if (removed) {
                            style.backgroundColor = !store.state.ifDark
                              ? '#ffeaea'
                              : '#442f2f80'
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
                    }),
                  ]
                },
              })
            })
          },
        })
      },
    },
  ]
}
</script>
