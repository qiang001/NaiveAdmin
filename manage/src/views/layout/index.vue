<template>
  <n-layout position="absolute">
    <Header
      id="header"
      :style="`${
        ifFullpage
          ? 'top:-64px!important;'
          : 'top:0px!important;transition-delay:0.1s'
      }`"
    ></Header>
    <n-layout
      position="absolute"
      class="main"
      :has-sider="!ifFullpage"
      :style="`${
        ifFullpage
          ? 'top:0px!important;transition-delay:0.1s'
          : 'top:64px!important;'
      }`"
    >
      <n-layout-sider
        v-show="!ifFullpage"
        bordered
        show-trigger="bar"
        collapse-mode="width"
        :collapsed-width="0"
        :width="sectionWidth"
        :inverted="inverted"
        :collapsed="collapsed"
        :native-scrollbar="false"
        @collapse="collapsedChange(true)"
        @expand="collapsedChange(false)"
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
            @setFullpage="setFullpage"
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
  collapsed,
  inverted,
  widthSpan,
  sectionWidth,
  route,
  history,
  ifFullpage,
  widthChange,
  collapsedChange,
  invertedChange,
  gotoTab,
  deleteTab,
  refreshRoute,
  setFullpage,
} = initController(loadingBar)

import Header from './components/header/index.vue'

import Menu from './components/menu.vue'
provide('collapsed', readonly(collapsed))
provide('inverted', readonly(inverted))

import ResizeBar from './components/resize-bar.vue'
provide('sectionWidth', readonly(sectionWidth))
provide('widthSpan', readonly(widthSpan))

import HandleBar from './components/handle-bar.vue'
provide('history', readonly(history))
provide('ifFullpage', readonly(ifFullpage))

import Page from './components/page.vue'
</script>

<style scoped>
#header {
  top: 0;
  transition: all 0.3s ease;
}
.main {
  top: 64px !important;
  transition: all 0.3s ease;
}
.delay {
  transition-delay: 0.1s;
}
.handle-bar-wrapper {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
