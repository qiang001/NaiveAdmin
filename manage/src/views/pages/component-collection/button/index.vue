<template>
  <page-panel :title="'按钮'">
    <n-space vertical size="large">
      <n-alert title="按钮 NButton" type="info">
        建议尽量只使用 default、primary 这两种类型的按钮, 以及特殊类型 tertiary
      </n-alert>
      <n-card title="演示">
        <n-space size="large">
          <n-space vertical size="large">
            <n-space align="center">
              <n-button size="tiny">默认按钮</n-button>
              <n-button size="tiny" round>默认按钮</n-button>
              <n-button size="tiny" disabled loading>默认按钮</n-button>
              <n-button size="tiny" secondary>默认按钮</n-button>
              <n-button size="tiny" quaternary>默认按钮</n-button>
            </n-space>
            <n-space align="center">
              <n-button size="small">默认按钮</n-button>
              <n-button size="small" round>默认按钮</n-button>
              <n-button size="small" disabled loading>默认按钮</n-button>
              <n-button size="small" secondary>默认按钮</n-button>
              <n-button size="small" quaternary>默认按钮</n-button>
            </n-space>
            <n-space align="center">
              <n-button>默认按钮</n-button>
              <n-button round>默认按钮</n-button>
              <n-button disabled loading>默认按钮</n-button>
              <n-button secondary>默认按钮</n-button>
              <n-button quaternary>默认按钮</n-button>
            </n-space>
            <n-space align="center">
              <n-button size="large">默认按钮</n-button>
              <n-button size="large" round>默认按钮</n-button>
              <n-button size="large" disabled loading>默认按钮</n-button>
              <n-button size="large" secondary>默认按钮</n-button>
              <n-button size="large" quaternary>默认按钮</n-button>
            </n-space>
          </n-space>
          <n-space vertical size="large">
            <n-space align="center">
              <n-button type="primary" size="tiny">主要按钮</n-button>
              <n-button type="primary" size="tiny" round>主要按钮</n-button>
              <n-button type="primary" size="tiny" disabled loading
                >主要按钮</n-button
              >
              <n-button type="primary" size="tiny" secondary>主要按钮</n-button>
              <n-button type="primary" size="tiny" quaternary
                >主要按钮</n-button
              >
            </n-space>
            <n-space align="center">
              <n-button type="primary" size="small">主要按钮</n-button>
              <n-button type="primary" size="small" round>主要按钮</n-button>
              <n-button type="primary" size="small" disabled loading
                >主要按钮</n-button
              >
              <n-button type="primary" size="small" secondary
                >主要按钮</n-button
              >
              <n-button type="primary" size="small" quaternary
                >主要按钮</n-button
              >
            </n-space>
            <n-space align="center">
              <n-button type="primary">主要按钮</n-button>
              <n-button type="primary" round>主要按钮</n-button>
              <n-button type="primary" disabled loading>主要按钮</n-button>
              <n-button type="primary" secondary>主要按钮</n-button>
              <n-button type="primary" quaternary>主要按钮</n-button>
            </n-space>
            <n-space align="center">
              <n-button type="primary" size="large">主要按钮</n-button>
              <n-button type="primary" size="large" round>主要按钮</n-button>
              <n-button type="primary" size="large" disabled loading
                >主要按钮</n-button
              >
              <n-button type="primary" size="large" secondary
                >主要按钮</n-button
              >
              <n-button type="primary" size="large" quaternary
                >主要按钮</n-button
              >
            </n-space>
          </n-space>
          <n-space vertical size="large">
            <n-space align="center">
              <n-button type="tertiary" size="tiny">特殊按钮</n-button>
              <n-button type="tertiary" size="tiny" round>特殊按钮</n-button>
              <n-button type="tertiary" size="tiny" disabled loading
                >特殊按钮</n-button
              >
              <n-button type="tertiary" size="tiny" secondary
                >特殊按钮</n-button
              >
              <n-button type="tertiary" size="tiny" quaternary
                >特殊按钮</n-button
              >
            </n-space>
            <n-space align="center">
              <n-button type="tertiary" size="small">特殊按钮</n-button>
              <n-button type="tertiary" size="small" round>特殊按钮</n-button>
              <n-button type="tertiary" size="small" disabled loading
                >特殊按钮</n-button
              >
              <n-button type="tertiary" size="small" secondary
                >特殊按钮</n-button
              >
              <n-button type="tertiary" size="small" quaternary
                >特殊按钮</n-button
              >
            </n-space>
            <n-space align="center">
              <n-button type="tertiary">特殊按钮</n-button>
              <n-button type="tertiary" round>特殊按钮</n-button>
              <n-button type="tertiary" disabled loading>特殊按钮</n-button>
              <n-button type="tertiary" secondary>特殊按钮</n-button>
              <n-button type="tertiary" quaternary>特殊按钮</n-button>
            </n-space>
            <n-space align="center">
              <n-button type="tertiary" size="large">特殊按钮</n-button>
              <n-button type="tertiary" size="large" round>特殊按钮</n-button>
              <n-button type="tertiary" size="large" disabled loading
                >特殊按钮</n-button
              >
              <n-button type="tertiary" size="large" secondary
                >特殊按钮</n-button
              >
              <n-button type="tertiary" size="large" quaternary
                >特殊按钮</n-button
              >
            </n-space>
          </n-space>
        </n-space>
      </n-card>
    </n-space>
  </page-panel>
</template>

<script setup lang="ts">
import { NSpace, NAlert, NButton, NCard } from 'naive-ui'
import PagePanel from '@/components/PagePanel.vue'
</script>

<style scoped></style>
