<template>
  <n-layout position="absolute">
    <Header></Header>
    <n-layout position="absolute" class="main" has-sider>
      <n-layout-sider
        bordered
        show-trigger="bar"
        collapse-mode="width"
        :collapsed-width="0"
        :width="240"
        :native-scrollbar="false"
      >
        <Menu></Menu>
      </n-layout-sider>
      <n-layout-content
        :native-scrollbar="false"
        embedded
        content-style="padding: 24px;"
      >
        <Page></Page>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import Header from './components/header/index.vue'
import Menu from './components/menu.vue'
import Page from './components/page.vue'
</script>

<style scoped>
.main {
  top: 64px !important;
}
</style>
