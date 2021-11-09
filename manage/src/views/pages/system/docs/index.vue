<template>
  <page-panel :title="'文档中心'" @resize="handleResize" :allow-expand="false">
    <mavon-editor
      v-model="value"
      id="md-editor"
      :toolbars="toolbars"
      @save="handleSave"
      @fullScreen="handleFullScreen"
    />
  </page-panel>
</template>

<script setup lang="ts">
import PagePanel from '@/components/PagePanel.vue'

const toolbars = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: false, // 展示html源码
  help: false, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  /* 2.2.1 */
  subfield: true, // 单双栏模式
  preview: true, // 预览
}

import { ref, onMounted } from 'vue'
const value = ref('')
const handleSave = (params) => {
  console.log(params)
  window.$message.success('保存成功')
}
const editorWidth = ref('')
const editorHeight = ref('')
const handleResize = ({ width, height }) => {
  editorWidth.value = width + 'px'
  editorHeight.value = height + 'px'
}
const tempHeight = ref('')
const handleFullScreen = (params) => {
  if (params) {
    tempHeight.value = editorHeight.value
    editorHeight.value = '100vh'
  } else {
    editorHeight.value = tempHeight.value
    tempHeight.value = ''
  }
}

import { gsap } from 'gsap'
onMounted(() => {
  gsap.to('#md-editor', { duration: 0.8, y: 0, opacity: 1, delay: 0.45 })
})
</script>

<style scoped>
#md-editor {
  opacity: 0;
  transform: translateY(60px);
  min-width: v-bind(editorWidth);
  max-height: v-bind(editorHeight);
  min-height: v-bind(editorHeight);
}
</style>
