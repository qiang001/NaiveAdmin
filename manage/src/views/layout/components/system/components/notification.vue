<template>
  <n-popover
    :on-update:show="(bool) => emit('viewNotification', bool)"
    trigger="click"
    :disabled="badgeNum <= 0"
    :placement="
      store.state.layoutStyle === 'left-right' ? 'right-end' : 'bottom-end'
    "
  >
    <template #trigger>
      <div class="p" style="cursor: pointer">
        <div class="d-flex a-center" :class="collapsed ? 'j-center' : ''">
          <n-badge processing :value="badgeNum">
            <div class="d-flex a-center j-center" style="cursor: pointer">
              <n-icon :size="21" :color="iconColor">
                <notification-icon />
              </n-icon>
            </div>
          </n-badge>
        </div>
      </div>
    </template>
    <div>{{ badgeNum }} 条系统通知...</div>
  </n-popover>
</template>

<script setup lang="ts">
import { NIcon, NPopover, NBadge, useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()
import NotificationIcon from '@vicons/material/CircleNotificationsRound'
import { Ref, inject, computed } from 'vue'
const badgeNum = inject('badgeNum') as Ref<number>

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
