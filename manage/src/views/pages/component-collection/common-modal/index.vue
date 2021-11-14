<template>
  <page-panel :title="'通用弹窗'">
    <n-space vertical size="large">
      <n-alert title="自定义弹窗" type="info">
        基于 Naive UI 的模态框 Modal 组件 + 卡片 Card 组件封装了一些其他的功能
      </n-alert>
      <n-card title="定制化" embedded>
        <n-space vertical size="large">
          <n-space align="center">
            <div>宽度</div>
            <n-input-number
              v-model:value="options.width"
              clearable
              :step="20"
            />
          </n-space>
          <n-space align="center">
            <div>标题</div>
            <n-input
              v-model:value="options.title"
              type="text"
              placeholder="弹窗标题"
              clearable
            />
          </n-space>
          <n-checkbox v-model:checked="options.fullscreen"
            >可全屏展开</n-checkbox
          >
          <n-checkbox v-model:checked="options.footer">显示 footer</n-checkbox>
          <n-space align="center" v-if="options.footer">
            <div>取消按钮文本</div>
            <n-input
              v-model:value="options.cancelBtnText"
              type="text"
              placeholder="取消"
              clearable
            />
            <div>确认按钮文本</div>
            <n-input
              v-model:value="options.confirmBtnText"
              type="text"
              placeholder="确认"
              clearable
            />
          </n-space>
          <n-space justify="end">
            <n-button @click="() => open(false)">点击打开</n-button>
            <n-button type="primary" @click="() => open()">点击打开</n-button>
          </n-space>
        </n-space>
      </n-card>
    </n-space>

    <common-modal
      :showModal="options.showModal"
      :width="options.width"
      :title="options.title"
      :fullscreen="options.fullscreen"
      :footer="options.footer"
      :cancelBtnText="options.cancelBtnText"
      :confirmBtnText="options.confirmBtnText"
      :confirmLoading="options.confirmLoading"
      @cancel="cancel"
      @confirm="confirm"
    >
      <n-space vertical v-if="options.placeholder">
        <n-alert title="你的业务内容" type="info">
          一般来说是表单, 或者纯展示的信息
        </n-alert>
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="3" />
        <n-skeleton text style="width: 80%" />
      </n-space>
      <div style="height: 267px" v-else></div>
    </common-modal>
  </page-panel>
</template>

<script setup lang="ts">
import {
  NSpace,
  NButton,
  NAlert,
  NSkeleton,
  NCard,
  NInputNumber,
  NInput,
  NCheckbox,
} from 'naive-ui'
import PagePanel from '@/components/PagePanel.vue'
import CommonModal from '@/components/CommonModal.vue'
import { reactive } from 'vue'
const options = reactive({
  showModal: false,
  width: 600,
  title: '标题',
  fullscreen: true,
  footer: true,
  cancelBtnText: '取消',
  confirmBtnText: '确认',
  confirmLoading: false,
  placeholder: true,
})
const open = (ifplaceholder: boolean = true) => {
  options.placeholder = ifplaceholder
  options.showModal = true
}
const close = () => (options.showModal = false)
const cancel = () => {
  close()
}
const confirm = () => {
  options.confirmLoading = true
  setTimeout(() => {
    options.confirmLoading = false
    close()
  }, 1000)
}
</script>

<style></style>
