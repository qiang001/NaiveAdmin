<template>
  <n-layout-header bordered class="nav">
    <div class="d-flex a-center header">
      <div class="d-flex a-center j-center">
        <img src="@/assets/logo.svg" alt="" style="width: 36px" />
      </div>
      <div class="ml-2" style="font-size: 18px; font-weight: bold">
        通用后台管理系统
      </div>
      <div class="ml-auto">
        <theme-toggle/>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup>
import { NLayoutHeader } from 'naive-ui'
import ThemeToggle from './components/theme-toggle.vue'
</script>

<style scoped>
.nav {
  height: 64px;
}

.header {
  padding: 0 32px 0 32px;
  height: 100%;
}
</style>
