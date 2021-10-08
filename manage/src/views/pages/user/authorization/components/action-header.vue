<template>
  <div class="d-flex a-center pb-1">
    <div class="ml-auto">
      <n-space>
        <n-button
          @click="exportExcel"
          size="medium"
          :loading="exportLoading"
          :disabled="exportLoading"
        >
          <template #icon>
            <n-icon>
              <excel-icon />
            </n-icon>
          </template>
          {{ exportLoading ? '云端下载中...' : '导出Excel' }}
        </n-button>
        <n-button @click="add" type="primary" size="medium">
          <template #icon>
            <n-icon>
              <add-icon />
            </n-icon>
          </template>
          添加新角色
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { NButton, NSpace, NIcon } from 'naive-ui'
import { AddSharp as AddIcon , FileDownloadOutlined as ExcelIcon } from '@vicons/material'
import { inject } from 'vue'
// 注入状态数据以进行 UI渲染 UX交互
const exportLoading = inject('exportLoading')
// 暴露事件
const emit = defineEmits(['exportExcel', 'add'])
const exportExcel = () => {
  emit('exportExcel')
}

const add = () => {
  emit('add')
}
</script>

<style></style>
