<template>
  <n-modal v-model:show="showModal" :mask-closable="false" id="common-modal">
    <n-card :style="cardWidth">
      <template #header> {{ title }} </template>
      <template #header-extra>
        <div
          v-if="fullscreen"
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
      <template #action v-if="footer">
        <n-space justify="end">
          <n-button secondary @click="cancel">{{
            cancelBtnText || '取消'
          }}</n-button>
          <n-button
            @click="confirm"
            type="primary"
            :loading="confirmLoading"
            :disabled="confirmLoading"
          >
            {{ confirmBtnText || '确认' }}
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NButton, NModal, NCard, NSpace, NIcon } from 'naive-ui'
import CloseIcon from '@vicons/material/CloseOutlined'
import FullscreenIcon from '@vicons/material/FullscreenFilled'
import NormalscreenIcon from '@vicons/material/FullscreenExitFilled'
import { ref, computed } from 'vue'

// 核心属性
interface IProp {
  showModal: boolean
  width?: number
  title?: string
  fullscreen?: boolean
  footer?: boolean
  cancelBtnText?: string
  confirmBtnText?: string
  confirmLoading?: boolean
}
const props = withDefaults(defineProps<IProp>(), {
  showModal: false,
  width: 600,
  title: '',
  fullscreen: true,
  footer: true,
  cancelBtnText: '取消',
  confirmBtnText: '确认',
  confirmLoading: false,
})

// 暴露事件
const emit = defineEmits(['cancel', 'confirm'])
const cancel = () => {
  emit('cancel')
}

const confirm = async () => {
  emit('confirm')
}

// 组件私有逻辑
// 组件全屏
const ifFullscreen = ref(false)
const handleFullscrenn = () => {
  ifFullscreen.value = !ifFullscreen.value
}

// 组件宽度
const cardWidth = computed(() =>
  ifFullscreen.value ? 'min-height:100vh' : `max-width:${props.width}px`
)
</script>

<style scoped>
.fullscreen-btn,
.close-btn {
  height: 32px;
  width: 32px;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  /* transform: rotate(0); */
  transition: all 0.3s ease;
}
.fullscreen-btn:hover {
  background-color: var(--border-color);
  /* transform: rotate(180deg); */
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: var(--border-color);
  /* transform: rotate(180deg); */
  transition: all 0.3s ease;
}
:deep(.n-card-header) {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}
:deep(.n-card__content) {
  padding-top: 20px;
}

:deep(.n-card__action) {
  padding: 12px;
}
</style>
