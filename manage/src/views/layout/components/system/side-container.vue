<template>
  <div class="d-flex" style="flex-direction: column; min-height: 100vh">
    <div class="d-flex a-center p pb-0 pt-1">
      <div class="d-flex a-center j-center logo mr">
        <img src="@/assets/logo.png" alt="" style="width: 36px" />
      </div>
      <div style="font-size: 18px; font-weight: bold; font-family: PingFang SC">
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
const emit = defineEmits(['open'])
</script>

<style scoped></style>
