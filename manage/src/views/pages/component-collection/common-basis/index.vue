<template>
  <page-panel :title="'通用规范'">
    <n-space vertical size="large">
      <n-alert title="按钮规范" type="info">
        基于 Naive UI 的主题定制化对按钮样式进行了微调，建议尽量只使用
        Default、Primary 此两种类型的按钮
      </n-alert>
      <n-space align="center">
        <n-button size="tiny">默认按钮</n-button>
        <n-button size="small">默认按钮</n-button>
        <n-button>默认按钮</n-button>
        <n-button size="large">默认按钮</n-button>
      </n-space>
      <n-space align="center">
        <n-button size="tiny" type="primary">主要按钮</n-button>
        <n-button size="small" type="primary">主要按钮</n-button>
        <n-button type="primary">主要按钮</n-button>
        <n-button size="large" type="primary">主要按钮</n-button>
      </n-space>
      <n-alert title="自定义状态标签" type="info">
        基于 Naive UI 的 NElement 组件制作的组件 StatusTag，并提供
        renderStatusTag 函数单独支持 render 渲染
      </n-alert>
      <div style="font-size: 12px; font-weight: bold">默认大小</div>
      <n-space align="center">
        <div>默认边框</div>
        <status-tag></status-tag>
        <status-tag type="success">成功类型</status-tag>
        <status-tag type="info">信息类型</status-tag>
        <status-tag type="warning">警告类型</status-tag>
        <status-tag type="error">错误类型</status-tag>
      </n-space>
      <n-space align="center">
        <div>圆形边框</div>
        <status-tag shape="round"></status-tag>
        <status-tag type="success" shape="round">成功类型</status-tag>
        <status-tag type="info" shape="round">信息类型</status-tag>
        <status-tag type="warning" shape="round">警告类型</status-tag>
        <status-tag type="error" shape="round">错误类型</status-tag>
      </n-space>
      <n-space align="center">
        <div>方形边框</div>
        <status-tag shape="square"></status-tag>
        <status-tag type="success" shape="square">成功类型</status-tag>
        <status-tag type="info" shape="square">信息类型</status-tag>
        <status-tag type="warning" shape="square">警告类型</status-tag>
        <status-tag type="error" shape="square">错误类型</status-tag>
      </n-space>
      <div style="font-size: 12px; font-weight: bold">大亿点点</div>
      <n-space align="center">
        <div>默认边框</div>
        <status-tag size="large"></status-tag>
        <status-tag size="large" type="success">成功类型</status-tag>
        <status-tag size="large" type="info">信息类型</status-tag>
        <status-tag size="large" type="warning">警告类型</status-tag>
        <status-tag size="large" type="error">错误类型</status-tag>
      </n-space>
      <n-space align="center">
        <div>圆形边框</div>
        <status-tag size="large" shape="round"></status-tag>
        <status-tag size="large" type="success" shape="round"
          >成功类型</status-tag
        >
        <status-tag size="large" type="info" shape="round">信息类型</status-tag>
        <status-tag size="large" type="warning" shape="round"
          >警告类型</status-tag
        >
        <status-tag size="large" type="error" shape="round"
          >错误类型</status-tag
        >
      </n-space>
      <n-space align="center">
        <div>方形边框</div>
        <status-tag size="large" shape="square"></status-tag>
        <status-tag size="large" type="success" shape="square"
          >成功类型</status-tag
        >
        <status-tag size="large" type="info" shape="square"
          >信息类型</status-tag
        >
        <status-tag size="large" type="warning" shape="square"
          >警告类型</status-tag
        >
        <status-tag size="large" type="error" shape="square"
          >错误类型</status-tag
        >
      </n-space>
    </n-space>
  </page-panel>
</template>

<script setup lang="ts">
import { NSpace, NAlert, NButton } from 'naive-ui'
import StatusTag from '@/components/StatusTag/StatusTag'
import PagePanel from '@/components/PagePanel.vue'
</script>

<style scoped></style>
