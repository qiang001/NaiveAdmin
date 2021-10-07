<template>
  <n-layout-header bordered position="absolute" class="nav">
    <div class="d-flex a-center header">
      <div class="d-flex a-center j-center logo">
        <img src="@/assets/logo.png" alt="" style="width: 36px" />
      </div>
      <div class="ml-2">
        <div
          style="font-size: 18px; font-weight: bold; font-family: PingFang SC"
        >
          通用后台管理系统
        </div>
        <div style="font-size: 12px; font-family: PingFang SC, Segoe UI">
          Common Content Manage System
        </div>
      </div>
      <div class="ml-auto d-flex a-center">
        <Account/>
        <theme-toggle />
        <main-color class="main-color" />
      </div>
    </div>
  </n-layout-header>
</template>

<script setup>
import { NLayoutHeader } from 'naive-ui'
import ThemeToggle from './components/theme-toggle.vue'
import MainColor from './components/main-color.vue'
import Account from './components/account.vue'
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

@media only screen and (max-width: 450px) {
  .header {
    padding: 0 10px 0 10px;
  }
  .main-color {
    display: none;
  }
}
</style>
