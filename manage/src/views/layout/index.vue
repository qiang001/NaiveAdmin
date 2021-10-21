<template>
  <n-layout position="absolute" class="page-plane">
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
        id="sider"
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
        <Menu @navigateTo="navigateTo"></Menu>
        <resize-bar @widthChange="widthChange" @widthChangeDone="widthChangeDone"></resize-bar>
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
          id="page"
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
  useDialog,
} from 'naive-ui'

window.$message = useMessage()
window.$dialog = useDialog()
const loadingBar = useLoadingBar()

import { initController } from './initController'
const {
  store,
  router,
  route,
  collapsed,
  inverted,
  ifHideIcon,
  widthSpan,
  sectionWidth,
  history,
  ifFullpage,
  refreshing,
  widthChange,
  widthChangeDone,
  collapsedChange,
  navigateTo,
  gotoTab,
  deleteTab,
  refreshRoute,
  setFullpage,
} = initController(loadingBar)

provide('store', readonly(store))
provide('router', readonly(router))
provide('route', readonly(route))

provide('inverted', inverted)
provide('ifHideIcon', ifHideIcon)

import Header from './components/header/index.vue'

import Menu from './components/menu.vue'
provide('collapsed', readonly(collapsed))

import ResizeBar from './components/resize-bar.vue'
provide('sectionWidth', readonly(sectionWidth))
provide('widthSpan', readonly(widthSpan))

import HandleBar from './components/handle-bar.vue'
provide('history', history)
provide('ifFullpage', readonly(ifFullpage))
provide('refreshing', readonly(refreshing))

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
  z-index: 999;
}

.n-layout-sider,
.n-layout-content {
  transition: all 0.3s ease;
}

@media only screen and (max-width: 720px) {
  .n-layout-content {
    pointer-events: none;
    cursor: default;
    opacity: 0;
    user-select: none;
  }
}

@media only screen and (min-width: 1800px) {
  #header, .main {
    max-width: 1800px;
    margin: auto;
    box-shadow: 0 0 8px 0 #3d3b3b26;
  }
}
</style>
