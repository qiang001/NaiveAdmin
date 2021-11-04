<template>
  <div>
    <n-space justify="end" align="center">
      <n-button
        @click="refresh"
        size="tiny"
        :text="true"
        :loading="refreshing"
        :disabled="refreshing"
      >
        <template #icon>
          <n-icon>
            <refresh-icon />
          </n-icon>
        </template>
        刷新
      </n-button>
      <n-popover trigger="click" placement="bottom-end">
        <template #trigger>
          <n-button size="tiny" :text="true">
            <template #icon>
              <n-icon>
                <setting-icon />
              </n-icon>
            </template>
            筛选字段
          </n-button>
        </template>
        <div>
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
      </n-popover>
    </n-space>
    <n-data-table
      :scroll-x="minWidth"
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
  NPopover,
} from 'naive-ui'
import RefreshIcon from '@vicons/material/RefreshSharp'
import SettingIcon from '@vicons/fluent/TextGrammarSettings24Regular'
import EmptyBox from '@/components/EmptyBox.vue'
import type { PropType } from '@vue/runtime-core'
import { computed, ref } from 'vue'
// 核心属性
const props = defineProps({
  dynamicWidth: Number as PropType<number>,
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
    width: c.width,
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

const minWidth = computed(() => {
  const static_show_columns = dropdownOptions.value.filter(
    (o) => o.width && o.checked
  )
  const dynamic_columns = dropdownOptions.value.filter((o) => !o.width)
  const dynamic_show_columns = dropdownOptions.value.filter(
    (o) => !o.width && o.checked
  )
  const realtimeStaticWidth = static_show_columns.reduce((a, c) => {
    a += c.width
    return a
  }, 0)
  const averageDynamicWidth = props.dynamicWidth / dynamic_columns.length
  const realtimeDynamicWidth = averageDynamicWidth * dynamic_show_columns.length
  return realtimeStaticWidth + realtimeDynamicWidth
})
</script>

<style scoped>
:deep(.n-divider:not(.n-divider--vertical)) {
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
