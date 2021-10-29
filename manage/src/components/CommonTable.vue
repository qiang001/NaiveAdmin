<template>
  <div>
    <n-space justify="end">
      <n-button
        @click="refresh"
        size="small"
        :text="true"
        :loading="refreshing"
        :disabled="refreshing"
      >
        <template #icon>
          <n-icon>
            <refresh-icon />
          </n-icon>
        </template>
      </n-button>
      <n-element class="my-dropdown">
        <n-button size="small" :text="true" @click="triggerDropdown">
          <template #icon>
            <n-icon>
              <setting-icon />
            </n-icon>
          </template>
        </n-button>
        <transition name="slide" mode="out-in">
          <div class="my-dropdown-content" id="myDropdown" v-if="dropdownShow">
            <n-space>
              <n-checkbox
                v-model:checked="ifCheckAll"
                :indeterminate="ifCheckSome"
                @update:checked="(bool) => checkAll(bool)"
              >
                <div class="d-flex a-center py">
                  <div>选择全部</div>
                </div>
              </n-checkbox>
            </n-space>
            <n-divider></n-divider>
            <div v-for="(item, index) in dropdownOptions" :key="item.key">
              <n-space align="center">
                <n-checkbox
                  v-model:checked="item.checked"
                  @update:checked="(bool) => checkItem(item, bool)"
                >
                  <div class="d-flex a-center py">
                    <div>{{ item.label }}</div>
                  </div>
                </n-checkbox>
              </n-space>
            </div>
          </div>
        </transition>
      </n-element>
    </n-space>
    <n-data-table
      :scroll-x="props.minWidth"
      :max-height="props.maxHeight"
      :columns="columns"
      :data="props.list"
      :loading="props.loading"
    >
      <template #empty>
        <empty-box showFile></empty-box>
      </template>
    </n-data-table>
  </div>
</template>

<script lang="ts" setup>
import {
  NDataTable,
  DataTableBaseColumn,
  NSpace,
  NButton,
  NIcon,
  NElement,
  NCheckbox,
  NDivider,
} from 'naive-ui'
import { RefreshSharp as RefreshIcon } from '@vicons/material'
import { TextGrammarSettings24Regular as SettingIcon } from '@vicons/fluent'
import EmptyBox from '@/components/EmptyBox.vue'
import type { PropType } from '@vue/runtime-core'
import { computed, ref } from 'vue'
// 核心属性
const props = defineProps({
  minWidth: Number as PropType<number>,
  maxHeight: Number as PropType<number>,
  allColumns: Array as PropType<Array<DataTableBaseColumn>>,
  list: Array as PropType<Array<object>>,
  loading: Boolean as PropType<boolean>,
})

const emit = defineEmits(['refresh'])

const refreshing = ref(false)
const refresh = () => {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
  }, 1000)
  emit('refresh')
}

const ifCheckAll = ref(true)
const ifCheckSome = ref(false)
const dropdownOptions = ref([])
dropdownOptions.value = props.allColumns.map((c) => {
  return {
    label: c.title,
    key: c.key,
    checked: true,
  }
})

const checkAll = (bool) => {
  ifCheckAll.value = bool
  ifCheckSome.value = false
  dropdownOptions.value.forEach((item) => (item.checked = bool))
}

const checkItem = (item, bool) => {
  item.check = bool
  dropdownOptions.value.some((v) => v.checked) &&
    ((ifCheckAll.value = false), (ifCheckSome.value = true))
  dropdownOptions.value.every((v) => v.checked) &&
    ((ifCheckAll.value = true), (ifCheckSome.value = false))
  dropdownOptions.value.every((v) => !v.checked) &&
    ((ifCheckAll.value = false), (ifCheckSome.value = false))
}

const columns = computed(() =>
  props.allColumns.filter((c) =>
    dropdownOptions.value.some((o) => o.checked && o.key === c.key)
  )
)
const dropdownShow = ref(false)
const triggerDropdown = () => {
  dropdownShow.value = !dropdownShow.value
}
</script>

<style scoped>
.my-dropdown {
  position: relative;
}
.my-dropdown-content {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 24px;
  border-radius: 2px;
  padding: 14px;
  background-color: var(--modal-color);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

:deep(.n-divider:not(.n-divider--vertical)) {
  margin-top: 6px;
  margin-bottom: 6px;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
