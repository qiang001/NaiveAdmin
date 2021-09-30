<template>
  <div class="d-flex a-center pb-1">
    <div class="ml-auto">
      <n-space>
        <n-spin :show="loading" size="tiny">
          <n-button @click="exportExcel" size="small">
            <template #icon>
              <n-icon>
                <excel-icon />
              </n-icon>
            </template>
            {{ loading ? '云端下载中...' : '导出Excel' }}
          </n-button>
        </n-spin>
        <n-button @click="add" type="primary" size="small">
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
import { NButton, NSpace, NIcon, NSpin } from 'naive-ui'
import { AddSharp as AddIcon } from '@vicons/material'
import { FileExcelOutlined as ExcelIcon } from '@vicons/antd'
import { inject } from 'vue'
const loading = inject('exportLoading')
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
