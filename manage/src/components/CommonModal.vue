<template>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card :style="`max-width: 600px;`">
      <template #header> {{ title }} </template>
      <template #header-extra>
        <div class="d-flex a-center j-center close-btn" @click="cancel">
          <n-icon size="18">
            <close-icon />
          </n-icon>
        </div>
      </template>
      <template #default>
        <slot></slot>
      </template>
      <template #action>
        <div class="d-flex a-center j-center">
          <n-space>
            <n-button @click="cancel">{{ cancelBtnText }}</n-button>
            <n-spin :show="confirmLoading" size="tiny">
              <n-button @click="confirm" type="primary">
                {{ confirmBtnText }}
              </n-button>
            </n-spin>
          </n-space>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { CloseOutlined as CloseIcon } from '@vicons/material'
import { NIcon } from 'naive-ui'
import { toRefs } from 'vue'

import { NButton, NModal, NCard, NSpace, NSpin } from 'naive-ui'

// 核心属性
const props = defineProps({
  showModal: Boolean,
  title: String,
  cancelBtnText: String,
  confirmBtnText: String,
  confirmLoading: Boolean,
})
const { showModal, title, cancelBtnText, confirmBtnText, confirmLoading } =
  toRefs(props)

// 暴露事件
const emit = defineEmits(['cancel', 'confirm'])
const cancel = () => {
  emit('cancel')
}

const confirm = async () => {
  emit('confirm')
}
</script>

<style scoped>
.close-btn {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transform: rotate(0);
  transition: all 0.5s ease;
}
.close-btn:hover {
  background-color: var(--border-color);
  transform: rotate(180deg);
  transition: all 0.5s ease;
}
</style>
