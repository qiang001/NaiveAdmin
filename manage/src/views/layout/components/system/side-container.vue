<template>
  <div class="d-flex" style="flex-direction: column; min-height: 100vh">
    <n-element
      style="
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: var(--color);
        box-shadow: 0 0 4px 0 #80808026;
      "
      class="d-flex a-center py-1"
      :class="`${!collapsed ? 'pl-1' : 'j-center'}`"
    >
      <div class="d-flex a-center j-center">
        <img src="@/assets/logo.png" alt="" style="width: 36px" />
      </div>
      <div v-if="!collapsed" class="ml" id="title">海獭.Design</div>
    </n-element>
    <slot></slot>
    <n-element
      class="p-1 mt-auto"
      style="
        position: sticky;
        bottom: 0;
        z-index: 1;
        background-color: var(--color);
        box-shadow: 0 0 4px 0 #80808026;
      "
    >
      <div class="mt-1 mb-2 d-flex">
        <notification @viewNotification="(bool) => emit('view', bool)" />
      </div>
      <div class="mb-2">
        <setting-trigger @openSetting="() => emit('open')" />
      </div>
      <div>
        <Account />
      </div>
    </n-element>
  </div>
</template>

<script setup lang="ts">
import { NElement } from 'naive-ui'
import Account from './components/account.vue'
import Notification from './components/notification.vue'
import SettingTrigger from './components/setting-trigger.vue'
import { Ref, inject } from 'vue'
const collapsed = inject('collapsed') as Ref<boolean>
const emit = defineEmits(['view', 'open'])
</script>

<style scoped>
#title {
  min-width: 105px;
  font-size: 18px;
  font-weight: bold;
  font-family: PingFang SC;
}
</style>
