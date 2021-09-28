<template>
  <n-layout-header bordered class="nav">
    <div class="d-flex a-center header">
      <div class="d-flex a-center j-center logo">
        <img src="@/assets/logo.svg" alt="" style="width: 36px" />
      </div>
      <div class="ml-2">
        <div style="font-size: 18px; font-weight: bold">通用后台管理系统</div>
        <div style="font-size: 12px; font-family: PingFang SC, Segoe UI">
          Common Content Manage System
        </div>
      </div>
      <div class="ml-auto d-flex a-center">
        <main-color />
        <theme-toggle />
      </div>
    </div>
  </n-layout-header>
</template>

<script setup>
import { NLayoutHeader } from 'naive-ui'
import ThemeToggle from './components/theme-toggle.vue'
import MainColor from './components/main-color.vue'
</script>

<style scoped>
.nav {
  height: 64px;
}
.header {
  padding: 0 24px 0 24px;
  height: 100%;
}
.logo {
  margin-left: 5px;
}
</style>
