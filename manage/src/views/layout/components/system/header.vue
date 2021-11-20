<template>
  <div class="d-flex a-center header">
    <div class="d-flex a-center j-center logo">
      <img src="@/assets/logo.png" alt="" style="width: 36px" />
    </div>
    <div class="ml-2 title">
      <div style="font-size: 18px; font-weight: bold; font-family: PingFang SC">
        海獭后台设计
      </div>
      <div style="font-size: 12px; font-family: PingFang SC, Segoe UI">
        Content Manage System Design
      </div>
    </div>
    <div class="ml-auto d-flex a-center">
      <div class="d-flex a-center">
        <notification @viewNotification="(bool) => emit('view', bool)" />
        <div class="mx-2">
          <setting-trigger @openSetting="() => emit('open')" />
        </div>
        <Account />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Account from './components/account.vue'
import Notification from './components/notification.vue'
import SettingTrigger from './components/setting-trigger.vue'
const emit = defineEmits(['view', 'open'])
</script>

<style scoped>
.header {
  padding: 0 10px 0 10px;
  height: 100%;
  transition: all 0.3s ease;
}
.logo {
  margin-left: 5px;
}

@media only screen and (max-width: 500px) {
  .header {
    padding: 0 10px 0 10px;
  }
  .title {
    display: none;
  }
}
</style>
