<template>
  <n-popover
    :on-update:show="(bool) => emit('viewNotification', bool)"
    trigger="click"
    :placement="
      store.state.layoutStyle === 'left-right' ? 'right-end' : 'bottom-end'
    "
  >
    <template #trigger>
      <div class="d-flex a-center" :class="collapsed ? 'j-center' : ''">
        <n-badge processing :value="12">
          <div class="d-flex a-center j-center" style="cursor: pointer">
            <n-icon :size="21" :color="iconColor">
              <notification-icon />
            </n-icon>
          </div>
        </n-badge>
      </div>
    </template>
    <div>12 条系统通知...</div>
  </n-popover>
</template>

<script setup lang="ts">
import { NIcon, NPopover, NBadge, useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()
import NotificationIcon from '@vicons/material/CircleNotificationsRound'
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
const emit = defineEmits(['viewNotification'])
</script>

<style scoped></style>
