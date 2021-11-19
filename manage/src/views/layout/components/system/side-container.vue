<template>
  <div class="d-flex" style="flex-direction: column; min-height: 100vh">
    <div
      class="d-flex a-center py-1"
      :class="`${!collapsed ? 'pl-1' : 'j-center'}`"
    >
      <div class="d-flex a-center j-center">
        <img src="@/assets/logo.png" alt="" style="width: 36px" />
      </div>
      <div v-if="!collapsed" class="ml" id="title">海獭.Design</div>
    </div>
    <slot></slot>
    <n-element
      class="p-1 mt-auto"
      :style="
        inverted && !store.state.ifDark
          ? 'border-top: 1px solid #1d2022'
          : 'border-top: 1px solid var(--divider-color)'
      "
    >
      <div class="mb-1">
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
import SettingTrigger from './components/setting-trigger.vue'
import { Ref, inject } from 'vue'
import { useStore } from '@/hooks/useStore'
const store = useStore()
const collapsed = inject('collapsed') as Ref<boolean>
const inverted = inject('inverted') as Ref<boolean>
const emit = defineEmits(['open'])
</script>

<style scoped>
#title {
  min-width: 105px;
  font-size: 18px;
  font-weight: bold;
  font-family: PingFang SC;
}
</style>
