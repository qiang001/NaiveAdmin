<template>
  <n-modal v-model:show="showModal" :mask-closable="false" id="common-modal">
    <n-card :style="cardWidth">
      <template #header> {{ title }} </template>
      <template #header-extra>
        <div
          class="d-flex a-center j-center fullscreen-btn mr-1"
          @click="handleFullscrenn"
        >
          <n-icon size="18">
            <fullscreen-icon v-if="!ifFullscreen" />
            <normalscreen-icon v-else />
          </n-icon>
        </div>
        <div class="d-flex a-center j-center close-btn" @click="cancel">
          <n-icon size="18">
            <close-icon />
          </n-icon>
        </div>
      </template>
      <template #default> <slot></slot> </template>
      <template #action>
        <div class="d-flex a-center j-center">
          <n-space>
            <n-button @click="cancel">{{ cancelBtnText }}</n-button>
            <n-button
              @click="confirm"
              type="primary"
              :loading="confirmLoading"
              :disabled="confirmLoading"
            >
              {{ confirmBtnText }}
            </n-button>
          </n-space>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import {
  CloseOutlined as CloseIcon,
  FullscreenFilled as FullscreenIcon,
  FullscreenExitFilled as NormalscreenIcon,
} from '@vicons/material'
import { NIcon } from 'naive-ui'
import { toRefs, ref, computed, watch } from 'vue'

import { NButton, NModal, NCard, NSpace, NSpin } from 'naive-ui'

// 核心属性
const props = defineProps({
  showModal: Boolean,
  width: Number,
  title: String,
  cancelBtnText: String,
  confirmBtnText: String,
  confirmLoading: Boolean,
})
const {
  showModal,
  width,
  title,
  cancelBtnText,
  confirmBtnText,
  confirmLoading,
} = toRefs(props)

// 暴露事件
const emit = defineEmits(['cancel', 'confirm'])
const cancel = () => {
  emit('cancel')
}

const confirm = async () => {
  emit('confirm')
}

// 组件全屏
import { useFullscreen } from '@/hooks/useFullscreen.js'
const { launchFullscreen, exitFullscreen } = useFullscreen()
const ifFullscreen = ref(false)
const handleFullscrenn = () => {
  !ifFullscreen.value
    ? launchFullscreen(
        document.getElementById('common-modal').parentNode.parentNode
      )
    : exitFullscreen()
  ifFullscreen.value = !ifFullscreen.value
}

watch(showModal, () => {
  if (!showModal.value) {
    ifFullscreen.value = false
  }
})

// 组件宽度
const cardWidth = computed(() => {
  let value = width.value || 600
  return ifFullscreen.value ? 'min-height:100vh' : `max-width:${value}px`
})
</script>

<style scoped>
.fullscreen-btn,
.close-btn {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transform: rotate(0);
  transition: all 0.5s ease;
}
.fullscreen-btn:hover {
  background-color: var(--border-color);
  transform: rotate(180deg);
  transition: all 0.5s ease;
}

.close-btn:hover {
  background-color: var(--border-color);
  transform: rotate(180deg);
  transition: all 0.5s ease;
}
</style>
