<template>
  <div class="d-flex handle-bar">
    <div class="ml-auto d-flex a-center j-center p pr-0">
      <n-spin :show="refreshing" size="tiny">
          <n-button @click="refresh" size="tiny">
            <template #icon>
              <n-icon>
                <refresh-icon />
              </n-icon>
            </template>
            刷新
          </n-button>
        </n-spin>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const refreshing = ref(false)
import { RefreshRound as RefreshIcon } from '@vicons/material'
import { NIcon,NSpin,NButton } from 'naive-ui'
const emit = defineEmits(['refreshPage'])
const refresh = () => {
  refreshing.value = true
  emit('refreshPage')
  setTimeout(() => {
    refreshing.value = false
  }, 500)
}
</script>

<style scoped>
.handle-bar {
  border-bottom: 1px solid var(--border-color);
  padding-right: 24px;
}
</style>
