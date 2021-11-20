<template>
  <div>
    <n-button
      v-if="
        !collapsed ||
        ['top-left-right', 'top-left-right-inverted'].includes(
          store.state.layoutStyle
        )
      "
      size="small"
      :text="true"
      :text-color="
        (inverted && store.state.layoutStyle === 'left-right') ||
        store.state.layoutStyle === 'top-left-right-inverted'
          ? '#eeeeee'
          : undefined
      "
      @click="() => emit('openSetting')"
    >
      <template #icon>
        <n-icon>
          <setting-icon />
        </n-icon>
      </template>
      设置
    </n-button>
    <div
      v-else
      class="d-flex a-center j-center"
      style="cursor: pointer"
      @click="() => emit('openSetting')"
    >
      <n-icon :size="20">
        <setting-icon />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import SettingIcon from '@vicons/ionicons5/SettingsSharp'
import { Ref, inject } from 'vue'
import { useStore } from '@/hooks/useStore'
const store = useStore()
const collapsed = inject('collapsed') as Ref<boolean>
const inverted = inject('inverted') as Ref<boolean>
const emit = defineEmits(['openSetting'])
</script>

<style scoped></style>
