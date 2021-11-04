<template>
  <div class="d-flex" style="flex-direction: column; min-height: 100vh">
    <div class="d-flex a-center py-1 j-center" :class="{ 'pb-0': !collapsed }">
      <div class="d-flex a-center j-center logo">
        <img src="@/assets/logo.png" alt="" style="width: 36px" />
      </div>
      <div
        v-if="!collapsed"
        class="ml"
        style="font-size: 18px; font-weight: bold; font-family: PingFang SC"
      >
        Hita.Design
      </div>
    </div>
    <slot></slot>
    <div class="p-1 mt-auto">
      <div class="my-1">
        <setting-trigger @openSetting="() => emit('open')" />
      </div>
      <div>
        <Account />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Account from './components/account.vue'
import SettingTrigger from './components/setting-trigger.vue'
import { Ref, inject } from 'vue'
const collapsed = inject('collapsed') as Ref<boolean>
const emit = defineEmits(['open'])
</script>

<style scoped></style>
