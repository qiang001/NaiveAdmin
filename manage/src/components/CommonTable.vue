<template>
  <div>
    <n-space justify="end" align="center" style="margin: 0">
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
      remote
      striped
      :size="size"
      :row-key="(row) => row._id"
      :scroll-x="minWidth"
      :max-height="maxHeight"
      :columns="columns"
      :data="list"
      :loading="loading"
      :pagination="pagination"
      @update-page="(number) => emit('changePage', number)"
      @update-page-size="(number) => emit('changePageSize', number)"
    >
      <template #empty>
        <empty-box showFile></empty-box>
      </template>
    </n-data-table>
  </div>
</template>

<script setup lang="ts">
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
import SettingIcon from '@vicons/ionicons4/MdOptions'
import EmptyBox from '@/components/EmptyBox.vue'
import { IPagination } from '@/hooks/usePagination'
import { computed, ref } from 'vue'

// 核心属性
interface IProp {
  size?: 'large' | 'medium' | 'small'
  dynamicWidth?: number
  maxHeight?: number
  allColumns: Array<DataTableBaseColumn>
  list: Array<object>
  loading?: boolean
  pagination: IPagination
}
const props = withDefaults(defineProps<IProp>(), {
  size: 'medium',
  dynamicWidth: 0,
  maxHeight: undefined,
  allColumns: undefined,
  list: undefined,
  loading: false,
  pagination: undefined,
})

// 暴露事件
const emit = defineEmits(['refresh', 'changePage', 'changePageSize'])

// 组件私有逻辑
// 刷新列表
const refreshing = ref(false)
const refresh = () => {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
  }, 1000)
  emit('refresh')
}
// 筛选字段逻辑
const ifCheckAll = ref(true)
const ifCheckSome = ref(false)
interface IOption {
  label: string
  key: string
  checked: boolean
  width: number
}
const dropdownOptions = ref<Array<IOption>>([])
dropdownOptions.value = props.allColumns.map((c) => {
  return {
    label: c.title as string,
    key: c.key as string,
    checked: true,
    width: c.width,
  }
})

const checkAll = (bool: boolean) => {
  ifCheckAll.value = bool
  ifCheckSome.value = false
  dropdownOptions.value.forEach((item) => (item.checked = bool))
}

const checkItem = (item: IOption, bool: boolean) => {
  item.checked = bool
  dropdownOptions.value.some((v) => v.checked) &&
    ((ifCheckAll.value = false), (ifCheckSome.value = true))
  dropdownOptions.value.every((v) => v.checked) &&
    ((ifCheckAll.value = true), (ifCheckSome.value = false))
  dropdownOptions.value.every((v) => !v.checked) &&
    ((ifCheckAll.value = false), (ifCheckSome.value = false))
}
// 筛选后最终列展示
const columns = computed(() =>
  props.allColumns.filter((c) =>
    dropdownOptions.value.some((o) => o.checked && o.key === c.key)
  )
)
// 筛选后表格最终最小宽度
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
