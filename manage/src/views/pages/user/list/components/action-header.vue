<template>
  <div id="action-header">
    <div class="d-flex a-center pb-1">
      <div class="ml-auto">
        <n-space>
          <n-button @click="add" type="primary" size="medium">
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
          <div class="d-flex a-center" style="line-height: 0; height: 100%">
            <n-radio-group
              v-model:value="filters.ifActive"
              name="status"
              :on-update:value="changeStatus"
            >
              <n-space>
                <n-radio :value="'true'"> 已激活 </n-radio>
                <n-radio :value="'false'"> 已离职 </n-radio>
              </n-space>
            </n-radio-group>
          </div>
        </n-space>
      </div>
      <div class="mx-1" style="flex-shrink: 0">
        <n-space>
          <n-button @click="clear">
            <template #icon>
              <n-icon>
                <reset-icon />
              </n-icon>
            </template>
            重置
          </n-button>
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
                <transition name="slide" mode="out-in">
                  <sort-icon v-if="sort == ''" />
                  <up-icon v-else-if="sort == 'up'" />
                  <down-icon v-else-if="sort == 'down'" />
                </transition>
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
import { NInput, NButton, NSpace, NIcon, NRadio, NRadioGroup } from 'naive-ui'
import { AddSharp as AddIcon } from '@vicons/material'
import { SearchOutlined as SearchIcon } from '@vicons/antd'
import {
  Eraser20Regular as ResetIcon,
  ArrowSort20Filled as SortIcon,
  ArrowSortUp20Filled as UpIcon,
  ArrowSortDown20Filled as DownIcon,
} from '@vicons/fluent'
import { inject } from 'vue'

const filters = inject('filters')
const searching = inject('searching')
const sort = inject('sort')

// 暴露事件
const emit = defineEmits([
  'add',
  'changeStatus',
  'clear',
  'search',
  'changeSort',
])

const add = () => {
  emit('add')
}

const changeStatus = (val) => {
  emit('changeStatus', val)
}

const clear = () => {
  emit('clear')
}

const search = () => {
  emit('search')
}

const changeSort = () => {
  let val = sort.value ? (sort.value == 'down' ? 'up' : '') : 'down'
  emit('changeSort', val)
}
</script>

<style scoped>
/* slide transitions */
.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
