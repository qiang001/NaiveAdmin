<template>
  <div class="d-flex a-center header">
    <div class="d-flex a-center j-center logo">
      <img src="@/assets/logo.png" alt="" style="width: 36px" />
    </div>
    <div class="ml-2 title">
      <div style="font-size: 18px; font-weight: bold">海獭后台设计</div>
      <div style="font-size: 12px">Content Manage System Design</div>
    </div>
    <div class="ml-auto d-flex a-center">
      <div class="d-flex a-center">
        <div class="systemBtn">
          <notification @viewNotification="(bool) => emit('view', bool)" />
        </div>
        <div class="mx-1 systemBtn">
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
import { Ref, inject, computed } from 'vue'
const inverted = inject('inverted') as Ref<boolean>
import { useStore } from '@/hooks/useStore'
const store = useStore()
const systemBtnColor = computed(() =>
  store.state.layoutStyle === 'top-left-right-inverted'
    ? '#ffffff17'
    : !store.state.ifDark
    ? '#efeff5'
    : '#ffffff17'
)
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

.systemBtn {
  border-radius: 3px;
  background-color: transparent;
  transition: all 0.3s ease;
}
.systemBtn:hover {
  background-color: v-bind(systemBtnColor);
  transition: all 0.3s ease;
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
