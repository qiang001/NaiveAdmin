<template>
  <div>
    <div class="d-flex a-center pb-1">
      <div class="ml-auto">
        <n-space>
          <n-button @click="add" type="primary" size="small">
            <template #icon>
              <n-icon>
                <add-icon />
              </n-icon>
            </template>
            添加新用户
          </n-button>
        </n-space>
      </div>
    </div>
    <div class="d-flex a-center pb-1">
      <div>
        <n-space>
          <n-input
            placeholder="搜索名称"
            clearable
            v-model:value="filters.name"
            @keyup.enter="search"
          >
            <template #prefix>
              <n-icon>
                <search-icon />
              </n-icon>
            </template>
          </n-input>
          <n-input
            placeholder="搜索用户名"
            clearable
            v-model:value="filters.username"
            @keyup.enter="search"
          >
            <template #prefix>
              <n-icon>
                <search-icon />
              </n-icon>
            </template>
          </n-input>
        </n-space>
      </div>
      <div class="mx-1">
        <n-space>
          <n-button @click="clear">重置</n-button>
          <n-button
            @click="search"
            type="primary"
            :loading="searching"
            :disabled="searching"
          >
            <template #icon>
              <n-icon>
                <search-icon />
              </n-icon>
            </template>
            查询
          </n-button>
        </n-space>
      </div>
      <div class="ml-auto">
        <n-space>
          <n-button @click="changeSort" size="small" text>
            <template #icon>
              <n-icon>
                <up-icon v-if="sort == 'up'" />
                <down-icon v-if="sort == 'down'" />
              </n-icon>
            </template>
            按创建时间{{ sort ? (sort == 'up' ? '升序' : '降序') : '排序' }}
          </n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NInput, NButton, NSpace, NIcon } from 'naive-ui'
import { AddSharp as AddIcon } from '@vicons/material'
import { SearchOutlined as SearchIcon } from '@vicons/antd'
import {
  ArrowCurveUpRight20Regular as UpIcon,
  ArrowCurveDownLeft20Regular as DownIcon,
} from '@vicons/fluent'
import { inject } from 'vue'

const filters = inject('filters')
const searching = inject('searching')
const sort = inject('sort')

// 暴露事件
const emit = defineEmits(['add', 'clear', 'search', 'changeSort'])

const add = () => {
  emit('add')
}

const clear = () => {
  emit('clear')
}

const search = () => {
  emit('search')
}

const changeSort = () => {
  let val = sort.value ? (sort.value == 'up' ? 'down' : 'up') : 'down'
  emit('changeSort', val)
}
</script>

<style></style>
