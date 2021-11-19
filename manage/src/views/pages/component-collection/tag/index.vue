<template>
  <page-panel :title="'标签'">
    <n-space vertical size="large">
      <n-alert title="状态标签 StatusTag" type="info">
        props: <br />
        type - 'default' | 'disabled' | 'black' | 'info' | 'success' | 'warning'
        | 'error' <br />
        size - 'default' | 'large' <br />
        shape - 'default' | 'square' | 'round' <br />
        bold - boolean <br />
      </n-alert>
      <n-card title="演示">
        <n-space vertical size="large">
          <div style="font-weight: bold; font-size: 12px">default</div>
          <n-space align="center">
            <status-tag>皮尔特沃夫</status-tag>
            <status-tag bold>皮尔特沃夫</status-tag>
            <status-tag shape="square">皮尔特沃夫</status-tag>
            <status-tag shape="round">皮尔特沃夫</status-tag>
            <status-tag size="large">皮尔特沃夫</status-tag>
          </n-space>
          <div style="font-weight: bold; font-size: 12px">disabled</div>
          <n-space align="center">
            <status-tag type="disabled">弗雷尔卓德</status-tag>
            <status-tag type="disabled" bold>弗雷尔卓德</status-tag>
            <status-tag type="disabled" shape="square">弗雷尔卓德</status-tag>
            <status-tag type="disabled" shape="round">弗雷尔卓德</status-tag>
            <status-tag type="disabled" size="large">弗雷尔卓德</status-tag>
          </n-space>
          <div style="font-weight: bold; font-size: 12px">black</div>
          <n-space align="center">
            <status-tag type="black">恕瑞玛</status-tag>
            <status-tag type="black" bold>恕瑞玛</status-tag>
            <status-tag type="black" shape="square">恕瑞玛</status-tag>
            <status-tag type="black" shape="round">恕瑞玛</status-tag>
            <status-tag type="black" size="large">恕瑞玛</status-tag>
          </n-space>
          <div style="font-weight: bold; font-size: 12px">info</div>
          <n-space align="center">
            <status-tag type="info">德玛西亚</status-tag>
            <status-tag type="info" bold>德玛西亚</status-tag>
            <status-tag type="info" shape="square">德玛西亚</status-tag>
            <status-tag type="info" shape="round">德玛西亚</status-tag>
            <status-tag type="info" size="large">德玛西亚</status-tag>
          </n-space>
          <div style="font-weight: bold; font-size: 12px">success</div>
          <n-space align="center">
            <status-tag type="success">艾欧尼亚</status-tag>
            <status-tag type="success" bold>艾欧尼亚</status-tag>
            <status-tag type="success" shape="square">艾欧尼亚</status-tag>
            <status-tag type="success" shape="round">艾欧尼亚</status-tag>
            <status-tag type="success" size="large">艾欧尼亚</status-tag>
          </n-space>
          <div style="font-weight: bold; font-size: 12px">warning</div>
          <n-space align="center">
            <status-tag type="warning">诺克萨斯</status-tag>
            <status-tag type="warning" bold>诺克萨斯</status-tag>
            <status-tag type="warning" shape="square">诺克萨斯</status-tag>
            <status-tag type="warning" shape="round">诺克萨斯</status-tag>
            <status-tag type="warning" size="large">诺克萨斯</status-tag>
          </n-space>
          <div style="font-weight: bold; font-size: 12px">error</div>
          <n-space align="center">
            <status-tag type="error">暗影岛</status-tag>
            <status-tag type="error" bold>暗影岛</status-tag>
            <status-tag type="error" shape="square">暗影岛</status-tag>
            <status-tag type="error" shape="round">暗影岛</status-tag>
            <status-tag type="error" size="large">暗影岛</status-tag>
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
