<template>
  <div id="action-header" class="d-flex">
    <div class="d-flex a-center mr-2">
      <n-element class="filter-plane">
        <n-space align="center">
          <n-input
            placeholder="搜索昵称"
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
          <n-space>
            <n-button @click="clear" secondary>
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
          <n-space align="center">
            <n-button @click="changeSort" size="tiny" text>
              <template #icon>
                <n-icon>
                  <transition name="slide" mode="out-in">
                    <up-icon v-if="sort == 'up'" />
                    <down-icon v-else-if="sort == 'down'" />
                    <sort-icon v-else-if="sort == ''" />
                  </transition>
                </n-icon>
              </template>
              按创建时间{{ sort ? (sort == 'up' ? '升序' : '降序') : '排序' }}
            </n-button>
          </n-space>
        </n-space>
      </n-element>
    </div>
    <div class="ml-auto d-flex a-center">
      <n-space>
        <n-button
          v-permission:logic.UserList-1="add"
          type="primary"
          size="medium"
        >
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
</template>

<script setup lang="ts">
import {
  NInput,
  NButton,
  NSpace,
  NIcon,
  NRadio,
  NRadioGroup,
  NElement,
} from 'naive-ui'

import AddIcon from '@vicons/material/AddSharp'
import SearchIcon from '@vicons/antd/SearchOutlined'

import ResetIcon from '@vicons/fluent/Eraser20Regular'
import SortIcon from '@vicons/fluent/ArrowSort20Filled'
import UpIcon from '@vicons/fluent/ArrowSortUp20Filled'
import DownIcon from '@vicons/fluent/ArrowSortDown20Filled'

import { inject, Ref } from 'vue'
import { IFilters } from '../interfaces/data'
const filters = inject('filters') as IFilters
const searching = inject('searching') as Ref<boolean>
const sort = inject('sort') as Ref<string>

// 暴露事件
interface emitType {
  (e: 'add'): void
  (e: 'changeStatus', data: string): Promise<void>
  (e: 'clear'): void
  (e: 'search'): void
  (e: 'changeSort', data: string): Promise<void>
}
const emit = defineEmits<emitType>()

const add = () => {
  emit('add')
}

const changeStatus = (val: string) => {
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

.filter-plane {
  padding: 20px;
  border-radius: 3px;
  background-color: var(--action-color);
}
</style>
