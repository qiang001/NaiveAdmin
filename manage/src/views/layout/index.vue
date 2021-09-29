<template>
  <n-layout position="absolute">
    <Header></Header>
    <n-layout position="absolute" class="main" has-sider>
      <n-layout-sider
        bordered
        show-trigger="bar"
        collapse-mode="width"
        :collapsed-width="0"
        :width="sectionWidth"
        :inverted="outInverted"
        :native-scrollbar="false"
      >
        <Menu @invertedChange="invertedChange"></Menu>
        <handle-bar @widthChange="widthChange"></handle-bar>
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
import { NLayout, NLayoutSider, NLayoutContent, useLoadingBar } from 'naive-ui'
import Header from './components/header/index.vue'
import Menu from './components/menu.vue'
import HandleBar from './components/handle-bar.vue'
import Page from './components/page.vue'
import { provide, readonly } from 'vue'
import { initController } from './initController'
const { outInverted, invertedChange, sectionWidth, widthChange } =
  initController()
  
provide('section-width', readonly(sectionWidth))

import { useRouter } from 'vue-router'
const router = useRouter()
const loadingBar = useLoadingBar()
router.beforeEach((to, from, next) => {
  loadingBar.start()
  next()
})
router.afterEach((to, from, failure) => {
  failure ? loadingBar.error() : loadingBar.finish()
})
</script>

<style scoped>
.main {
  top: 64px !important;
}
</style>
