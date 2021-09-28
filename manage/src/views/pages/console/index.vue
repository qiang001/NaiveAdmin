<template>
  <page-panel :title="'主控台'">
    <div class="d-flex a-center">
      <n-button
        type="primary"
        size="small"
        @click="goToView('Login')"
        >登录页</n-button
      >
      <n-button size="small" class="ml-2" @click="goToView('404')"
        >404页面</n-button
      >
    </div>
  </page-panel>
</template>

<script setup>
import PagePanel from '@/components/PagePanel.vue'
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()
const goToView = (name) => {
  router.push({
    name,
  })
}
</script>

<style></style>
