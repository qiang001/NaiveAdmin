<template>
  <div>
    <n-space justify="end" align="center">
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
      <my-dropdown>
        <template #icon>
          <n-icon>
            <setting-icon />
          </n-icon>
        </template>
        <template #content>
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
        </template>
      </my-dropdown>
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
  NCheckbox,
  NDivider,
} from 'naive-ui'
import { RefreshSharp as RefreshIcon } from '@vicons/material'
import { TextGrammarSettings24Regular as SettingIcon } from '@vicons/fluent'
import MyDropdown from '@/components/MyDropdown.vue'
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
</script>

<style scoped>
:deep(.n-divider:not(.n-divider--vertical)) {
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
