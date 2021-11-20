<template>
  <div class="d-flex a-center" :class="collapsed ? 'j-center' : ''">
    <div
      class="d-flex a-center j-center"
      style="cursor: pointer"
      @click="() => emit('openSetting')"
    >
      <n-icon :size="21" :color="iconColor">
        <setting-icon />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon, useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()
import SettingIcon from '@vicons/material/BuildCircleRound'
import { Ref, inject, computed } from 'vue'
const collapsed = inject('collapsed') as Ref<boolean>
const inverted = inject('inverted') as Ref<boolean>
const iconColor = computed(() => {
  let color = themeVars.value.textColor2
  if (
    !store.state.ifDark &&
    ((store.state.layoutStyle === 'left-right' && inverted.value) ||
      store.state.layoutStyle === 'top-left-right-inverted')
  ) {
    color = themeVars.value.dividerColor
  }
  return color
})
import { useStore } from '@/hooks/useStore'
const store = useStore()
const emit = defineEmits(['openSetting'])
</script>

<style scoped></style>
