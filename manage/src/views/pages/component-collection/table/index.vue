<template>
  <page-panel :title="'表格'">
    <n-space vertical size="large">
      <n-alert title="通用表格 CommonTable" type="info">
        基于 Naive UI 的数据表格 NDataTable 组件封装了一些其他的功能
      </n-alert>
      <n-card title="演示" embedded>
        <n-button text @click="goTo"> 详见：/ 用户管理 / 用户列表 </n-button>
      </n-card>
    </n-space>
  </page-panel>
</template>

<script setup lang="ts">
import { NSpace, NAlert, NButton, NCard } from 'naive-ui'
import PagePanel from '@/components/PagePanel.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goTo = () => {
  router.push({ name: 'UserList' })
}
</script>

<style></style>
