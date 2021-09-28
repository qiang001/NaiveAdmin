<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
</template>

<script setup>
import { h } from 'vue'
import { NTag, NButton, NDataTable } from 'naive-ui'

const createColumns = () => {
  return [
    {
      title: '角色名称',
      key: 'name',
    },
    {
      title: '描述',
      key: 'desc',
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
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => console.log('dd'),
          },
          { default: () => '设置权限' }
        )
      },
    },
  ]
}

const createData = () => [
  {
    key: 0,
    name: '管理员',
    desc: '最高权力',
    tags: [],
  },
  {
    key: 1,
    name: '运营人员',
    desc: '市场销售部',
    tags: ['商品管理', '营销管理', '客户管理'],
  },
  {
    key: 2,
    name: '仓库管理员',
    desc: '管理仓库流程',
    tags: ['订单管理'],
  },
]

const data = createData()
const columns = createColumns()
const pagination = {
  pageSize: 10,
}
</script>
