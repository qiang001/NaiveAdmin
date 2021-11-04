<template>
  <div>
    <n-layout
      position="absolute"
      class="page-plane"
      v-if="store.state.layoutStyle === 'top-left-right'"
    >
      <Header
        @open="openSetting"
        id="header"
        :style="`${
          ifFullpage
            ? 'top:-64px!important;'
            : 'top:0px!important;transition-delay:0.1s'
        }`"
      ></Header>
      <n-layout
        position="absolute"
        class="main-top-left-right"
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
          :show-trigger="false"
          collapse-mode="width"
          :collapsed-width="48"
          :width="sectionWidth"
          :inverted="inverted"
          :collapsed="collapsed"
          :native-scrollbar="false"
          @collapse="collapsedChange(true)"
          @expand="collapsedChange(false)"
        >
          <Menu @navigateTo="navigateTo"></Menu>
          <resize-bar
            v-if="!collapsed"
            @widthChange="widthChange"
            @widthChangeDone="widthChangeDone"
          ></resize-bar>
        </n-layout-sider>
        <n-layout-content :native-scrollbar="false">
          <n-layout-header
            class="handle-bar-wrapper"
            v-if="route.name != 'Layout'"
          >
            <handle-bar
              @collapse="collapsedChange"
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
            :content-style="`${route.name != 'Layout' ? 'padding: 14px;' : ''}`"
          >
            <Page></Page>
          </n-layout-content>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-layout position="absolute" class="page-plane" v-else>
      <n-layout
        position="absolute"
        class="main-left-right"
        :has-sider="!ifFullpage"
      >
        <n-layout-sider
          id="sider"
          v-show="!ifFullpage"
          bordered
          :show-trigger="false"
          collapse-mode="width"
          :collapsed-width="48"
          :width="sectionWidth"
          :inverted="inverted"
          :collapsed="collapsed"
          :native-scrollbar="false"
          @collapse="collapsedChange(true)"
          @expand="collapsedChange(false)"
        >
          <side-container @open="openSetting">
            <Menu @navigateTo="navigateTo"></Menu>
          </side-container>
          <resize-bar
            v-if="!collapsed"
            @widthChange="widthChange"
            @widthChangeDone="widthChangeDone"
          ></resize-bar>
        </n-layout-sider>
        <n-layout-content :native-scrollbar="false">
          <n-layout-header
            class="handle-bar-wrapper"
            v-if="route.name != 'Layout'"
          >
            <handle-bar
              @collapse="collapsedChange"
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
            :content-style="`${route.name != 'Layout' ? 'padding: 14px;' : ''}`"
          >
            <Page></Page>
          </n-layout-content>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <setting @close="closeSetting"></setting>
  </div>
</template>

<script setup lang="ts">
import { provide, readonly } from 'vue'

import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  useMessage,
  useDialog,
} from 'naive-ui'

window.$message = useMessage()
window.$dialog = useDialog()

import { initController } from './initController'
const {
  store,
  route,
  collapsed,
  inverted,
  ifHideIcon,
  widthSpan,
  sectionWidth,
  history,
  ifFullpage,
  refreshing,
  settingShow,
  widthChange,
  widthChangeDone,
  collapsedChange,
  navigateTo,
  gotoTab,
  deleteTab,
  refreshRoute,
  setFullpage,
  openSetting,
  closeSetting,
} = initController()

provide('inverted', inverted)
provide('ifHideIcon', ifHideIcon)

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

import Header from './components/system/header.vue'
import SideContainer from './components/system/side-container.vue'
provide('settingShow', settingShow)
import Setting from './components/setting.vue'
</script>

<style scoped>
#header {
  top: 0;
  transition: all 0.3s ease;
}
.main-top-left-right {
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

/* @media only screen and (min-width: 1800px) {
  #header, .main {
    max-width: 1800px;
    margin: auto;
    box-shadow: 0 0 8px 0 #3d3b3b26;
  }
} */
</style>
