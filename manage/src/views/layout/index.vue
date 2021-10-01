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
        <resize-bar @widthChange="widthChange"></resize-bar>
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false">
        <n-layout-header
          class="handle-bar-wrapper"
          v-if="route.name != 'Layout'"
        >
          <handle-bar
            @gotoTab="gotoTab"
            @deleteTab="deleteTab"
            @refreshPage="refreshRoute"
          ></handle-bar>
        </n-layout-header>
        <n-layout-content
          :native-scrollbar="false"
          embedded
          :content-style="`${route.name != 'Layout' ? 'padding: 24px;' : ''}`"
        >
          <Page></Page>
        </n-layout-content>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { provide, readonly } from 'vue'

import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  useLoadingBar,
  useMessage,
} from 'naive-ui'

window.$message = useMessage()

const loadingBar = useLoadingBar()

import { initController } from './initController'
const {
  outInverted,
  widthSpan,
  sectionWidth,
  route,
  history,
  widthChange,
  invertedChange,
  gotoTab,
  deleteTab,
  refreshRoute,
} = initController(loadingBar)

import Header from './components/header/index.vue'

import Menu from './components/menu.vue'

import ResizeBar from './components/resize-bar.vue'
provide('sectionWidth', readonly(sectionWidth))
provide('widthSpan', readonly(widthSpan))

import HandleBar from './components/handle-bar.vue'
provide('history', readonly(history))

import Page from './components/page.vue'
</script>

<style scoped>
.main {
  top: 64px !important;
}
.handle-bar-wrapper {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
