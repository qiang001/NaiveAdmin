<template>
  <page-panel :title="'基础规范'">
    <n-space vertical size="large">
      <n-alert title="按钮 NButton" type="info">
        基于 Naive UI 的主题定制化对按钮样式进行了微调，建议尽量只使用
        Default、Primary 此两种类型的按钮
      </n-alert>
      <n-card title="演示" embedded>
        <n-space vertical size="large">
          <n-space align="center">
            <n-button size="tiny">默认按钮</n-button>
            <n-button size="small" loading>默认按钮</n-button>
            <n-button disabled>默认按钮</n-button>
            <n-button size="large" loading disabled>默认按钮</n-button>
          </n-space>
          <n-space align="center">
            <n-button size="tiny" type="primary">主要按钮</n-button>
            <n-button size="small" type="primary" loading>主要按钮</n-button>
            <n-button type="primary" disabled>主要按钮</n-button>
            <n-button size="large" type="primary" loading disabled
              >主要按钮</n-button
            >
          </n-space>
        </n-space>
      </n-card>
      <n-alert title="状态标签 StatusTag" type="info">
        props: <br />
        type - 'default' | 'success' | 'info' | 'warning' | 'error' <br />
        size - 'default' | 'large' <br />
        shape - 'default' | 'square' | 'round' <br />
        bold - boolean <br />
      </n-alert>
      <n-card title="演示" embedded>
        <n-space align="center">
          <status-tag>恕瑞玛</status-tag>
          <status-tag type="success" size="large">艾欧尼亚</status-tag>
          <status-tag type="info" shape="square">弗雷尔卓德</status-tag>
          <status-tag type="warning" shape="round">诺克萨斯</status-tag>
          <status-tag type="error" bold>暗影岛</status-tag>
        </n-space>
      </n-card>
    </n-space>
  </page-panel>
</template>

<script setup lang="ts">
import { NSpace, NAlert, NButton, NCard } from 'naive-ui'
import StatusTag from '@/components/StatusTag/StatusTag'
import PagePanel from '@/components/PagePanel.vue'
</script>

<style scoped></style>
