<template>
  <page-panel :title="'标签'">
    <n-space vertical size="large">
      <n-alert title="状态标签 StatusTag" type="info">
        props: <br />
        type - 'default' | 'disabled' | 'info' | 'success' | 'warning' | 'error'
        <br />
        shape - 'default' | 'square' | 'round' <br />
      </n-alert>
      <n-card title="演示">
        <n-space>
          <n-space align="center">
            <status-tag>皮尔特沃夫</status-tag>
            <status-tag shape="square">皮尔特沃夫</status-tag>
            <status-tag shape="round">皮尔特沃夫</status-tag>
          </n-space>
          <n-space align="center">
            <status-tag type="disabled">弗雷尔卓德</status-tag>
            <status-tag type="disabled" shape="square">弗雷尔卓德</status-tag>
            <status-tag type="disabled" shape="round">弗雷尔卓德</status-tag>
          </n-space>
          <n-space align="center">
            <status-tag type="info">德玛西亚</status-tag>
            <status-tag type="info" shape="square">德玛西亚</status-tag>
            <status-tag type="info" shape="round">德玛西亚</status-tag>
          </n-space>
          <n-space align="center">
            <status-tag type="success">艾欧尼亚</status-tag>
            <status-tag type="success" shape="square">艾欧尼亚</status-tag>
            <status-tag type="success" shape="round">艾欧尼亚</status-tag>
          </n-space>
          <n-space align="center">
            <status-tag type="warning">诺克萨斯</status-tag>
            <status-tag type="warning" shape="square">诺克萨斯</status-tag>
            <status-tag type="warning" shape="round">诺克萨斯</status-tag>
          </n-space>
          <n-space align="center">
            <status-tag type="error">暗影岛</status-tag>
            <status-tag type="error" shape="square">暗影岛</status-tag>
            <status-tag type="error" shape="round">暗影岛</status-tag>
          </n-space>
        </n-space>
      </n-card>
    </n-space>
  </page-panel>
</template>

<script setup lang="ts">
import { NSpace, NAlert, NCard } from 'naive-ui'
import StatusTag from '@/components/StatusTag/StatusTag'
import PagePanel from '@/components/PagePanel.vue'
</script>

<style scoped></style>
