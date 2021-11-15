<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    transform-origin="center"
  >
    <n-card style="width: 240px">
      <n-space vertical>
        <n-space justify="center">
          <n-element
            v-if="type === 'success'"
            class="d-flex a-center j-center"
            style="
              background-color: #fff;
              border-radius: 50%;
              height: 54px;
              width: 54px;
              border: 5px solid;
            "
            :style="{
              borderColor: !store.state.ifDark ? '#d6f9e5' : '#2f4033',
            }"
          >
            <n-icon
              :size="68"
              :color="!store.state.ifDark ? '#00c250' : '#38b353'"
            >
              <success-icon />
            </n-icon>
          </n-element>
          <n-element
            v-if="type === 'error'"
            class="d-flex a-center j-center"
            style="
              background-color: #fff;
              border-radius: 50%;
              height: 54px;
              width: 54px;
              border: 5px solid;
            "
            :style="{
              borderColor: !store.state.ifDark ? '#ffcfcf' : '#443535',
            }"
          >
            <n-icon
              :size="68"
              :color="!store.state.ifDark ? '#da1212' : '#c93737'"
            >
              <error-icon />
            </n-icon>
          </n-element>
        </n-space>
        <n-element style="text-align: center">
          <div style="font-size: 18px; color: var(--text-color-base)">
            {{ contentText }}
          </div>
          <div style="font-size: 14px; color: var(--text-color-3)">
            {{ descriptionText }}
          </div>
        </n-element>
        <n-button
          size="large"
          @click="confirm"
          style="width: 100%"
          class="mt-2"
          >{{ btnText }}</n-button
        >
      </n-space>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NButton, NModal, NCard, NSpace, NIcon, NElement } from 'naive-ui'
import SuccessIcon from '@vicons/ionicons4/IosCheckmarkCircle'
import ErrorIcon from '@vicons/ionicons4/IosCloseCircle'
import { computed } from 'vue'
import { useStore } from '@/hooks/useStore'
const store = useStore()
// 核心属性
interface IProp {
  showModal: boolean
  type: 'success' | 'error'
  content?: string
  description?: string
  confirmBtnText?: string
}
const props = withDefaults(defineProps<IProp>(), {
  showModal: false,
  type: 'success',
  content: '',
  description: '',
  confirmBtnText: '',
})

const contentText = computed(() => {
  return props.content || (props.type === 'success' ? '恭喜你' : '很遗憾')
})

const descriptionText = computed(() => {
  return (
    props.description || (props.type === 'success' ? '操作成功' : '操作失败')
  )
})

const btnText = computed(() => {
  return props.confirmBtnText || '知道了'
})

// 暴露事件
const emit = defineEmits(['confirm'])

const confirm = async () => {
  emit('confirm')
}
</script>

<style scoped></style>
