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
        基于 Naive UI 的 NElement 组件制作的组件 StatusTag <br />
        props: <br />
        type - 'default' | 'success' | 'info' | 'warning' | 'error' <br />
        size - 'default' | 'large' <br />
        shape - 'default' | 'square' | 'round' <br />
        bold - boolean <br />
      </n-alert>
      <n-space align="center">
        <status-tag>恕瑞玛</status-tag>
        <status-tag type="success" size="large">艾欧尼亚</status-tag>
        <status-tag type="info" shape="square">弗雷尔卓德</status-tag>
        <status-tag type="warning" shape="round">诺克萨斯</status-tag>
        <status-tag type="error" bold>暗影岛</status-tag>
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
